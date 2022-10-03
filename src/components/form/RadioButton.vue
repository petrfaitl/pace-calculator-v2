<template>
  <div class="flex h-14 w-full sm:w-24 relative">
    <input
      v-bind="$attrs"
      type="radio"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
      class="hidden peer"
    />
    <label
      :for="$attrs.id"
      class="w-full h-14 uppercase text-lg px-4 py-4 text-slate-700 peer-checked:text-slate-50 placeholder:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600 bg-transparent dark:bg-slate-800 dark:text-slate-200 focus:outline focus:outline-cyan-200 focus:ring-2 focus:ring-offset-1 ring-cyan-50 dark:ring-cyan-600/20 cursor-pointer peer-checked:dark:bg-cyan-500 peer-checked:bg-cyan-600"
      >{{ label }}</label
    >
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps(["label", "modelValue", "value", "iconClasses"]);

const { modelValue } = toRefs(props);
</script>

<script>
export default {
  name: "RadioButton",
  inheritAttrs: false,
};
</script>

<style scoped></style>
