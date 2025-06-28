<template>
  <div class="flex flex-col flex-1">
    <label
      :for="inputName"
      class="uppercase text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 select-none font-medium"
      >{{ label }}
    </label>
    <div class="relative">
      <div
        class="absolute inset-y-0 right-0 flex flex-col justify-center items-center pr-4 dark:text-slate-200 active:text-cyan-300 pointer-events-none"
      >
        <ChevronUpDownIcon
          id="clock-icon"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </div>
      <select
        :name="inputName"
        :id="inputName"
        :value="modelValue"
        :data-units="distanceUnits"
        @input="updateData"
        class="w-full h-16 text-lg px-4 py-4 text-slate-700 placeholder:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600 appearance-none bg-transparent dark:bg-slate-800 dark:text-slate-200 focus:outline focus:outline-cyan-200 focus:ring-2 focus:ring-offset-1 ring-cyan-50 dark:ring-cyan-600/20"
      >
        <template v-for="option in options">
          <optgroup
            v-if="option.group"
            :label="option.group"
            :key="option.group"
          >
            <option
              v-for="opt in option.options"
              :value="opt.value"
              :key="opt.name"
              :data-units="opt.distanceUnits"
              :selected="opt.selected"
              :hidden="opt.hidden"
            >
              {{ opt.name }}
            </option>
          </optgroup>
          <option
            v-else
            :value="option.value"
            :key="option.name"
            :selected="option.selected"
            :hidden="option.hidden"
          >
            {{ option.name }}
          </option>
        </template>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ChevronUpDownIcon } from "@heroicons/vue/24/outline";
import { toRefs } from "vue";
const props = defineProps([
  "options",
  "modelValue",
  "distanceUnits",
  "label",
  "inputName",
]);
const { modelValue, distanceUnits } = toRefs(props);

const emit = defineEmits([
  "update:modelValue",
  "update:distanceUnits",
  "change",
]);

function updateData(e) {
  emit("update:modelValue", e.target.value);
  emit(
    "update:distanceUnits",
    e.target.options[e.target.selectedIndex].getAttribute("data-units")
  );
  emit("change", e);
}
</script>
<script>
export default {
  name: "SelectInput",
  inheritAttrs: false,
};
</script>
