<template>
  <section class="mt-4 md:mt-8 p-8 md:w-1/2">
    <!--    <div>{{ this.State.activity }}</div>-->
    <!--    id: {{ id }}-->

    <div
      v-if="this.State.activity.id"
      class="grid grid-cols-3 pb-2 border-b border-cyan-500 dark:border-cyan-300 text-slate-700 dark:text-slate-400 select-none"
    >
      <HeaderField id="distance" label="Distance" :msg="distanceDisplay" />
      <HeaderField
        id="moving-time"
        label="Time"
        :msg="movingTime"
        class="border-l border-r border-cyan-500 dark:border-cyan-300"
      />
      <HeaderField id="pace" label="Pace" :msg="`${pace} /${distanceUnits}`" />
    </div>
    <TableResults
      v-if="this.State.activity.id"
      id="results"
      label="results"
      :results="results"
      class="mt-4"
    />
  </section>
</template>

<script>
import HeaderField from "@/components/results/HeaderField";
import TableResults from "@/components/results/TableResults";
export default {
  name: "ResultsView",
  components: { HeaderField, TableResults },
  inject: ["State"],
  data() {
    return {
      // id: this.State.activity.id ?? null,
      // time: this.State.activity.time ?? "",
      // distance: this.State.activity.distance ?? "",
      // distanceUnits: this.State.activity.distanceUnits ?? "",
      // convertFactor: this.State.activity.convertFactor ?? 1,
      // mile2Km: 1.60934,
      // customDistance: this.State.activity.customDistance ?? false,
      // bookmarked: this.State.bookmarked ?? false,
      // distances: this.State.distances,
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
      const paceMillis =
        this.convertFactor === 1
          ? this.getPace()
          : this.getPace() * this.mile2Km;
      return this.getHumanTime(paceMillis);
    },
    distanceDisplay() {
      return this.customDistance
        ? `${this.distance}${this.distanceUnits}`
        : this.distance;
    },
    results() {
      return this.distances.map((dist) => {
        return {
          name: dist.name,
          value: dist.value,
          pace: this.distanceTimeCalc(dist.value),
        };
        // return this.distanceTimeCalc(dist.value);
      });
    },
  },
  methods: {
    getPace() {
      return Math.round(this.movingTimeMs / this.distance);
    },
    getHumanTime(millis) {
      let seconds = Math.floor(millis / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      seconds = seconds % 60;
      minutes = minutes % 60;

      // console.log(hours, minutes, seconds);
      let str = `${String(seconds).padStart(2, "0")}`;
      str = minutes ? `${String(minutes).padStart(2, "0")}:` + str : str;
      str = hours ? `${String(hours).padStart(2, "0")}:` + str : str;

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
    updateData() {
      this.id = this.State.activity.id;
      this.time = this.State.activity.time;
      this.distance = this.State.activity.distance;
      this.distanceUnits = this.State.activity.distanceUnits;
      this.convertFactor = this.State.activity.convertFactor;
      this.customDistance = this.State.activity.customDistance;
      this.bookmarked = this.State.bookmarked;
    },
  },
  updated() {},
  mounted() {
    this.updateData();
    !this.State.activity.id ? this.$router.replace("/") : "";
  },
};
</script>

<style scoped></style>
