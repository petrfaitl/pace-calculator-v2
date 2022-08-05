<template>
  <section class="mt-4 md:mt-8 p-0 sm:px-8 sm:py-2 md:w-1/2">
    <!--    <div>{{ this.State.activity }}</div>-->
    <!--    id: {{ id }}-->

    <div
      v-if="this.State.activity.id"
      class="grid grid-cols-3 pb-2 border-b border-cyan-500 dark:border-cyan-300 text-slate-700 dark:text-slate-400 select-none"
    >
      <HeaderField
        id="distance"
        label="Distance"
        :msg="this.distance"
        :units="`${this.pluralStr(this.distance, this.distanceUnits)}`"
      />
      <HeaderField
        id="moving-time"
        label="Time"
        :msg="movingTime"
        class="border-l border-r border-cyan-500 dark:border-cyan-300"
      />
      <HeaderField
        id="pace"
        label="Pace"
        :msg="`${pace}`"
        :units="`/${distanceUnits}`"
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
    <div
      v-if="this.State.activity.id"
      class="hidden grid grid-cols-2 mt-4 pb-2 border-b border-cyan-500 dark:border-cyan-300 text-slate-700 dark:text-slate-400 select-none"
    >
      <HeaderField
        id="speed"
        label="Speed"
        :msg="this.distance"
        :units="`${this.pluralStr(this.distance, this.distanceUnits)}`"
      />
      <HeaderField
        id="moving-time"
        label="Time"
        :msg="movingTime"
        class="border-l border-cyan-500 dark:border-cyan-300"
      />
    </div>
  </section>
</template>

<script>
import HeaderField from "@/components/results/HeaderField";
import TableResults from "@/components/results/TableResults";
import { watchEffect } from "vue";

export default {
  name: "ResultsView",
  components: { HeaderField, TableResults },
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
    movingTimeMs() {
      return this.milliseconds(this.time);
    },
    movingTime() {
      return this.getHumanTime(this.movingTimeMs);
    },
    paceInMilli() {
      return this.getPace();
    },
    pace() {
      // const paceMillis =
      //   this.convertFactor === 1 ? this.getPace() : this.getPace();
      return this.getHumanTime(this.paceInMilli);
    },
    results() {
      return this.distances.map((dist) => {
        return {
          name: dist.name,
          value: dist.value,
          pace: this.distanceTimeCalc(dist.value / this.convertFactor),
        };
        // return this.distanceTimeCalc(dist.value);
      });
    },
  },
  methods: {
    getPace() {
      return Math.round(this.movingTimeMs / this.distance);
    },
    pluralStr(value, str) {
      return value > 1 ? `${str}s` : str;
    },
    getHumanTime(millis) {
      let seconds = Math.round(millis / 1000);
      let minutes = Math.trunc(seconds / 60);
      let hours = Math.trunc(minutes / 60);
      let days = Math.trunc(hours / 24);

      seconds = seconds % 60;
      minutes = minutes % 60;
      hours = hours % 24;

      // console.log(hours, minutes, seconds);
      let str =
        minutes || hours
          ? `${String(seconds).padStart(2, "0")}`
          : `${String(seconds).padStart(2, "0")}s`;
      str =
        minutes || hours ? `${String(minutes).padStart(2, "0")}:` + str : str;
      str = hours || days ? `${String(hours).padStart(2, "0")}:` + str : str;
      str = days ? `${String(days)}${this.pluralStr(days, "day")} ` + str : str;

      return str;
    },
    milliseconds() {
      // const paddedTime = time.padStart(8, "00:");
      const [hours, minutes, seconds] = this.time.split(":");
      return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    },
    distanceTimeCalc(distance) {
      return this.getHumanTime(this.paceInMilli * distance);
    },
    updateData(activity) {
      this.id = activity.id;
      this.time = activity.time;
      this.distance = activity.distance;
      this.distanceUnits = activity.distanceUnits;
      this.convertFactor = activity.convertFactor;
      this.customDistance = activity.customDistance;
    },
  },
  mounted() {
    watchEffect(() => {
      this.updateData(this.State.activity);
      this.bookmarked = this.State.bookmarked;
      !this.State.activity.id ? this.$router.replace("/") : "";
    });
  },
};
</script>

<style scoped></style>
