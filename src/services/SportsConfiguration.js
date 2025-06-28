// services/SportsConfiguration.js
import { UnitConfiguration } from "@/services/UnitConfiguration";

export const SportsConfiguration = {
  // Common configuration that can be accessed directly
  common: {
    speedDisplayUnits: UnitConfiguration.speedDisplayUnits,
  },

  run: {
    sportTitle: "Running",
    baseDistanceUnit: "km",
    baseDistanceInMeters: 1000, // 1 km = 1000 meters
    defaultPaceDisplayUnits: "min/km", // Renamed from paceDisplayUnit for consistency
    // Use common configuration for speedDisplayUnits
    speedDisplayUnits: UnitConfiguration.speedDisplayUnits,
    supportedPaceDisplayUnits: UnitConfiguration.runPaceDisplayUnits,
    supportedDistanceUnits: [
      {
        unitsOfMeasure: "metric",
        name: "km",
        value: "km",
      },
      {
        unitsOfMeasure: "imperial",
        name: "mile",
        value: "mile",
      },
    ],
    paceDisplayUnitConverters: {
      "min/km": (metersPerSecond) => 60 / (metersPerSecond * 3.6), // ms to min/km
      "min/mile": (metersPerSecond) => (60 / (metersPerSecond * 3.6)) * 1.60934, // ms to min/mile
    },
  },

  swim: {
    sportTitle: "Swimming",
    baseDistanceUnit: "metre",
    baseDistanceInMeters: 1, // Base is always meters
    defaultPaceDisplayUnits: "min/100m", // Renamed from paceDisplayUnit for consistency
    // Use common configuration for speedDisplayUnits
    speedDisplayUnits: UnitConfiguration.speedDisplayUnits,
    supportedPaceDisplayUnits: UnitConfiguration.swimPaceDisplayUnits,
    supportedDistanceUnits: [
      {
        unitsOfMeasure: "metric",
        name: "metre",
        value: "m",
      },
      {
        unitsOfMeasure: "imperial",
        name: "yard",
        value: "yd",
      },
    ],
    paceDisplayUnitConverters: {
      "min/100m": (metersPerSecond) => 100 / (metersPerSecond * 60), // ms to min/100m
      "min/100yds": (metersPerSecond) => 91.44 / (metersPerSecond * 60), // ms to min/100 yards
    },
  },
};
