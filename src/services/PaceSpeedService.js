// services/PaceSpeedService.js
import { SportsConfiguration } from "@/services/SportsConfiguration";
import { UnitConversionService } from "@/services/UnitConversionService";
import { TimeFormatterService } from "@/services/TimeFormatterService";

export const PaceSpeedService = {
  calculatePace(activity, movingTimeMillis) {
    const { sportsMode, selectedDistance, distanceUnits, paceDisplayUnits } =
      activity;

    // Get configuration for the sport
    const config = SportsConfiguration[sportsMode];

    // Convert distance to base unit (meters or kilometers)
    const distanceInMeters = UnitConversionService.convertDistance(
      selectedDistance,
      distanceUnits,
      "metre"
    );

    // Base pace in minutes per meter
    const paceBaseMsPerMeter = movingTimeMillis / distanceInMeters;

    // Calculate pace for the selected display unit
    const displayConverter = config.paceDisplayUnitConverters[paceDisplayUnits];
    if (!displayConverter) {
      throw new Error(
        `Unsupported display unit: ${paceDisplayUnits} at calculatePace`
      );
    }

    const rawPaceMinutes = displayConverter(1000 / paceBaseMsPerMeter); // Convert [ms/m] to desired unit (e.g., min/100m or min/km)

    // Convert raw pace into human-readable format (e.g., MM:SS or HH:MM:SS if needed)
    return TimeFormatterService.getHumanTime(rawPaceMinutes * 60000); // Convert minutes to milliseconds for formatting
  },

  calculateSpeed(activity, unitSystem, movingTimeMillis) {
    const { sportsMode, selectedDistance, distanceUnits } = activity;

    // Get configuration for the sport
    const config = SportsConfiguration[sportsMode];

    // Convert distance to base unit (meters)
    const distanceInMeters = UnitConversionService.convertDistance(
      selectedDistance,
      distanceUnits,
      "metre"
    );

    // Speed in meters per second
    const speedMetersPerSecond = distanceInMeters / (movingTimeMillis / 1000);

    // Convert to desired output speed (e.g., km/h or mile/h)
    const preferredUnit = unitSystem === "metric" ? "km/h" : "mile/h";
    return UnitConversionService.convertSpeed(
      speedMetersPerSecond,
      "metre/second",
      preferredUnit
    ).toFixed(2);
  },
  convertTimeToMillis(humanTime) {
    const parts = humanTime.split(":");
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseFloat(parts[2]) || 0;
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  },
  // convertTimeToMillis(humanTime) {
  //   const [hours, minutes, seconds] = humanTime
  //     .split(":")
  //     .map((val) => parseInt(val, 10) || 0);
  //   return hours * 3600000 + minutes * 60000 + seconds * 1000;
  // },
};
