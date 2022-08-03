<template>
  <section class="mt-4 md:mt-8 p-8 md:w-1/2">
    <!-- Form -->
    <form action="" class="flex flex-col gap-10" @submit.prevent="processForm">
      <BaseInput
        label="Time"
        type="time"
        step="1"
        placeholder="Enter time"
        id="moving-time"
        required="required"
        v-model="movingTime"
        iconClasses="absolute inset-y-0 right-0 flex items-center pr-4 dark:text-slate-200 active:text-cyan-300 pointer-events-none"
      />

      <SelectInput
        label="Distance"
        v-show="!customDistance"
        :distances="distances"
        v-model="selectedDistance"
      />

      <BaseInput
        id="custom-distance"
        v-show="customDistance"
        label="Distance"
        type="number"
        step="0.1"
        placeholder="Enter distance"
        v-model.number="selectedDistance"
        iconClasses="absolute inset-y-0 right-0 flex items-center pr-4 dark:text-slate-200 active:text-cyan-300"
      />

      <div
        v-show="customDistance"
        class="flex gap-2 justify-center sm:justify-start"
      >
        <BaseRadioGroup :options="unitOptions" v-model="units" />
      </div>

      <ToggleInput
        name="customDistanceToggle"
        id="customDistanceToggle"
        v-model="customDistance"
        label="Custom Distance"
      />

      <button
        type="submit"
        class="h-16 w-full font-medium uppercase rounded-md active:-translate-y-0.5 bg-cyan-600 text-slate-50 active:bg-cyan-500 active:shadow-lg dark:hover:text-cyan-50 dark:bg-cyan-500 dark:active:bg-cyan-500/70 transition select-none"
      >
        View Results
      </button>
    </form>
  </section>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/form/BaseInput";
import SelectInput from "@/components/form/SelectInput";
import ToggleInput from "@/components/form/ToggleInput";
import BaseRadioGroup from "@/components/form/BaseRadioGroup";

export default {
  name: "CalculateView",
  inject: ["State"],
  components: {
    BaseRadioGroup,

    ToggleInput,
    SelectInput,
    BaseInput,
  },
  data() {
    return {
      movingTime: "00:00:00",
      selectedDistance: "",
      units: 1,
      customDistance: false,
      unitOptions: [
        { label: "kms", value: 1 },
        { label: "miles", value: 1.60934 },
      ],
      distances: [
        {
          name: "Select Distance",
          value: "",
          disabled: true,
          selected: true,
          hidden: true,
        },
        {
          group: "ByPace",
          options: [
            { name: "min/km", value: 1 },
            { name: "min/mile", value: 1.60934 },
          ],
        },
        {
          group: "By Distance",
          options: [
            { name: "400m", value: 0.4 },
            { name: "800m", value: 0.8 },
            { name: "1000m", value: 1 },
            { name: "1200m", value: 1.2 },
            { name: "1500m", value: 1.5 },
            { name: "1600m", value: 1.6 },
            { name: "1mile", value: 1.60934 },
            { name: "3k", value: 3 },
            { name: "5k", value: 5 },
            { name: "6k", value: 6 },
            { name: "7k", value: 7 },
            { name: "8k", value: 8 },
            { name: "10k", value: 10 },
            { name: "Half", value: 21.1 },
            { name: "Marathon", value: 42.2 },
            { name: "50k", value: 50 },
            { name: "100k", value: 100 },
            { name: "Miler", value: 160.934 },
          ],
        },
      ],
    };
  },
  computed: {
    activityData() {
      return {
        id: this.getId(),
        time: this.movingTime,
        distance: this.selectedDistance,
        convertFactor: this.units,
        distanceUnits: this.units === 1 ? "km" : "mile",
        customDistance: this.customDistance,
      };
    },
    distanceOptions() {
      const [{ options }] = this.distances.filter((el) => {
        if (!el.group || el.group === "ByPace") return;
        return el;
      });

      return options;
    },
  },
  methods: {
    getId() {
      return Date.now();
    },
    processForm() {
      // console.log(this.activityData);
      this.State.activity = this.activityData;
      this.$router.push({ name: "ResultsView" });
    },
    updateData() {
      this.time = this.State.activity.time;
      this.distance = this.State.activity.distance;
      this.units = this.State.activity.convertFactor;
      this.customDistance = this.State.activity.customDistance;
    },
  },
  created() {
    this.State.distances = this.distanceOptions;
  },
  updated() {
    console.log("Activity: ", this.State.activity);
    if (this.State.activity.id) this.updateData();
  },
};
</script>
