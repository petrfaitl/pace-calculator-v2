<template>
  <section class="mt-4 md:mt-8 p-8 md:w-1/2">
    <h1 class="text-2xl font-bold mb-6 dark:text-slate-50">User Preferences</h1>

    <!-- Theme Mode -->
    <div class="mb-6">
      <h2 class="text-xl font-medium mb-2 dark:text-slate-50 text-left">
        Theme Mode
      </h2>
      <div class="flex gap-4">
        <button
          @click="setThemeMode('system')"
          :class="[
            'px-4 py-2 rounded-md',
            userPreferences.themeMode === 'system'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200',
          ]"
        >
          System
        </button>
        <button
          @click="setThemeMode('light')"
          :class="[
            'px-4 py-2 rounded-md',
            userPreferences.themeMode === 'light'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200',
          ]"
        >
          Light
        </button>
        <button
          @click="setThemeMode('dark')"
          :class="[
            'px-4 py-2 rounded-md',
            userPreferences.themeMode === 'dark'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200',
          ]"
        >
          Dark
        </button>
      </div>
    </div>

    <!-- Sports Mode -->
    <div class="mb-6">
      <h2 class="text-xl font-medium mb-2 dark:text-slate-50 text-left">
        Sports Mode
      </h2>
      <div class="flex gap-4">
        <button
          @click="setSportsMode('run')"
          :class="[
            'px-4 py-2 rounded-md',
            userPreferences.sportsMode === 'run'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200',
          ]"
        >
          Running
        </button>
        <button
          @click="setSportsMode('swim')"
          :class="[
            'px-4 py-2 rounded-md',
            userPreferences.sportsMode === 'swim'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200',
          ]"
        >
          Swimming
        </button>
      </div>
    </div>

    <!-- Units of Measure -->
    <div class="mb-6">
      <h2 class="text-xl font-medium mb-2 dark:text-slate-50 text-left">
        Units of Measure
      </h2>
      <div class="flex gap-4">
        <button
          @click="setUnitsOfMeasure('metric')"
          :class="[
            'px-4 py-2 rounded-md',
            userPreferences.unitsOfMeasure === 'metric'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200',
          ]"
        >
          Metric
        </button>
        <button
          @click="setUnitsOfMeasure('imperial')"
          :class="[
            'px-4 py-2 rounded-md',
            userPreferences.unitsOfMeasure === 'imperial'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200',
          ]"
        >
          Imperial
        </button>
      </div>
    </div>

    <!-- Current Preferences -->
    <div class="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
      <h2 class="text-xl font-medium mb-4 dark:text-slate-50">
        Current Preferences
      </h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="dark:text-slate-300">Theme Mode:</div>
        <div class="font-medium dark:text-slate-50">
          {{ getThemeModeDisplay }}
        </div>

        <div class="dark:text-slate-300">Sports Mode:</div>
        <div class="font-medium dark:text-slate-50">
          {{ getSportsModeDisplay }}
        </div>

        <div class="dark:text-slate-300">Units of Measure:</div>
        <div class="font-medium dark:text-slate-50">
          {{ getUnitsOfMeasureDisplay }}
        </div>

        <div class="dark:text-slate-300">Distance Units:</div>
        <div class="font-medium dark:text-slate-50">
          {{ userPreferences.distanceUnits }}
        </div>

        <div class="dark:text-slate-300">Pace Display Units:</div>
        <div class="font-medium dark:text-slate-50">
          {{ userPreferences.paceDisplayUnits }}
        </div>

        <div class="dark:text-slate-300">Speed Display Units:</div>
        <div class="font-medium dark:text-slate-50">
          {{ userPreferences.speedDisplayUnits }}
        </div>
      </div>
    </div>
    <div class="text-xs text-cyan-900 dark:text-cyan-100">
      App version: {{ appVersion }}
    </div>

    <!-- Reset to Defaults Button -->
    <div class="mt-6">
      <button
        @click="resetToDefaults"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Reset to Defaults
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useActivityStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { UserPreferencesService } from "@/services/UserPreferencesService";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

const store = useActivityStore();
const { userPreferences, appVersion } = storeToRefs(store);

// Computed properties for display values
const getThemeModeDisplay = computed(() => {
  switch (userPreferences.value.themeMode) {
    case "system":
      return "System Default";
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    default:
      return "System Default";
  }
});

const getSportsModeDisplay = computed(() => {
  return userPreferences.value.sportsMode === "run" ? "Running" : "Swimming";
});

const getUnitsOfMeasureDisplay = computed(() => {
  return userPreferences.value.unitsOfMeasure === "metric"
    ? "Metric"
    : "Imperial";
});

// Methods for updating preferences
const setSportsMode = (sportsMode) => {
  // Update user preferences with the new sports mode
  store.updateUserPreferences({ sportsMode });

  // Update units based on the new sports mode and current units of measure
  const updatedPreferences =
    UserPreferencesService.updatePreferencesForSportsMode(
      userPreferences.value,
      sportsMode,
      userPreferences.value.unitsOfMeasure
    );

  store.updateUserPreferences(updatedPreferences);
};

const setUnitsOfMeasure = (unitsOfMeasure) => {
  // Update user preferences with the new units of measure
  store.updateUserPreferences({ unitsOfMeasure });

  // Update units based on the current sports mode and new units of measure
  const updatedPreferences =
    UserPreferencesService.updatePreferencesForSportsMode(
      userPreferences.value,
      userPreferences.value.sportsMode,
      unitsOfMeasure
    );

  store.updateUserPreferences(updatedPreferences);
};

const setThemeMode = (mode) => {
  // Update user preferences with the new theme mode
  store.updateUserPreferences({ themeMode: mode });

  // Apply the selected theme
  applyTheme(mode);
};

const applyTheme = (mode) => {
  if (mode === "system") {
    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else if (mode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const resetToDefaults = () => {
  // Reset to default preferences
  store.updateUserPreferences(UserPreferencesService.defaultPreferences);

  // Apply the default theme
  applyTheme(UserPreferencesService.defaultPreferences.themeMode);
};

// Initialize theme based on user preferences when component mounts
onMounted(() => {
  // Apply the theme from user preferences
  applyTheme(userPreferences.value.themeMode);

  // Add event listener for system theme changes if using system preference
  if (userPreferences.value.themeMode === "system") {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      function (evt) {
        if (userPreferences.value.themeMode === "system") {
          if (evt.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      }
    );
  }
});
</script>
