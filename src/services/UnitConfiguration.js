// services/UnitConfiguration.js

/**
 * Configuration for units of measure
 */
export const UnitConfiguration = {
  // Units of measure options
  unitsOfMeasure: {
    label: "Units of Measure",
    name: "units-of-measure",
    options: [
      {
        name: "Metric",
        value: "metric",
        units: "km/h",
        selected: true,
      },
      {
        name: "Imperial",
        value: "imperial",
        units: "mile/h",
      },
    ],
  },

  // Distance unit options
  distanceUnits: [
    { label: "kms", value: "km", sportsModes: ["run"] },
    { label: "miles", value: "mile", sportsModes: ["run"] },
    { label: "metres", value: "metre", sportsModes: ["swim"] },
    { label: "yards", value: "yd", sportsModes: ["swim"] },
  ],

  // Speed display units
  speedDisplayUnits: [
    {
      unitsOfMeasure: "metric",
      name: "km/h",
      value: "km/h",
    },
    {
      unitsOfMeasure: "imperial",
      name: "mile/h",
      value: "mile/h",
    },
  ],

  // Pace display units for running
  runPaceDisplayUnits: [
    {
      unitsOfMeasure: "metric",
      name: "min/km",
      value: "min/km",
    },
    {
      unitsOfMeasure: "imperial",
      name: "min/mile",
      value: "min/mile",
    },
  ],

  // Pace display units for swimming
  swimPaceDisplayUnits: [
    {
      unitsOfMeasure: "metric",
      name: "min/100m",
      value: "min/100m",
    },
    {
      unitsOfMeasure: "imperial",
      name: "min/100yds",
      value: "min/100yds",
    },
  ],
};
