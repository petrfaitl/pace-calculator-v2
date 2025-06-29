// services/UserPreferencesService.js

import { SportsConfiguration } from "@/services/SportsConfiguration";

/**
 * Service for managing user preferences
 */
export const UserPreferencesService = {
  /**
   * Default preferences
   */
  defaultPreferences: {
    sportsMode: "run",
    unitsOfMeasure: "metric",
    distanceUnits: SportsConfiguration.run.baseDistanceUnit,
    paceDisplayUnits: SportsConfiguration.run.defaultPaceDisplayUnits,
    speedDisplayUnits: SportsConfiguration.run.speedDisplayUnits[0].value,
    themeMode: "system", // Can be "system", "light", or "dark"
    sportsCategories: ["default"], // Default selected sports categories
  },

  /**
   * Save user preferences to localStorage
   * @param {Object} preferences - User preferences to save
   */
  savePreferences(preferences) {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  },

  /**
   * Load user preferences from localStorage
   * @returns {Object} User preferences
   */
  loadPreferences() {
    const preferences = localStorage.getItem("userPreferences");
    return preferences ? JSON.parse(preferences) : this.defaultPreferences;
  },

  /**
   * Get unit options for the current sports mode
   * @param {string} sportsMode - Current sports mode
   * @returns {Object} Unit options for the current sports mode
   */
  getUnitOptionsForSportsMode(sportsMode) {
    const config = SportsConfiguration[sportsMode];
    return {
      distanceUnits: config.baseDistanceUnit,
      paceDisplayUnits: config.defaultPaceDisplayUnits,
      speedDisplayUnits: config.speedDisplayUnits[0].value,
    };
  },

  /**
   * Update preferences for a specific sports mode
   * @param {Object} preferences - Current preferences
   * @param {string} sportsMode - Sports mode to update preferences for
   * @param {string} unitsOfMeasure - Units of measure (metric or imperial)
   * @returns {Object} Updated preferences
   */
  updatePreferencesForSportsMode(preferences, sportsMode, unitsOfMeasure) {
    const config = SportsConfiguration[sportsMode];

    // Find the pace display units for the selected units of measure
    const paceDisplayUnits = config.supportedPaceDisplayUnits.find(
      (unit) => unit.unitsOfMeasure === unitsOfMeasure
    ).value;

    // Find the speed display units for the selected units of measure
    const speedDisplayUnits = config.speedDisplayUnits.find(
      (unit) => unit.unitsOfMeasure === unitsOfMeasure
    ).value;

    // Find the distance units for the selected units of measure
    const distanceUnits = config.supportedDistanceUnits.find(
      (unit) => unit.unitsOfMeasure === unitsOfMeasure
    ).value;

    return {
      ...preferences,
      sportsMode,
      unitsOfMeasure,
      distanceUnits,
      paceDisplayUnits,
      speedDisplayUnits,
    };
  },
};
