import { defineStore } from "pinia";
import CalculateService from "@/services/CalculateService";
import { version } from "../../package.json";

// Pinia
export const useActivityStore = defineStore("activityStore", {
  state: () => {
    return {
      appVersion: version,
      activity: {
        id: null,
        movingTime: "00:00:00",
        selectedDistance: null,
        distanceUnits: "km",
        customDistance: false,
        bookmarked: false,
      },
      unitOptions: [
        { label: "kms", value: "km" },
        { label: "miles", value: "mile" },
      ],
      distances: [
        {
          name: "Select Distance",
          value: "",
          disabled: true,
          selected: true,
          hidden: true,
        },
        {
          group: "ByPace",
          options: [
            { name: "min/km", value: 1, distanceUnit: "km" },
            {
              name: "min/mile",
              value: 1.609,
              distanceUnit: "mile",
            },
          ],
        },
        {
          group: "By Distance",
          options: [
            { name: "100m", value: 0.1, distanceUnit: "km" },
            { name: "200m", value: 0.2, distanceUnit: "km" },
            { name: "300m", value: 0.3, distanceUnit: "km" },
            { name: "400m", value: 0.4, distanceUnit: "km" },
            { name: "600m", value: 0.6, distanceUnit: "km" },
            {
              name: "800m",
              value: 0.8,
              distanceUnit: "km",
            },
            { name: "1km", value: 1, distanceUnit: "km" },
            {
              name: "1200m",
              value: 1.2,
              distanceUnit: "km",
            },
            { name: "1500m", value: 1.5, distanceUnit: "km" },
            {
              name: "1600m",
              value: 1.6,
              distanceUnit: "km",
            },
            { name: "1mile", value: 1.609, distanceUnit: "mile" },
            {
              name: "3k",
              value: 3,
              distanceUnit: "km",
            },
            {
              name: "3200m",
              value: 3.2,
              distanceUnit: "km",
            },
            { name: "5k", value: 5, distanceUnit: "km" },
            { name: "6k", value: 6, distanceUnit: "km" },
            {
              name: "7k",
              value: 7,
              distanceUnit: "km",
            },
            { name: "8k", value: 8, distanceUnit: "km" },
            {
              name: "10k",
              value: 10,
              distanceUnit: "km",
            },
            { name: "Half Marathon", value: 21.1, distanceUnit: "km" },
            {
              name: "Marathon",
              value: 42.2,
              distanceUnit: "km",
            },
            { name: "50k", value: 50, distanceUnit: "km" },
            {
              name: "100k",
              value: 100,
              distanceUnit: "km",
            },
            { name: "Miler", value: 160.934, distanceUnit: "mile" },
          ],
        },
      ],
      bookmarks: [],
    };
  },
  actions: {
    getHumanTime(millis) {
      let seconds = Math.round(millis / 1000);
      let minutes = Math.trunc(seconds / 60);
      let hours = Math.trunc(minutes / 60);
      let days = Math.trunc(hours / 24);

      seconds = seconds % 60;
      minutes = minutes % 60;
      hours = hours % 24;

      let str =
        minutes || hours
          ? `${String(seconds).padStart(2, "0")}`
          : `${String(seconds).padStart(2, "0")}s`;
      str =
        minutes || hours ? `${String(minutes).padStart(2, "0")}:` + str : str;
      str = hours || days ? `${String(hours).padStart(2, "0")}:` + str : str;
      str = days
        ? `${String(days)}${CalculateService.pluralStr(days, "day")} ` + str
        : str;

      return str;
    },
    distanceTimeCalc(newDistance) {
      return this.getHumanTime(this.paceInMilli * newDistance);
    },
    loadBookmarks() {
      this.bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    },
    saveBookmarks() {
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    },
    itemInBookmarks(id) {
      return this.itemBookmarkIndex(id) === -1 ? false : true;
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
    initActivity() {
      this.activity.bookmarked = false;
      this.activity.id = null;
      this.activity.movingTime = "00:00:00";
      this.activity.selectedDistance = null;
      this.activity.distanceUnits = "km";
      this.activity.customDistance = false;
      this.activity.bookmarked = false;
    },
  },
  getters: {
    convertFactor: (state) => {
      return state.activity.distanceUnits === "mile" ? 1.609 : 1;
    },
    distanceVal: (state) => {
      if (!state.activity.selectedDistance) {
        return 0;
      } else if (
        state.activity.customDistance &&
        state.activity.distanceUnits === "mile"
      ) {
        return parseFloat(state.activity.selectedDistance);
      }
      return parseFloat(state.activity.selectedDistance) / state.convertFactor;
    },
    resultDistanceOptions: (state) => {
      const { options } = state.distances[2];
      return options;
    },
    movingTimeMs: (state) => {
      const [hours, minutes, seconds] = state.activity.movingTime.split(":");
      return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    },
    paceInMilli: (state) => {
      return (
        Math.round(
          state.movingTimeMs / (state.distanceVal * state.convertFactor)
        ) || 0
      );
    },
    getSpeed: (state) => {
      if (!state.distanceVal) return "0.00";
      const speedVal =
        state.distanceVal / (state.movingTimeMs / 1000 / 60 / 60);
      return speedVal.toFixed(1);
    },
    getPace: (state) => {
      if (!state.distanceVal) return "0:00";
      const timePer = Math.round(state.movingTimeMs / state.distanceVal);
      return state.getHumanTime(timePer);
    },
    getMovingTime: (state) => {
      if (!state.distanceVal) return "0:00";
      return state.getHumanTime(state.movingTimeMs);
    },
    getBookmarks: (state) => {
      return state.bookmarks;
    },
    results: (state) => {
      return state.resultDistanceOptions.map((dist) => {
        return {
          name: dist.name,
          value: dist.value,
          pace: state.distanceTimeCalc(dist.value),
        };
      });
    },
    bookmarkPayload: (state) => {
      return {
        id: state.activity.id,
        movingTime: state.activity.movingTime,
        selectedDistance: state.activity.selectedDistance,
        distanceVal: state.distanceVal,
        distanceUnits: state.activity.distanceUnits,
        convertFactor: state.convertFactor,
        bookmarked: state.activity.bookmarked,
        customDistance: state.activity.customDistance,
        time: state.getMovingTime,
        speed: state.getSpeed,
        pace: state.getPace,
      };
    },
  },
});
