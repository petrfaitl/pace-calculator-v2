<template>
  <div class="flex flex-col flex-1">
    <label
      class="uppercase text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 select-none"
      >{{ label }}</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 right-0 flex flex-col justify-center items-center pr-4 dark:text-slate-200 active:text-cyan-300 pointer-events-none"
      >
        <SelectorIcon
          id="clock-icon"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
      </div>
      <select
        name=""
        id=""
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full h-16 text-lg px-4 py-4 text-slate-700 placeholder:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600 appearance-none bg-transparent dark:bg-slate-800 dark:text-slate-200 focus:outline focus:outline-cyan-200 focus:ring-2 focus:ring-offset-1 ring-cyan-50 dark:ring-cyan-600/20"
      >
        <template v-for="option in distances">
          <optgroup
            v-if="option.group"
            :label="option.group"
            :key="option.group"
          >
            <option
              v-for="opt in option.options"
              :value="opt.value"
              :key="opt.value"
              :selected="opt.selected"
              :hidden="opt.hidden"
            >
              {{ opt.name }}
            </option>
          </optgroup>
          <option
            v-else
            :value="option.value"
            :key="option"
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
<script>
import { SelectorIcon } from "@heroicons/vue/outline";
export default {
  name: "SelectInput",
  components: { SelectorIcon },
  inheritAttrs: false,
  props: {
    distances: {},
    modelValue: { type: [Number, String], default: "" },
    label: { type: String, default: "" },
  },
  data() {
    return {
      selectedDistance: "",
    };
  },
};
</script>
