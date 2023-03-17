<template>
  <div class="flex flex-col flex-1">
    <label
      class="uppercase text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 select-none"
      >{{ label }}</label
    >
    <div class="relative">
      <div :class="iconClasses">
        <ClockIcon
          id="clock-icon"
          v-show="$attrs.type === 'time'"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        />
        <BackspaceIcon
          id="clock-icon"
          v-show="$attrs.type === 'number'"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="clear()"
        />
      </div>

      <input
        ref="baseInput"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full h-16 text-lg px-4 py-4 text-slate-700 placeholder:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600 appearance-none bg-transparent dark:bg-slate-800 dark:text-slate-200 focus:outline focus:outline-cyan-200 focus:ring-2 focus:ring-offset-1 ring-cyan-50 dark:ring-cyan-600/20"
      />
    </div>
    <component :is="'p'" :class="['pt-2', {}]">
      <div class="dark:text-slate-200">{{ msg }}</div>
      <div class="dark:text-slate-200">{{}}</div>
    </component>
  </div>
</template>
<script setup>
import { ClockIcon, BackspaceIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

defineProps(["label", "modelValue", "iconClasses"]);

const msg = ref("");
const baseInput = ref(null);
function clear() {
  baseInput.value.value = "";
}
</script>

<script>
// import { ClockIcon, BackspaceIcon } from "@heroicons/vue/24/outline";

export default {
  name: "BaseInput",
  inheritAttrs: false,
};
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
}

input[type="number"]::-webkit-textfield-decoration-container {
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
