<template>
  <router-view />
</template>

<script>
import { UserPreferencesService } from "@/services/UserPreferencesService";

export default {
  mounted() {
    document.title = "Pace Converter";
    document.description =
      "A must-have tool for runners and swimmers! Effortlessly calculate and convert paces for popular distances. Supports running and swimming paces for distances like 100m, 400m, 800m, 5k, marathon, and more. Choose between metric and imperial units, and customize pace calculations for min/km, min/mile, min/100m, and min/100yds.";

    // Initialize theme based on user preferences
    this.initializeTheme();
  },
  methods: {
    initializeTheme() {
      // Load user preferences
      const userPreferences = UserPreferencesService.loadPreferences();
      const themeMode = userPreferences.themeMode || "system";

      // Apply theme based on preferences
      this.applyTheme(themeMode);

      // Add event listener for system theme changes if using system preference
      if (themeMode === "system") {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (evt) => {
            if (userPreferences.themeMode === "system") {
              if (evt.matches) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            }
          });
      }
    },
    applyTheme(mode) {
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
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg-primary {
  @apply bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-500
  dark:bg-cyan-500 dark:hover:bg-cyan-500/70;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Slide Left Transition */
.slide-left-move,
.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition-all duration-500;
}
.slide-left-enter-from {
  @apply opacity-0;
  @apply translate-x-1;
}

.slide-left-leave-to {
  @apply opacity-0;
  @apply -translate-x-1;
}
/* Slide Up Transition */
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all duration-500;
}
.slide-up-enter-from {
  @apply opacity-0;
  @apply translate-y-1;
}

.slide-up-leave-to {
  @apply opacity-0;
  @apply -translate-y-1;
}

/* Fade Transition */
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}
</style>
