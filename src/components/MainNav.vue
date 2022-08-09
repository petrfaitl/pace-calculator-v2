<template>
  <nav
    class="w-full z-10 flex justify-between backdrop-blur-md md:px-4 items-center h-24 border-b border-cyan-500 dark:border-cyan-300 dark:bg-slate-900/50"
  >
    <div class="flex items-center">
      <!--      Back button & location title-->
      <div
        v-if="$route.path !== '/'"
        class="flex items-center font-normal text-xl text-cyan-900 dark:text-cyan-50 select-none"
      >
        <button
          class="nav-icon md:mr-2 text-sm flex items-center"
          @click="this.$router.push({ name: 'CalculateView' })"
        >
          <ChevronLeftIcon
            id="bookmark-alt-icon"
            class="h-6 w-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          />
        </button>
        Results
      </div>
      <div
        v-else
        class="font-normal text-xl text-cyan-900 dark:text-cyan-50 select-none ml-4"
      >
        Pace Calculator
      </div>
    </div>
    <div class="flex justify-around items-center md:gap-2">
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

      <!--      Reset Calculations-->
      <button class="nav-icon" @click="reset">
        <RefreshIcon
          id="bookmark-alt-icon"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </button>

      <!-- Icon Bookmarks all -->
      <button class="nav-icon disabled:opacity-25" disabled>
        <BookmarkAltIcon
          id="bookmark-alt-icon"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </button>

      <!-- Icon Bookmark -->
      <button class="nav-icon disabled:opacity-25 hidden" disabled>
        <BookmarkIcon
          id="bookmarks-alt-icon"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </button>
    </div>
  </nav>
</template>

<script>
import { SunIcon } from "@heroicons/vue/outline";
import { MoonIcon } from "@heroicons/vue/outline";
import { BookmarkAltIcon } from "@heroicons/vue/outline";
import { BookmarkIcon } from "@heroicons/vue/outline";
import { ChevronLeftIcon } from "@heroicons/vue/outline";
import { RefreshIcon } from "@heroicons/vue/outline";
export default {
  name: "MainNav",
  inject: ["State"],
  components: {
    SunIcon,
    MoonIcon,
    BookmarkAltIcon,
    BookmarkIcon,
    ChevronLeftIcon,
    RefreshIcon,
  },
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
        this.darkMode = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        this.darkMode = "light";
      }
    },
    reset() {
      this.State.activity = {};
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
