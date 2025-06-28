export const UnitConversionService = {
  // Conversion factors
  DISTANCE_CONVERSIONS: {
    km: { mile: 0.621371, metre: 1000 },
    mile: { km: 1.60934, yard: 1760, metre: 1609.34 },
    metre: { km: 0.001, yard: 1.09361 },
    yard: { metre: 0.9144, mile: 0.000568182 },
  },
  SPEED_CONVERSIONS: {
    "metre/second": { "km/h": 3.6, "mile/h": 2.23694 },
  },
  TIME_CONVERSIONS: {
    secToMilli: (sec) => sec * 1000,
    milliToSec: (ms) => ms / 1000,
    minToMilli: (min) => min * 60000,
    milliToMin: (ms) => ms / 60000,
  },

  // Convert distances between units
  convertDistance(amount, fromUnit, toUnit) {
    if (fromUnit === toUnit) return amount;
    const factor = this.DISTANCE_CONVERSIONS[fromUnit]?.[toUnit];
    if (!factor)
      throw new Error(`Unsupported conversion from ${fromUnit} to ${toUnit}`);
    return amount * factor;
  },

  // Convert speeds between units
  convertSpeed(amount, fromUnit, toUnit) {
    if (fromUnit === toUnit) return amount;
    const factor = this.SPEED_CONVERSIONS[fromUnit]?.[toUnit];
    if (!factor)
      throw new Error(`Unsupported conversion from ${fromUnit} to ${toUnit}`);
    return amount * factor;
  },

  // Convert between time units
  convertTime(amount, fromUnit, toUnit) {
    if (fromUnit === toUnit) return amount;
    const conversion = this.TIME_CONVERSIONS[`${fromUnit}To${toUnit}`];
    if (!conversion)
      throw new Error(
        `Unsupported time conversion from ${fromUnit} to ${toUnit}`
      );
    return conversion(amount);
  },
};
