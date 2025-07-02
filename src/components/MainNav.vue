<template>
  <nav
    class="relative w-full z-20 flex justify-around md:px-4 items-center h-24 border-b border-cyan-500 dark:border-cyan-300 bg-white dark:bg-slate-900/50"
    @click.self="closeBookmarks()"
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
            @click="router.back()"
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
          <span class="px-2" @click="router.back()">{{ pageTitle }}</span>
        </div>
      </Transition>
      <Transition
        v-else
        class="font-normal text-lg sm:text-xl text-cyan-900 dark:text-cyan-50 select-none pl-2 sm:pl-4"
        mode="out-in"
        name="slide-left"
        appear
      >
        <div>{{ pageTitle }}</div>
      </Transition>
    </div>

    <div class="flex justify-around items-center md:gap-2">
      <div class="">
        <button
          class="rounded-2xl transition"
          @click="store.toggleActivitySportsMode"
        >
          <span
            class="sport-pill bg-sky-500/20 text-sky-900 dark:text-sky-50 rounded-md"
            v-if="getActivitySportsMode === 'run'"
          >
            {{ getActivitySportsMode }}
          </span>
          <span
            class="sport-pill bg-teal-500/20 text-teal-900 dark:text-teal-50 rounded-md"
            v-else
          >
            {{ getActivitySportsMode }}</span
          >
        </button>
      </div>

      <!--      Reset Calculations-->
      <button class="nav-btn group" @click="reset()" aria-label="Reset values">
        <ArrowPathIcon
          id="bookmark-alt-icon"
          class="h-6 w-6 mx-auto group-active:animate-spin nav-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </button>

      <!-- Icon Bookmarks all -->
      <button
        class="nav-btn disabled:opacity-25"
        @click="toggleBookmarksVisible()"
        aria-label="View bookmarks"
      >
        <BookmarkSquareIcon
          id="bookmark-alt-icon"
          class="h-6 w-6 mx-auto nav-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </button>

      <!-- Icon Preferences -->
      <button
        class="nav-btn"
        @click="navigateToPreferences()"
        aria-label="User preferences"
      >
        <Cog6ToothIcon
          id="preferences-icon"
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
    @bookmarkClicked="toggleBookmarksVisible"
  />
</template>

<script setup>
/* eslint-disable */
import { useActivityStore } from "@/store/store";
import { computed, onBeforeMount, ref } from "vue";
import { BookmarkSquareIcon } from "@heroicons/vue/24/outline";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import BookmarksView from "@/views/BookmarksView.vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";


const store = useActivityStore();
const route = useRoute();

defineExpose({ closeBookmarks });

const bookmarksVisible = ref(false);
const { activity, userPreferences } = storeToRefs(store);

const pageTitle = computed(() => {
  return route.meta.title || "Pace Converter";
});

const getActivitySportsMode = computed(() => {
  // If user preferences has a different sports mode than activity, update activity
  if (userPreferences.value.sportsMode !== activity.value.sportsMode) {
    activity.value.sportsMode = userPreferences.value.sportsMode;
  }
  return activity.value.sportsMode;
})



const reset = () => {
  store.initActivity();
  bookmarksVisible.value = false;
  router.replace({ name: "CalculateView"});

};

const toggleBookmarksVisible = () => {
  bookmarksVisible.value = !bookmarksVisible.value;
};

const navigateToPreferences = () => {
  bookmarksVisible.value = false;
  router.push({ name: "PreferencesView" });
};

function closeBookmarks()  {
  bookmarksVisible.value = false;
}


onBeforeMount(() => {
  store.loadBookmarks();
});

</script>


<style>
.nav-btn {
  @apply h-12 w-12 rounded-full active:bg-cyan-50 dark:active:bg-cyan-50/20  transition focus:outline-0;
}
.sport-pill{
  @apply px-4 py-1 rounded-2xl;
}

.nav-icon {
  @apply text-cyan-500
    active:text-cyan-500 hover:text-cyan-600
    dark:text-cyan-300 dark:active:text-cyan-300
    dark:hover:text-cyan-500/70
    transition;
}
</style>
