import distances from "@/data/distances.json";
import { UnitConversionService } from "@/services/UnitConversionService";
import { PaceSpeedService } from "@/services/PaceSpeedService";
import { TimeFormatterService } from "@/services/TimeFormatterService";
import { UserPreferencesService } from "@/services/UserPreferencesService";
import { CustomDistanceService } from "@/services/CustomDistanceService";

export const DistanceTimeService = {
  /**
   * Calculate time for new distances based on selected distance and moving time.
   *
   * @param {number} selectedDistance - The current distance chosen.
   * @param {string} movingTime - Current moving time in HH:MM:SS format.
   * @param {string} distanceUnits - The unit of the selected distance (e.g., km, metre).
   * @param {string} paceDisplayUnits - The pace display unit (e.g., min/km, min/100m).
   * @param {string} sportsMode - Current sport (e.g., "run", "swim").
   * @returns {Array} Array of distances with their calculated times.
   */
  calculateTimeForDistances(
    selectedDistance,
    movingTime,
    distanceUnits,
    paceDisplayUnits,
    sportsMode,
    userPreferences = null
  ) {
    // Step 1: Convert moving time to milliseconds
    const movingTimeMillis = PaceSpeedService.convertTimeToMillis(movingTime); // Reuse existing time conversion.

    // Step 2: Convert selectedDistance to meters for pace calculation
    const selectedDistanceMeters = UnitConversionService.convertDistance(
      selectedDistance,
      distanceUnits,
      "metre"
    );

    // Step 3: Calculate base pace in milliseconds per meter
    const paceInMilliPerMeter = movingTimeMillis / selectedDistanceMeters;

    // Get user's selected sport categories or use default preferences
    const preferences =
      userPreferences || UserPreferencesService.loadPreferences();
    const userSportsCategories =
      preferences.sportsCategories ||
      UserPreferencesService.defaultPreferences.sportsCategories;

    // Step 4: Iterate through distances.json and calculate time for each distance
    const results = [];

    // Process built-in distances
    distances.forEach((entry) => {
      // Ignore the "Select Distance" placeholder entry
      if (entry.hidden || entry.disabled || entry["hiddenInResults"]) return;

      // Check if the entry is a group or an individual distance option
      if (entry.options) {
        entry.options.forEach((option) => {
          // Filter by sportsMode
          if (option.sportsMode === sportsMode) {
            // Filter by sportsCategories
            const matchesUserCategories = option.sportsCategories.some(
              (category) => userSportsCategories.includes(category)
            );

            if (matchesUserCategories) {
              const sportsCategories = [];
              sportsCategories.push(...option.sportsCategories);
              const optionId = option.id;
              // Convert the option's distance value to meters
              const distanceInMeters = UnitConversionService.convertDistance(
                option.value,
                option.distanceUnits,
                "metre"
              );
              // console.log(sportsCategories);
              // Calculate time for this distance
              const calculatedTimeMillis =
                paceInMilliPerMeter * distanceInMeters;

              // Format the calculated time as a human-readable string
              const formattedTime =
                TimeFormatterService.getHumanTime(calculatedTimeMillis);

              // Add the result to the array
              results.push({
                name: option.name,
                value: formattedTime,
                distance: option.value,
                time: formattedTime,
                sportsCategories: sportsCategories,
                id: optionId,
                distanceUnits: option.distanceUnits,
              });
            }
          }
        });
      }
    });

    // Process custom distances
    const customCategory = sportsMode === "swim" ? "custom swim" : "custom";

    // Only include custom distances if the custom category is selected in user preferences
    if (userSportsCategories.includes(customCategory)) {
      // Get custom distances for the current sports mode
      const customDistances =
        CustomDistanceService.getCustomDistancesForSportsMode(sportsMode);

      // Process each custom distance
      customDistances.forEach((option) => {
        const sportsCategories = [];
        sportsCategories.push(...option.sportsCategories);
        // Convert the option's distance value to meters
        const distanceInMeters = UnitConversionService.convertDistance(
          option.value,
          option.distanceUnits,
          "metre"
        );

        // Calculate time for this distance
        const calculatedTimeMillis = paceInMilliPerMeter * distanceInMeters;

        // Format the calculated time as a human-readable string
        const formattedTime =
          TimeFormatterService.getHumanTime(calculatedTimeMillis);

        // Add the result to the array
        results.push({
          id: option.id,
          name: option.name,
          value: formattedTime,
          distance: option.value,
          time: formattedTime,
          sportsCategories: sportsCategories,
          distanceUnits: option.distanceUnits,
        });
      });
    }
    results.sort((a, b) => {
      return (
        UnitConversionService.convertDistance(
          a.distance,
          a.distanceUnits,
          "metre"
        ) -
        UnitConversionService.convertDistance(
          b.distance,
          b.distanceUnits,
          "metre"
        )
      );
    });

    return results;
  },
};
