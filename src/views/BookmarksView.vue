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
          key="0"
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
            @click="unbookmarkItem(bookmark.id)"
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
              id="distance"
              label="Distance"
              :msg="bookmark.distance"
              :units="bookmark.distanceUnits"
            />
            <HeaderField
              id="moving-time"
              label="Time"
              :msg="this.getMovingTime(bookmark.time)"
              class=""
            />
            <HeaderField id="pace" label="Pace" :msg="bookmark.pace" />
            <HeaderField id="speed" label="Speed" :msg="bookmark.speed" />
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

<script>
import { watchEffect } from "vue";
import HeaderField from "@/components/results/HeaderField";
import { BookmarkIcon } from "@heroicons/vue/solid";
import CalculateService from "@/services/CalculateService";

export default {
  name: "BookmarksView",
  inject: ["State"],
  props: ["bookmarksVisible"],
  components: { HeaderField, BookmarkIcon },
  data() {
    return {
      bookmarksArray: [],
    };
  },
  computed: {
    bookmarks() {
      return this.bookmarksArray;
    },
  },
  methods: {
    bookmarkToActivity(bookmark) {
      this.State.activity = bookmark;
      if (this.bookmarksVisible) {
        this.$emit("bookmarkClicked", true);
      }
    },
    getMovingTime(time) {
      return CalculateService.getMovingTime(time);
    },
    unbookmarkItem(id) {
      this.State.toggleBookmarkItem({ id });
    },
  },
  mounted() {
    // Add bookmarks from store
    watchEffect(() => {
      this.bookmarksArray = this.State.bookmarks;
    });
  },
};
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
