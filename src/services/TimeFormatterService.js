export const TimeFormatterService = {
  // Convert a float value representing time in minutes to MM:SS
  formatMinutesToHumanReadable(timeInMinutes) {
    const totalSeconds = Math.round(timeInMinutes * 60); // Convert minutes to total seconds
    const minutes = Math.floor(totalSeconds / 60); // Get whole minutes
    const seconds = totalSeconds % 60; // Get remaining seconds
    return `${minutes}:${String(seconds).padStart(2, "0")}`; // Format as MM:SS
  },
  /**
   * Formats time in milliseconds to a human-readable string
   * Handles seconds, minutes, hours, and days.
   *
   * @param {number} millis - Time in milliseconds
   * @returns {string} - Formatted time as a human-readable string
   */
  getHumanTime(millis) {
    let seconds = Math.round(millis / 1000); // Get total seconds
    let minutes = Math.trunc(seconds / 60); // Get total minutes
    let hours = Math.trunc(minutes / 60); // Get total hours
    let days = Math.trunc(hours / 24); // Get total days

    // Remainders for each unit
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    // Human-readable string formatting
    let str =
      minutes || hours || days
        ? `${String(seconds).padStart(2, "0")}`
        : `${String(seconds).padStart(2, "0")}s`; // Display seconds only
    str =
      minutes || hours || days
        ? `${String(minutes).padStart(2, "0")}:` + str
        : str; // Add minutes
    str = hours || days ? `${String(hours).padStart(2, "0")}:` + str : str; // Add hours
    str = days
      ? `${String(days)} ${this.pluralize(days, "day")} ` + str // Add days
      : str;

    return str;
  },

  /**
   * Utility to add a plural suffix if count is greater than 1
   *
   * @param {number} count - The quantity of the unit (e.g., days, hours)
   * @param {string} singular - The singular form of the word
   * @returns {string} - Singular or pluralized word
   */
  pluralize(count, singular) {
    return count === 1 ? singular : `${singular}s`;
  },
};
