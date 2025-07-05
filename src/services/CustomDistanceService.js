// services/CustomDistanceService.js

/**
 * Service for managing custom distances
 */
export const CustomDistanceService = {
  /**
   * Load custom distances from localStorage
   * @returns {Object} Custom distances organized by sports mode
   */
  loadCustomDistances() {
    const customDistances = localStorage.getItem("customDistances");
    return customDistances ? JSON.parse(customDistances) : { run: [], swim: [] };
  },

  /**
   * Save custom distances to localStorage
   * @param {Object} customDistances - Custom distances to save
   */
  saveCustomDistances(customDistances) {
    localStorage.setItem("customDistances", JSON.stringify(customDistances));
  },

  /**
   * Get custom distances for a specific sports mode
   * @param {string} sportsMode - Sports mode to get custom distances for
   * @returns {Array} Custom distances for the specified sports mode
   */
  getCustomDistancesForSportsMode(sportsMode) {
    const customDistances = this.loadCustomDistances();
    return customDistances[sportsMode] || [];
  },

  /**
   * Add a new custom distance
   * @param {Object} customDistance - Custom distance to add
   * @returns {Object} Updated custom distances
   */
  addCustomDistance(customDistance) {
    const customDistances = this.loadCustomDistances();
    const sportsMode = customDistance.sportsMode;

    if (!customDistances[sportsMode]) {
      customDistances[sportsMode] = [];
    }

    // Add sportsCategories based on sportsMode
    if (!customDistance.sportsCategories) {
      customDistance.sportsCategories = sportsMode === "swim" ? ["custom swim"] : ["custom"];
    }

    customDistances[sportsMode].push(customDistance);
    this.saveCustomDistances(customDistances);
    return customDistances;
  },

  /**
   * Update an existing custom distance
   * @param {string} sportsMode - Sports mode of the custom distance
   * @param {number} index - Index of the custom distance to update
   * @param {Object} updatedCustomDistance - Updated custom distance
   * @returns {Object} Updated custom distances
   */
  updateCustomDistance(sportsMode, index, updatedCustomDistance) {
    const customDistances = this.loadCustomDistances();

    if (customDistances[sportsMode] && customDistances[sportsMode][index]) {
      // If the sports mode has changed, remove from old and add to new
      if (updatedCustomDistance.sportsMode !== sportsMode) {
        const newSportsMode = updatedCustomDistance.sportsMode;

        // Remove from old sports mode
        customDistances[sportsMode].splice(index, 1);

        // Add to new sports mode
        if (!customDistances[newSportsMode]) {
          customDistances[newSportsMode] = [];
        }

        // Update sportsCategories based on new sportsMode
        if (!updatedCustomDistance.sportsCategories) {
          updatedCustomDistance.sportsCategories = newSportsMode === "swim" ? ["custom swim"] : ["custom"];
        }

        customDistances[newSportsMode].push(updatedCustomDistance);
      } else {
        // Update in the same sports mode
        customDistances[sportsMode][index] = updatedCustomDistance;
      }

      this.saveCustomDistances(customDistances);
    }

    return customDistances;
  },

  /**
   * Delete a custom distance
   * @param {string} sportsMode - Sports mode of the custom distance
   * @param {number} index - Index of the custom distance to delete
   * @returns {Object} Updated custom distances
   */
  deleteCustomDistance(sportsMode, index) {
    const customDistances = this.loadCustomDistances();

    if (customDistances[sportsMode] && customDistances[sportsMode][index]) {
      customDistances[sportsMode].splice(index, 1);
      this.saveCustomDistances(customDistances);
    }

    return customDistances;
  },

  /**
   * Get all custom distances formatted for the distances selector
   * @returns {Object} Custom distances formatted for the distances selector
   */
  getFormattedCustomDistances() {
    const customDistances = this.loadCustomDistances();
    const formattedDistances = {
      group: "Custom Distances",
      options: []
    };

    // Combine all custom distances from all sports modes
    Object.keys(customDistances).forEach(sportsMode => {
      customDistances[sportsMode].forEach(distance => {
        formattedDistances.options.push({
          ...distance,
          hidden: false
        });
      });
    });

    return formattedDistances;
  }
};
