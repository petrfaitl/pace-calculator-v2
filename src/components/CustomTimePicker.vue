<template>
  <div class="flex flex-col flex-1">
    <!--    <label-->
    <!--      class="uppercase text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 select-none"-->
    <!--    >-->
    <!--      {{ label }}-->
    <!--    </label>-->
    <div class="flex items-center gap-2" :id="id">
      <!-- Hours Input -->
      <input
        ref="inputHours"
        v-model="time.hours"
        id="inputHours"
        type="number"
        placeholder="HH"
        class="time-input"
        min="0"
        max="23"
        @blur="handleBlur('hours')"
      />
      <span class="text-cyan-900 dark:text-cyan-50">:</span>
      <!-- Minutes Input -->
      <input
        ref="inputMinutes"
        id="inputMinutes"
        v-model="time.minutes"
        type="number"
        placeholder="MM"
        class="time-input"
        min="0"
        max="59"
        @blur="handleBlur('minutes')"
      />
      <span class="text-cyan-900 dark:text-cyan-50">:</span>
      <!-- Seconds Input -->
      <input
        ref="inputSeconds"
        id="inputSeconds"
        v-model="time.seconds"
        type="number"
        placeholder="SS"
        class="time-input"
        min="0"
        max="59"
        step="0.01"
        @blur="handleBlur('seconds')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";

// Props for the component
const props = defineProps({
  label: String,
  modelValue: String,
  id: String,
});
const { modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

// Local state to manage time
const time = ref({
  hours: "",
  minutes: "",
  seconds: "",
});

// Initialize time values from modelValue
if (modelValue.value && modelValue.value !== "00:00:00") {
  const [hours, minutes, seconds] = modelValue.value.split(":");
  time.value = {
    hours: hours !== "00" ? hours : "",
    minutes: minutes !== "00" ? minutes : "",
    seconds: seconds !== "00" ? seconds : "",
  };
}

// Watch for changes to `modelValue` and update local state accordingly
watch(modelValue, (newValue) => {
  if (newValue) {
    const [hours, minutes, seconds] = newValue.split(":");
    time.value = {
      hours: hours !== "00" ? hours : "",
      minutes: minutes !== "00" ? minutes : "",
      seconds: seconds !== "00" ? seconds : "",
    };
  }
});

// Emit the formatted time value upwards
function emitFormattedTime() {
  const formattedTime = `${time.value.hours.padStart(2, "0") || "00"}:${
    time.value.minutes.padStart(2, "0") || "00"
  }:${time.value.seconds.padStart(2, "0") || "00"}`;
  emit("update:modelValue", formattedTime);
}

// Handle formatting and emitting on blur
function handleBlur(field) {
  if (time.value[field]) {
    // Format the field to ensure it has two digits
    time.value[field] = String(time.value[field]).padStart(2, "0");
  }

  // Emit the formatted time after processing
  emitFormattedTime();
}
</script>

<style scoped>
.time-input {
  @apply text-center w-full h-16 text-lg px-4 py-4 text-slate-700 placeholder:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600 appearance-none bg-transparent dark:bg-slate-800 dark:text-slate-200 focus:outline focus:outline-cyan-200 focus:ring-2 focus:ring-offset-1 ring-cyan-50 dark:ring-cyan-600/20;
}

.time-input:focus {
  border-color: #06b6d4; /* Cyan color */
  outline: none;
}
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
