<template>
  <nav
    class="relative w-full z-20 flex justify-between md:px-4 items-center h-24 border-b border-cyan-500 dark:border-cyan-300 bg-white dark:bg-slate-900/50"
    @click.self="closeBookmarks"
  >
    <div class="flex items-center">
      <!--      Back button & location title-->
      <Transition
        mode="out-in"
        name="slide-left"
        appear
        v-if="$route.path !== '/'"
        class="flex items-center font-normal text-xl text-cyan-900 dark:text-cyan-50 select-none"
      >
        <div>
          <button
            class="nav-icon md:mr-2 text-sm flex items-center"
            @click="this.$router.push({ name: 'CalculateView' })"
          >
            <ChevronLeftIcon
              id="bookmark-alt-icon"
              class="h-6 w-6 mx-auto mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            />
          </button>
          Results
        </div>
      </Transition>
      <Transition
        v-else
        class="font-normal text-xl text-cyan-900 dark:text-cyan-50 select-none ml-4"
        mode="out-in"
        name="slide-left"
        appear
      >
        <div>Pace Calculator</div>
      </Transition>
    </div>
    <div class="flex justify-around items-center md:gap-2">
      <button class="nav-btn" id="dark-btn" @click="toggleDarkMode">
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
          class="h-6 w-6 mx-auto nav-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          v-else-if="darkMode === 'light'"
        />
      </button>

      <!--      Reset Calculations-->
      <button class="nav-btn group" @click="reset">
        <RefreshIcon
          id="bookmark-alt-icon"
          class="h-6 w-6 mx-auto group-active:animate-spin nav-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </button>

      <!-- Icon Bookmarks all -->
      <button class="nav-btn disabled:opacity-25" @click="toggleBookmarks">
        <BookmarkAltIcon
          id="bookmark-alt-icon"
          class="h-6 w-6 mx-auto nav-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </button>
    </div>
  </nav>
  <BookmarksView
    v-show="bookmarksVisible"
    :bookmarksVisible="bookmarksVisible"
    @bookmarkClicked="toggleBookmarks"
  />
</template>

<script>
import { SunIcon } from "@heroicons/vue/outline";
import { MoonIcon } from "@heroicons/vue/outline";
import { BookmarkAltIcon } from "@heroicons/vue/outline";
import { ChevronLeftIcon } from "@heroicons/vue/outline";
import { RefreshIcon } from "@heroicons/vue/outline";
import BookmarksView from "@/views/BookmarksView";
export default {
  name: "MainNav",
  inject: ["State"],
  expose: ["closeBookmarks"],
  components: {
    SunIcon,
    MoonIcon,
    BookmarkAltIcon,

    ChevronLeftIcon,
    RefreshIcon,
    BookmarksView,
  },
  data() {
    return {
      darkMode: "light",
      bookmarksVisible: false,
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
      this.bookmarksVisible = false;
    },
    toggleBookmarks() {
      this.bookmarksVisible = !this.bookmarksVisible;
    },
    closeBookmarks() {
      this.bookmarksVisible = false;
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
  },
};
</script>

<style>
.nav-btn {
  @apply h-12 w-12 rounded-full active:bg-cyan-50 dark:active:bg-cyan-50/20  transition focus:outline-0;
}

.nav-icon {
  @apply text-cyan-500
    active:text-cyan-500 hover:text-cyan-600
    dark:text-cyan-300 dark:active:text-cyan-300
    dark:hover:text-cyan-500/70
    transition;
}
</style>
