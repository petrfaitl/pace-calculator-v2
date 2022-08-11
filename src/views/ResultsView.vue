<template>
  <section class="mt-8 md:mt-8 p-0 sm:px-8 sm:py-2 md:w-1/2">
    <!-- Icon Bookmark -->
    <div
      class="absolute right-8 md:right-14 top-24 z-0 overflow-hidden"
      v-if="$route.path === '/results'"
    >
      <button class="relative h-8 w-8" @click="toggleBookmark">
        <Transition name="slide-in" mode="out-in">
          <BookmarkIcon
            id="bookmarks-icon"
            class="h-8 w-8 mx-auto nav-icon -top-4 absolute"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
            v-show="!bookmarked"
          />
        </Transition>
        <Transition name="slide-out" mode="out-in">
          <BookmarkIconFilled
            id="bookmarks-icon-filled"
            class="h-8 w-8 mx-auto nav-icon -top-1.5 absolute"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            stroke-width="1"
            v-show="bookmarked"
          />
        </Transition>
      </button>
    </div>
    <div
      v-if="this.State.activity.id"
      class="grid grid-cols-4 pb-2 border-b-0 border-cyan-500 dark:border-cyan-300 text-slate-700 dark:text-slate-400 select-none"
    >
      <HeaderField
        id="distance"
        label="Distance"
        :msg="this.distance"
        :units="`${this.pluralStr(this.distance, this.distanceUnits)}`"
        class="border-r border-cyan-500 dark:border-cyan-300"
      />
      <HeaderField
        id="moving-time"
        label="Time"
        :msg="movingTime"
        class="border-r border-cyan-500 dark:border-cyan-300"
      />
      <HeaderField
        id="pace"
        label="Pace"
        :msg="`${pace}`"
        :units="`/${distanceUnits}`"
        class="border-r border-cyan-500 dark:border-cyan-300"
      />
      <HeaderField
        id="speed"
        label="Speed"
        :msg="`${speed}`"
        :units="`${this.distanceUnits}/h`"
      />
    </div>
    <div class="">
      <TableResults
        v-if="this.State.activity.id"
        id="results"
        label="results"
        :results="results"
        class="mt-4"
      />
    </div>
  </section>
</template>

<script>
import HeaderField from "@/components/results/HeaderField";
import TableResults from "@/components/results/TableResults";
import CalculateService from "@/services/CalculateService";
import { BookmarkIcon } from "@heroicons/vue/outline";
import { BookmarkIcon as BookmarkIconFilled } from "@heroicons/vue/solid";
import { watchEffect } from "vue";

export default {
  name: "ResultsView",
  // eslint-disable-next-line vue/no-unused-components
  components: { HeaderField, TableResults, BookmarkIcon, BookmarkIconFilled },
  inject: ["State"],
  data() {
    return {
      id: null,
      time: "",
      distance: "",
      distanceUnits: "",
      convertFactor: 1,
      mile2Km: 1.60934,
      customDistance: false,
      bookmarked: false,
      distances: this.State.distances,
    };
  },
  computed: {
    bookmarkPayload() {
      return {
        id: this.id,
        time: this.time,
        distance: this.distance,
        distanceUnits: this.distanceUnits,
        convertFactor: this.convertFactor,
        bookmarked: this.bookmarked,
        movingTime: this.movingTime,
        pace: `${this.pace}/${this.distanceUnits}`,
        speed: `${this.speed}${this.distanceUnits}/h`,
      };
    },
    movingTime() {
      return CalculateService.getMovingTime(this.time);
    },
    pace() {
      return CalculateService.getPace(this.time, this.distance);
    },
    speed() {
      return CalculateService.getSpeed(this.time, this.distance);
    },
    results() {
      return this.distances.map((dist) => {
        return {
          name: dist.name,
          value: dist.value,
          pace: CalculateService.distanceTimeCalc(
            this.time,
            this.distance,
            dist.value,
            this.convertFactor
          ),
        };
      });
    },
  },
  methods: {
    pluralStr(value, str) {
      return value > 1 ? `${str}s` : str;
    },
    updateData(activity) {
      this.id = activity.id;
      this.time = activity.time;
      this.distance = activity.distance;
      this.distanceUnits = activity.distanceUnits;
      this.convertFactor = activity.convertFactor;
      this.customDistance = activity.customDistance;
      this.bookmarked = activity.bookmarked;
    },
    toggleBookmark() {
      this.bookmarked = !this.bookmarked;
      this.State.activity.bookmarked = this.bookmarked;
      this.State.toggleBookmarkItem(this.bookmarkPayload);
    },
  },
  created() {
    watchEffect(() => {
      !this.State.activity.id ? this.$router.replace("/") : "";
      this.updateData(this.State.activity);
    });
  },
  mounted() {
    try {
      this.State.activity.movingTime = this.movingTime;
      this.State.activity.pace = this.pace;
      this.State.activity.speed = this.speed;
    } catch (e) {
      console.log(e);
      !this.time ? this.$router.replace("/") : "";
    }
  },
  updated() {
    this.State.activity.bookmarked = this.bookmarked;
  },
};
</script>

<style scoped>
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
</style>
