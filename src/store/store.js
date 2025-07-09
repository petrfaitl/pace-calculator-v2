import { defineStore } from "pinia";
import { PaceSpeedService } from "@/services/PaceSpeedService";
import { TimeFormatterService } from "@/services/TimeFormatterService";
import pkg from "../../package.json";
import distances from "@/data/distances.json";
import { SportsConfiguration } from "@/services/SportsConfiguration";
import { DistanceTimeService } from "@/services/DistanceTimeService";
import { UserPreferencesService } from "@/services/UserPreferencesService";
import { UnitConfiguration } from "@/services/UnitConfiguration";
import { CustomDistanceService } from "@/services/CustomDistanceService";
import router from "@/router";

const { version } = pkg;

// Pinia
export const useActivityStore = defineStore("activityStore", {
  state: () => {
    // Initialize state
    const state = {
      appVersion: version,
      activity: {
        id: null,
        selectedMovingTime: "00:00:00",
        selectedDistance: null,
        distanceUnits: "km",
        paceDisplayUnits: "min/km",
        speedDisplayUnits: "km/h",
        customDistance: false,
        bookmarked: false,
        sportsMode: "run",
      },
      userPreferences: UserPreferencesService.loadPreferences(),
      unitsOfMeasure: UnitConfiguration.unitsOfMeasure,
      unitOptions: UnitConfiguration.distanceUnits,
      distances,
      customDistances: [],
      bookmarks: [],
    };

    // Load custom distances
    const formattedCustomDistances =
      CustomDistanceService.getFormattedCustomDistances();
    if (
      formattedCustomDistances.options &&
      formattedCustomDistances.options.length > 0
    ) {
      state.customDistances = formattedCustomDistances;
    }

    return state;
  },
  actions: {
    /**
     * Call the DistanceTimeService to calculate time for all distances.
     *
     * @returns {Array} Array of calculated times for distances.
     */
    calculateTimes: function () {
      const {
        selectedDistance,
        selectedMovingTime,
        distanceUnits,
        paceDisplayUnits,
        sportsMode,
      } = this.activity;

      return DistanceTimeService.calculateTimeForDistances(
        selectedDistance,
        selectedMovingTime,
        distanceUnits,
        paceDisplayUnits,
        sportsMode,
        this.userPreferences
      );
    },
    loadBookmarks() {
      this.bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    },
    saveBookmarks() {
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    },
    loadUserPreferences() {
      this.userPreferences = UserPreferencesService.loadPreferences();
      // Get configuration for the current sports mode
      const config = SportsConfiguration[this.activity.sportsMode];

      // Set units based on user preferences or defaults
      this.activity.paceDisplayUnits =
        this.userPreferences.paceDisplayUnits || config.defaultPaceDisplayUnits;
      this.activity.speedDisplayUnits =
        this.userPreferences.speedDisplayUnits ||
        config.speedDisplayUnits[0].value;
    },
    saveUserPreferences() {
      UserPreferencesService.savePreferences(this.userPreferences);
    },
    updateUserPreferences(preferences) {
      this.userPreferences = { ...this.userPreferences, ...preferences };
      this.saveUserPreferences();
    },
    itemInBookmarks(id) {
      return this.itemBookmarkIndex(id) !== -1;
    },
    itemBookmarkIndex(id) {
      return this.bookmarks.findIndex((el) => {
        return el.id === id;
      });
    },
    toggleBookmarkItem() {
      this.activity.bookmarked = !this.activity.bookmarked;
      const itemIndex = this.itemBookmarkIndex(this.activity.id);
      if (itemIndex !== -1) {
        this.bookmarks.splice(itemIndex, 1);
      } else {
        this.bookmarks.push(this.bookmarkPayload);
      }
      this.saveBookmarks();
    },
    removeBookmarkItem(id) {
      const itemIndex = this.bookmarks.findIndex((el) => {
        return el.id === id;
      });
      if (itemIndex !== -1) {
        this.bookmarks.splice(itemIndex, 1);
      }
      this.saveBookmarks();
    },
    toggleActivitySportsMode() {
      // Toggle between run and swim
      const newSportsMode = this.activity.sportsMode === "run" ? "swim" : "run";
      this.activity.sportsMode = newSportsMode;

      // Update user preferences with the new sports mode
      this.userPreferences.sportsMode = newSportsMode;

      // Update units based on the new sports mode and current units of measure
      const updatedPreferences =
        UserPreferencesService.updatePreferencesForSportsMode(
          this.userPreferences,
          newSportsMode,
          this.userPreferences.unitsOfMeasure
        );

      // Update user preferences
      this.userPreferences = updatedPreferences;
      this.saveUserPreferences();

      // Update activity with the new units
      this.activity.distanceUnits = this.userPreferences.distanceUnits;
      this.activity.paceDisplayUnits = this.userPreferences.paceDisplayUnits;
      this.activity.speedDisplayUnits = this.userPreferences.speedDisplayUnits;

      router.push({ name: "CalculateView" });
    },
    toggleUserPreferencesUnits(unitSystem) {
      // Update user preferences with the new units of measure
      this.userPreferences.unitsOfMeasure = unitSystem;

      // Update activity with the new units configuration
      const updatedPreferences =
        UserPreferencesService.updatePreferencesForSportsMode(
          this.userPreferences,
          this.activity.sportsMode,
          unitSystem
        );

      this.userPreferences = updatedPreferences;
      this.saveUserPreferences();

      // Update activity with the new units
      this.activity.paceDisplayUnits = this.userPreferences.paceDisplayUnits;
      this.activity.speedDisplayUnits = this.userPreferences.speedDisplayUnits;
    },

    initActivity() {
      // Load user preferences
      this.loadUserPreferences();

      // Initialize activity with user preferences
      this.activity.bookmarked = false;
      this.activity.id = Date.now();
      this.activity.selectedMovingTime = "00:00:00";
      this.activity.selectedDistance = null;
      this.activity.sportsMode = this.userPreferences.sportsMode || "run";

      // Get configuration for the current sports mode
      // const config = SportsConfiguration[this.activity.sportsMode];

      // Set units based on user preferences or defaults
      // this.activity.distanceUnits =
      //   this.userPreferences.distanceUnits || config.baseDistanceUnit;
      // this.activity.paceDisplayUnits =
      //   this.userPreferences.paceDisplayUnits || config.defaultPaceDisplayUnits;
      // this.activity.speedDisplayUnits =
      //   this.userPreferences.speedDisplayUnits ||
      //   config.speedDisplayUnits[0].value;

      this.activity.customDistance = false;
      this.activity.bookmarked = false;

      // Load custom distances
      this.refreshCustomDistances();
    },

    /**
     * Refresh custom distances from localStorage
     */
    refreshCustomDistances() {
      // Get formatted custom distances for the current sports mode
      const formattedCustomDistances =
        CustomDistanceService.getFormattedCustomDistances();

      // Update the customDistances array in the store
      if (formattedCustomDistances.options.length > 0) {
        this.customDistances = formattedCustomDistances;
      } else {
        this.customDistances = [];
      }
    },
  },
  getters: {
    getPace(state) {
      const timeInMillis = PaceSpeedService.convertTimeToMillis(
        state.activity.selectedMovingTime
      );
      return PaceSpeedService.calculatePace(state.activity, timeInMillis);
    },
    getSpeed(state) {
      const timeInMillis = PaceSpeedService.convertTimeToMillis(
        state.activity.selectedMovingTime
      );
      return PaceSpeedService.calculateSpeed(
        state.activity,
        state.userPreferences.unitsOfMeasure,
        timeInMillis
      );
    },
    getMovingTime(state) {
      if (!state.activity.selectedDistance) return "0:00";
      return TimeFormatterService.getHumanTime(
        PaceSpeedService.convertTimeToMillis(state.activity.selectedMovingTime)
      );
    },
    getBookmarks: (state) => {
      return state.bookmarks;
    },
    resultDistanceOptions: (state) => {
      const { options } = state.getDistances[2];
      return options;
    },
    results: (state) => {
      return state.calculateTimes();
    },
    bookmarkPayload: (state) => {
      return {
        id: state.activity.id,
        selectedMovingTime: state.activity.selectedMovingTime,
        selectedDistance: state.activity.selectedDistance,
        distanceVal: state.activity.selectedDistance,
        distanceUnits: state.activity.distanceUnits,
        paceDisplayUnits: state.activity.paceDisplayUnits,
        speedDisplayUnits: state.activity.speedDisplayUnits,
        bookmarked: state.activity.bookmarked,
        customDistance: state.activity.customDistance,
        time: state.getMovingTime,
        speed: state.getSpeed,
        pace: state.getPace,
      };
    },
    getDistances(state) {
      // Always include the "Select Distance" element
      const result = [
        {
          name: "Select Distance",
          value: "",
          disabled: true,
          selected: true,
          hidden: true,
        },
      ];

      // Get user's selected sport categories or use default preferences
      const userSportsCategories =
        state.userPreferences.sportsCategories ||
        UserPreferencesService.defaultPreferences.sportsCategories;

      // Process built-in distances
      state.distances.forEach((distanceGroup) => {
        if (distanceGroup.options) {
          // Filter options based on the sportsMode in `activity`
          let filteredOptions = distanceGroup.options.filter(
            (option) => option.sportsMode === state.activity.sportsMode
          );

          // If it's the "By Pace" group, don't filter by sportsCategories
          if (distanceGroup.group !== "By Pace") {
            // Further filter options based on user's selected sport categories
            filteredOptions = filteredOptions.filter((option) => {
              return option.sportsCategories.some((category) =>
                userSportsCategories.includes(category)
              );
            });
          }

          // If there are remaining options, add the group to the result
          if (filteredOptions.length > 0) {
            result.push({
              group: distanceGroup.group,
              options: filteredOptions,
            });
          }
        }
      });

      // Add custom distances if available and if custom category is selected
      if (
        state.customDistances &&
        state.customDistances.options &&
        state.customDistances.options.length > 0
      ) {
        // Filter custom distances based on the current sports mode
        const filteredCustomOptions = state.customDistances.options.filter(
          (option) => option.sportsMode === state.activity.sportsMode
        );

        // Filter by selected categories (custom or custom swim)
        const customCategory =
          state.activity.sportsMode === "swim" ? "custom swim" : "custom";

        // Only include if the custom category is selected in user preferences
        if (
          userSportsCategories.includes(customCategory) &&
          filteredCustomOptions.length > 0
        ) {
          result.push({
            group: "Custom Distances",
            options: filteredCustomOptions,
          });
        }
      }

      return result;
    },
    getUnitOptions(state) {
      const result = [];

      // Filter options based on the sportsMode in `activity`
      const filteredOptions = state.unitOptions.filter(
        (option) => option.sportsMode === state.activity.sportsMode
      );

      // If there are remaining options, add the group to the result
      if (filteredOptions.length > 0) {
        result.push(...filteredOptions);
      }

      return result;
    },
  },
});
