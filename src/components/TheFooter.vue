<template>
  <div class="container p-4 text-left mt-48">
    <!--    <div class="py-4">-->
    <!--      <SelectInput-->
    <!--        :label="unitsOfMeasure.label"-->
    <!--        :inputName="unitsOfMeasure.name"-->
    <!--        :options="unitsOfMeasure.options"-->
    <!--        v-model="userPreferences.unitsOfMeasure"-->
    <!--        @change="updateData"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import { useActivityStore } from "@/store/store";
import { storeToRefs } from "pinia";
// import SelectInput from "@/components/form/SelectInput.vue";

const store = useActivityStore();

const { appVersion, unitsOfMeasure, userPreferences } = storeToRefs(store);

function updateData(e) {
  store.toggleUserPreferencesUnits(e.target.value);
  // console.log(e.target.value);
}
</script>
