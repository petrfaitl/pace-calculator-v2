<template>
  <section class="mt-8 md:mt-8 p-0 sm:px-8 sm:py-2 md:w-1/2">
    <!-- Icon Bookmark -->
    <div
      v-if="$route.path === '/results'"
      class="absolute right-8 md:right-14 top-24 z-0 overflow-hidden"
    >
      <button class="relative h-8 w-8" @click="toggleBookmark()">
        <Transition name="slide-in" mode="out-in">
          <BookmarkIcon
            v-show="!activity.bookmarked"
            id="bookmarks-icon"
            class="h-8 w-8 mx-auto nav-icon -top-4 absolute"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          />
        </Transition>
        <Transition name="slide-out" mode="out-in">
          <BookmarkIconFilled
            v-show="activity.bookmarked"
            id="bookmarks-icon-filled"
            class="h-8 w-8 mx-auto nav-icon -top-1.5 absolute"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            stroke-width="1"
          />
        </Transition>
      </button>
    </div>
    <div
      v-if="activity.id"
      class="grid grid-cols-4 pb-2 border-b-0 border-cyan-500 dark:border-cyan-300 text-slate-700 dark:text-slate-400 select-none"
    >
      <Transition name="flash-color" appear>
        <HeaderField
          id="distance"
          label="Distance"
          :key="distanceVal"
          :units="`${CalculateService.pluralStr(
            distanceVal,
            activity.distanceUnits
          )}`"
          :msg="distanceVal"
          class="border-r border-cyan-500 dark:border-cyan-300"
      /></Transition>
      <Transition name="flash-color" appear>
        <HeaderField
          id="moving-time"
          label="Time"
          :key="getMovingTime"
          :msg="getMovingTime"
          class="border-r border-cyan-500 dark:border-cyan-300"
        />
      </Transition>
      <Transition name="flash-color" appear>
        <HeaderField
          id="pace"
          label="Pace"
          :key="getPace"
          :units="`/${activity.distanceUnits}`"
          :msg="getPace"
          class="border-r border-cyan-500 dark:border-cyan-300"
      /></Transition>
      <Transition name="flash-color" appear>
        <HeaderField
          id="speed"
          label="Speed"
          :key="getSpeed"
          :msg="getSpeed"
          :units="`${activity.distanceUnits}/h`"
      /></Transition>
    </div>
    <div class="">
      <TableResults
        v-if="activity.id"
        id="results"
        label="results"
        :results="results"
        class="mt-4"
      />
    </div>
  </section>
</template>

<script setup>
import HeaderField from "@/components/results/HeaderField";
import TableResults from "@/components/results/TableResults";
import { BookmarkIcon } from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkIconFilled } from "@heroicons/vue/24/solid";
import { useActivityStore } from "@/store/store";
import CalculateService from "@/services/CalculateService";
import { storeToRefs } from "pinia";

const store = useActivityStore();
const { activity, results, getSpeed, getPace, distanceVal, getMovingTime } =
  storeToRefs(store);

function toggleBookmark() {
  store.toggleBookmarkItem();
}
</script>

<style scoped>
/* Bookmark Icon transition */
.slide-out-enter-from {
  @apply -translate-y-4 opacity-0;
}
.slide-out-enter-to,
.slide-out-leave-from {
  @apply opacity-100;
}

.slide-out-leave-to {
  @apply opacity-0;
}
.slide-out-move,
.slide-out-enter-active,
.slide-out-leave-active {
  @apply transition duration-500;
}

/* Unbookmark Icon transition */
.slide-in-enter-from {
  @apply translate-y-2 opacity-0;
}
.slide-in-enter-to {
  @apply opacity-100;
}

.slide-in-leave-to {
  @apply opacity-0;
}
.slide-in-move,
.slide-in-enter-active,
.slide-in-leave-active {
  @apply transition duration-500;
}

.flash-color-enter-from {
  @apply dark:text-slate-200 text-slate-700;
}
.flash-color-enter-active {
  @apply transition-colors text-cyan-500 dark:text-cyan-500 duration-1000;
}
.flash-color-enter-to {
  @apply dark:text-slate-200 text-slate-700;
}
</style>
