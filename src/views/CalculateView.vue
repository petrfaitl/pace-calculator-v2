<template>
  <section class="mt-4 md:mt-8 p-8 md:w-1/2">
    <!-- Form -->
    <form action="" class="flex flex-col gap-10" @submit.prevent="processForm">
      <TimeInput
        label="Time"
        id="custom-moving-time"
        required="required"
        v-model="activity.selectedMovingTime"
        v-model:movingTime="activity.selectedMovingTime"
        iconClasses="absolute inset-y-0 right-0 flex items-center pr-4 dark:text-slate-200 active:text-cyan-300 pointer-events-none"
      />

      <!--      <BaseInput-->
      <!--        label="Time"-->
      <!--        type="time"-->
      <!--        step="1"-->
      <!--        placeholder="Enter time"-->
      <!--        id="moving-time"-->
      <!--        required="required"-->
      <!--        v-model="activity.selectedMovingTime"-->
      <!--        iconClasses="absolute inset-y-0 right-0 flex items-center pr-4 dark:text-slate-200 active:text-cyan-300 pointer-events-none"-->
      <!--      />-->

      <SelectInput
        label="Distance"
        inputName="distances"
        v-show="!activity.customDistance"
        :options="getDistances"
        v-model="activity.selectedDistance"
        v-model:distanceUnits="activity.distanceUnits"
      />

      <BaseInput
        id="custom-distance"
        v-show="activity.customDistance"
        label="Distance"
        type="number"
        step="0.001"
        placeholder="Enter distance"
        v-model.number="activity.selectedDistance"
        iconClasses="absolute inset-y-0 right-0 flex items-center pr-4 dark:text-slate-200 active:text-cyan-300"
      />

      <div
        v-show="activity.customDistance"
        class="flex gap-2 justify-center sm:justify-start"
      >
        <BaseRadioGroup
          :options="getUnitOptions"
          v-model="activity.distanceUnits"
        />
      </div>

      <ToggleInput
        name="customDistanceToggle"
        id="customDistanceToggle"
        v-model="activity.customDistance"
        label="Custom Distance"
      />

      <BasicButton type="submit" :disabled="!validInputs" msg="View Results" />
    </form>
  </section>
</template>

<script setup>
/* eslint-disable no-unused-vars */

import BaseInput from "@/components/form/BaseInput.vue";
import SelectInput from "@/components/form/SelectInput.vue";
import ToggleInput from "@/components/form/ToggleInput.vue";
import BaseRadioGroup from "@/components/form/BaseRadioGroup.vue";
import BasicButton from "@/components/BasicButton.vue";
import { useActivityStore } from "@/store/store";
import { storeToRefs } from "pinia";

import router from "@/router";
import { onMounted, onUpdated, ref } from "vue";
import TimeInput from "@/components/form/TimeInput.vue";

const store = useActivityStore();

const { activity, getDistances, getUnitOptions } = storeToRefs(store);

const processForm = () => {
  router.push({ name: "ResultsView" });
};
const validInputs = ref(false);

onUpdated(() => {
  validInputs.value = validateInputs();
});
onMounted(() => {
  validInputs.value = validateInputs();
});

const validateInputs = () => {
  const { selectedMovingTime, selectedDistance } = store.activity;

  return !!(selectedMovingTime && selectedDistance);
};
</script>
