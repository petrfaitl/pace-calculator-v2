import distances from "@/data/distances.json";
import { UnitConversionService } from "@/services/UnitConversionService";
import { PaceSpeedService } from "@/services/PaceSpeedService";
import { TimeFormatterService } from "@/services/TimeFormatterService";

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
    sportsMode
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

    // Step 4: Iterate through distances.json and calculate time for each distance
    const results = [];
    distances.forEach((entry) => {
      // Ignore the "Select Distance" placeholder entry
      if (entry.hidden || entry.disabled || entry["hiddenInResults"]) return;

      // Check if the entry is a group or an individual distance option
      if (entry.options) {
        entry.options.forEach((option) => {
          if (option.sportsModes.includes(sportsMode)) {
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
              name: option.name,
              value: formattedTime,
              distance: option.value,
              time: formattedTime,
            });
          }
        });
      }
    });

    return results;
  },
};
