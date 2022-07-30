<template>
  <nav
    class="fixed md:relative w-full z-10 flex justify-between backdrop-blur-md px-4 items-center h-24 border-b border-slate-200 dark:border-slate-50 dark:bg-slate-900/50"
  >
    <div class="font-normal text-xl text-cyan-900 dark:text-cyan-50">
      Pace Calculator
    </div>
    <div class="flex justify-around items-center gap-2">
      <button class="nav-icon" id="dark-btn" @click="toggleDarkMode">
        <!-- Icon Sun -->
        <SunIcon
          id="icon-sun"
          class="h-6 w-6 mx-auto text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          v-if="darkMode === 'dark'"
        />

        <!-- icon moon -->
        <MoonIcon
          id="icon-moon"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          v-else-if="darkMode === 'light'"
        />
      </button>

      <!-- Icon Bookmarks all -->
      <button class="nav-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      <!-- Icon Bookmark -->
      <button class="nav-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
import { SunIcon } from "@heroicons/vue/outline";
import { MoonIcon } from "@heroicons/vue/outline";
export default {
  name: "MainNav",
  components: { SunIcon, MoonIcon },
  data() {
    return {
      darkMode: "light",
    };
  },
  methods: {
    toggleDarkMode: function () {
      this.darkMode = this.darkMode === "light" ? "dark" : "light";
      this.setTheme(this.darkMode);
    },
    setTheme(mode = "light") {
      if (!mode || mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
  mounted() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.setTheme("dark");
      this.darkMode = "dark";
    } else {
      this.setTheme();
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      function (evt) {
        if (!evt.matches) {
          this.setTheme();
        } else {
          this.setTheme("dark");
        }
      }.bind(this)
    );

    // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
  },
};
</script>

<style scoped>
.nav-icon {
  @apply h-12 w-12 rounded-full text-cyan-500
    active:text-cyan-500 hover:text-cyan-600 active:bg-cyan-50
    dark:text-cyan-300 dark:active:text-cyan-300
    dark:hover:text-cyan-500/70
    dark:active:bg-cyan-50/20  transition;
}
</style>
