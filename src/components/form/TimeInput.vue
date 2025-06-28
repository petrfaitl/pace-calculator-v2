<template>
  <div class="flex flex-col flex-1">
    <label
      class="uppercase text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 select-none font-medium"
      >{{ label }}</label
    >
    <CustomTimePicker
      v-bind="$attrs"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <component :is="'p'" :class="['pt-2', {}]">
      <div class="dark:text-slate-200">{{ msg }}</div>
    </component>
  </div>
</template>

<script setup>
import CustomTimePicker from "@/components/CustomTimePicker.vue";
import { ref } from "vue";

defineProps(["label", "modelValue", "movingTime"]);

const msg = ref("");
</script>

<style scoped>
/* Additional styles for CustomTimePicker, if needed */
</style>
