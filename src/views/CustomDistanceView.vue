<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 class="text-xl font-medium mb-4 dark:text-slate-50">
        {{ isEditing ? "Edit Custom Distance" : "Add Custom Distance" }}
      </h2>

      <form @submit.prevent="saveCustomDistance">
        <!-- Name Field -->
        <div class="mb-4">
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase pl-4 text-left"
            >Name</label
          >
          <input
            id="name"
            v-model="customDistance.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            required
          />
        </div>

        <!-- Value Field -->
        <div class="mb-4">
          <label
            for="value"
            class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase pl-4 text-left"
            >Distance</label
          >
          <input
            id="value"
            v-model.number="customDistance.value"
            type="number"
            step="0.001"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            required
          />
        </div>

        <!-- Distance Units Field -->
        <div class="mb-4">
          <label
            for="distanceUnits"
            class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase pl-4 text-left"
            >Units</label
          >
          <select
            id="distanceUnits"
            v-model="customDistance.distanceUnits"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            required
          >
            <option
              v-for="unit in availableDistanceUnits"
              :key="unit.value"
              :value="unit.value"
            >
              {{ unit.name }}
            </option>
          </select>
        </div>

        <!-- Sports Mode Field -->
        <div class="mb-4">
          <label
            for="sportsMode"
            class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase pl-4 text-left"
            >Sport</label
          >
          <select
            id="sportsMode"
            v-model="selectedSportsMode"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            required
          >
            <option value="run">Running</option>
            <option value="swim">Swimming</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { SportsConfiguration } from "@/services/SportsConfiguration";

const props = defineProps({
  initialDistance: {
    type: Object,
    default: () => ({
      name: "",
      value: "",
      distanceUnits: "",
      sportsMode: "run",
      sportsCategories: ["custom"],
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  currentSportsMode: {
    type: String,
    default: "run",
  },
});

const emit = defineEmits(["save", "cancel"]);

// Create a copy of the initial distance to avoid modifying the prop directly
const customDistance = ref({
  name: props.initialDistance.name || "",
  value: props.initialDistance.value || "",
  distanceUnits: props.initialDistance.distanceUnits || "",
  sportsMode: props.initialDistance.sportsMode || props.currentSportsMode,
  sportsCategories: [...(props.initialDistance.sportsCategories || [])],
});

// Track the selected sports mode separately
const selectedSportsMode = ref(
  props.initialDistance.sportsMode || props.currentSportsMode
);

// Watch for changes in selectedSportsMode and update customDistance.sportsMode
const updateSportsModes = () => {
  customDistance.value.sportsMode = selectedSportsMode.value;

  // Update sportsCategories based on sports mode
  if (selectedSportsMode.value === "swim") {
    customDistance.value.sportsCategories = ["custom swim"];
  } else {
    customDistance.value.sportsCategories = ["custom"];
  }
};

// Computed property to get available distance units based on selected sports mode
const availableDistanceUnits = computed(() => {
  const config = SportsConfiguration[selectedSportsMode.value];
  return config.supportedDistanceUnits;
});

// Set default distance units when sports mode changes
const updateDefaultDistanceUnits = () => {
  const config = SportsConfiguration[selectedSportsMode.value];
  if (
    !customDistance.value.distanceUnits ||
    !availableDistanceUnits.value.some(
      (unit) => unit.value === customDistance.value.distanceUnits
    )
  ) {
    customDistance.value.distanceUnits = config.baseDistanceUnit;
  }
};

// Watch for changes in selectedSportsMode
const watchSportsMode = () => {
  updateSportsModes();
  updateDefaultDistanceUnits();
};

// Save the custom distance
const saveCustomDistance = () => {
  // Ensure sportsModes and sportsCategories are updated
  updateSportsModes();

  // Create a copy of the custom distance to emit
  const distanceToSave = { ...customDistance.value };

  // Emit the save event with the custom distance
  emit("save", distanceToSave);
};

// Initialize the component
onMounted(() => {
  // Set default distance units if not provided
  if (!customDistance.value.distanceUnits) {
    updateDefaultDistanceUnits();
  }
});

// Watch for changes in selectedSportsMode
watch(selectedSportsMode, watchSportsMode);
</script>
