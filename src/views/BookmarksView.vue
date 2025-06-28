<template>
  <transition name="fade">
    <div
      class="absolute border border-cyan-600/50 border-t-0 z-10 right-0 h-fit w-full sm:w-2/3 md:w-3/5 lg:w-2/5 xl:w-1/3 bg-slate-50 dark:bg-cyan-900 shadow-xl"
    >
      <!--      <ul class="relative">-->
      <TransitionGroup name="bookmarks" tag="ul" class="relative" mode="out-in">
        <li
          v-if="bookmarks.length === 0"
          class="flex justify-center p-8"
          :key="0"
        >
          <BookmarkIcon
            id="bookmark-icon"
            class="h-6 w-6 mr-4 text-cyan-600 dark:text-cyan-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          />
          <span class="dark:text-slate-50">
            Add bookmarks from calculated results
          </span>
        </li>

        <li
          class="flex group hover:bg-slate-200 active:bg-slate-200/70 dark:active:bg-cyan-600/70 dark:hover:bg-cyan-600 text-slate-700 dark:text-slate-200 dark:hover:text-white hover:-translate-y-0.5 transition-translate duration-300 border-b"
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
        >
          <button
            class="mx-4"
            :data-bookmark-id="bookmark.id"
            @click="store.removeBookmarkItem(bookmark.id)"
          >
            <BookmarkIcon
              id="bookmark-icon"
              class="h-6 w-6 mx-auto text-cyan-600 active:text-cyan-600 dark:group-hover:text-slate-50 dark:text-cyan-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            />
          </button>
          <router-link
            :to="{ name: 'ResultsView' }"
            @click="bookmarkToActivity(bookmark)"
            class="flex flex-1 p-4 gap-4 md:gap-8 justify-between"
          >
            <HeaderField
              label="Distance"
              :msg="bookmark.distanceVal"
              :units="`${CalculateService.pluralStr(
                bookmark.distanceVal,
                bookmark.distanceUnits
              )}`"
            />
            <HeaderField label="Time" :msg="bookmark.time" class="" />
            <HeaderField
              label="Pace"
              :msg="bookmark.pace"
              :units="`${bookmark.paceDisplayUnits}`"
            />
            <HeaderField
              label="Speed"
              :msg="bookmark.speed"
              :units="`${bookmark.speedDisplayUnits}`"
            />
            <!--            <div class="flex-auto w-8"></div>-->
          </router-link>
          <!--          <button-->
          <!--            class="nav-icon inline-flex items-center ml-auto mr-4 hover:underline underline-offset-4 invisible group-hover:visible transition"-->
          <!--          >-->
          <!--            <span class="text-xs">remove</span>-->
          <!--          </button>-->
        </li>
      </TransitionGroup>
      <!--      </ul>-->
    </div>
  </transition>
</template>

<script setup>
import HeaderField from "@/components/results/HeaderField.vue";
import { BookmarkIcon } from "@heroicons/vue/24/solid";
import { useActivityStore } from "@/store/store";
import CalculateService from "@/services/CalculateService";
import { storeToRefs } from "pinia";

const store = useActivityStore();
const { activity, bookmarks } = storeToRefs(store);

defineProps(["bookmarksVisible"]);
const emit = defineEmits(["bookmarkClicked"]);

function bookmarkToActivity(bookmark) {
  activity.value = { ...bookmark };
  emit("bookmarkClicked");
}
</script>

<style scoped>
.bookmarks-leave-active {
  @apply transition-all duration-500;
}
.bookmarks-enter-active {
  @apply transition-all duration-500;
}

.bookmarks-leave-to {
  @apply opacity-0 w-full translate-x-3;
}
.bookmarks-enter-from {
  @apply opacity-0 translate-x-3;
}
</style>
