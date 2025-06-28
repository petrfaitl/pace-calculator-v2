<template>
  <div class="flex flex-col flex-1">
    <label
      :for="id"
      class="uppercase text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 select-none"
    >
      {{ label }}
    </label>
    <div class="flex items-center gap-2">
      <input
        ref="inputHours"
        :value="time.hours"
        type="number"
        :id="id"
        placeholder="HH"
        class="time-input"
        min="0"
        max="23"
        @input="updateTime"
      />
      <span class="text-cyan-900 dark:text-cyan-50">:</span>
      <input
        ref="inputMinutes"
        :value="time.minutes"
        type="number"
        placeholder="MM"
        class="time-input"
        min="0"
        max="59"
        @input="updateTime"
      />
      <span class="text-cyan-900 dark:text-cyan-50">:</span>
      <input
        ref="inputSeconds"
        :value="time.seconds"
        type="number"
        placeholder="SS"
        class="time-input"
        min="0"
        max="59"
        @input="updateTime"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";

// Props for the component
const props = defineProps(["label", "modelValue", "id"]);
const { modelValue } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

// Local state to manage time
const time = ref({
  hours: "00",
  minutes: "00",
  seconds: "00",
});

const inputHours = ref();
const inputMinutes = ref();
const inputSeconds = ref();

// Update time from modelValue on load

if (modelValue.value) {
  const [hours, minutes, seconds] = modelValue.value
    .split(":")
    .map((val) => val.padStart(2, "0"));
  time.value = { hours, minutes, seconds };
}

// Step 2: Watch for changes to `modelValue` and update `time`
watch(modelValue, (newValue) => {
  if (newValue) {
    const [hours, minutes, seconds] = newValue
      .split(":")
      .map((val) => val.padStart(2, "0"));
    time.value = { hours, minutes, seconds }; // Update local state
  }
});

// Emit updated time upwards
function updateTime() {
  time.value.hours = inputHours.value.value;
  time.value.minutes = inputMinutes.value.value;
  time.value.seconds = inputSeconds.value.value;
  const { hours, minutes, seconds } = time.value;

  // Format: HH:MM:SS
  const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${seconds.padStart(2, "0")}`;
  emit("update:modelValue", formattedTime);
  // emit("update:movingTime", formattedTime);
  // console.log(formattedTime);
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
