<template>
  <div>
    <!-- Table Header -->
    <div class="flex justify-between items-center px-2 mb-4">
      <h3 class="text-lg font-medium dark:text-slate-50">
        Custom Distances for {{ sportsModeTitle }}
      </h3>
      <button
        @click="addCustomDistance"
        class="px-3 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 text-sm flex items-center"
      >
        <span class="mr-1">+</span> Add
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="customDistances.length === 0"
      class="text-center py-8 bg-slate-100 dark:bg-slate-800 rounded-md"
    >
      <p class="text-gray-500 dark:text-slate-400">
        No custom distances added yet.
      </p>
      <button
        @click="addCustomDistance"
        class="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
      >
        Add Your First Custom Distance
      </button>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <thead class="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"
            >
              Distance
            </th>
            <!--            <th-->
            <!--              scope="col"-->
            <!--              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"-->
            <!--            >-->
            <!--              Units-->
            <!--            </th>-->
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-800"
        >
          <tr v-for="(distance, index) in customDistances" :key="index">
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-200"
            >
              {{ distance.name }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400"
            >
              {{ distance.value }}{{ distance.distanceUnits }}
            </td>
            <!--            <td-->
            <!--              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400"-->
            <!--            >-->
            <!--              {{ distance.distanceUnits }}-->
            <!--            </td>-->
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <button
                @click="editCustomDistance(index)"
                class="text-cyan-600 hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-300 mr-4"
              >
                Edit
              </button>
              <button
                @click="confirmDeleteCustomDistance(index)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Custom Distance Form Modal -->
    <CustomDistanceView
      v-if="showCustomDistanceForm"
      :initial-distance="currentDistance"
      :is-editing="isEditing"
      :current-sports-mode="sportsMode"
      @save="saveCustomDistance"
      @cancel="cancelCustomDistanceForm"
    />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirmation"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 class="text-xl font-medium mb-4 dark:text-slate-50">
          Confirm Delete
        </h2>
        <p class="mb-6 dark:text-slate-300">
          Are you sure you want to delete this custom distance?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteConfirmation = false"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            @click="deleteCustomDistance"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { SportsConfiguration } from "@/services/SportsConfiguration";
import { CustomDistanceService } from "@/services/CustomDistanceService";
import CustomDistanceView from "../../views/CustomDistanceView.vue";

const props = defineProps({
  sportsMode: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["distancesUpdated"]);

// State
const customDistances = ref([]);
const showCustomDistanceForm = ref(false);
const showDeleteConfirmation = ref(false);
const currentDistance = ref({});
const isEditing = ref(false);
const deleteIndex = ref(-1);

// Computed properties
const sportsModeTitle = computed(() => {
  return SportsConfiguration[props.sportsMode].sportTitle;
});

// Methods
const loadCustomDistances = () => {
  customDistances.value = CustomDistanceService.getCustomDistancesForSportsMode(
    props.sportsMode
  );
};

const addCustomDistance = () => {
  currentDistance.value = {
    name: "",
    value: "",
    distanceUnits: "",
    sportsMode: props.sportsMode,
    sportsCategories:
      props.sportsMode === "swim" ? ["custom swim"] : ["custom"],
  };
  isEditing.value = false;
  showCustomDistanceForm.value = true;
};

const editCustomDistance = (index) => {
  currentDistance.value = { ...customDistances.value[index] };
  isEditing.value = true;
  showCustomDistanceForm.value = true;
  deleteIndex.value = index; // Store index for updating
};

const confirmDeleteCustomDistance = (index) => {
  deleteIndex.value = index;
  showDeleteConfirmation.value = true;
};

const deleteCustomDistance = () => {
  CustomDistanceService.deleteCustomDistance(
    props.sportsMode,
    deleteIndex.value
  );
  loadCustomDistances();
  showDeleteConfirmation.value = false;
  emit("distancesUpdated");
};

const saveCustomDistance = (distance) => {
  if (isEditing.value) {
    CustomDistanceService.updateCustomDistance(
      props.sportsMode,
      deleteIndex.value,
      distance
    );
  } else {
    CustomDistanceService.addCustomDistance(distance);
  }

  loadCustomDistances();
  showCustomDistanceForm.value = false;
  emit("distancesUpdated");
};

const cancelCustomDistanceForm = () => {
  showCustomDistanceForm.value = false;
};

// Watch for changes in sportsMode
watch(
  () => props.sportsMode,
  () => {
    loadCustomDistances();
  }
);

// Initialize
onMounted(() => {
  loadCustomDistances();
});
</script>
