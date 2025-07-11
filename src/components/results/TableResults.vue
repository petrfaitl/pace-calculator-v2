<template>
  <div class="relative">
    <table class="w-full text-base text-left text-slate-700 dark:text-slate-50">
      <thead
        class="uppercase text-base text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 border-b-2 border-cyan-500 select-none"
      >
        <tr>
          <!--          <th scope="col" class="py-3 px-1 w-2"></th>-->
          <th scope="col" class="py-3 px-6 font-medium" colspan="2">
            Distance
          </th>
          <th scope="col" class="py-3 px-6 font-medium text-right">Time</th>
        </tr>
      </thead>
      <TransitionGroup tag="tbody" name="slide-up" appear>
        <template v-for="result in results" v-bind:key="result.name">
          <tr
            class="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 select-none"
            :id="result.id"
          >
            <td class="py-4 px-2 w-6">
              <button
                @click="toggleCategoryRow(result.id)"
                class="text-cyan-600 dark:text-cyan-500 opacity-50 align-middle"
              >
                <ChevronRightIcon
                  class="h-4 w-4 mx-auto"
                  :class="{ 'rotate-90': hiddenRows[result.id] }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </button>
            </td>
            <td
              class="py-4 px-2 font-medium dark:text-slate-200 text-slate-700 whitespace-nowrap"
            >
              {{ result.name }}
            </td>
            <Transition name="flash-color-2" appear>
              <td
                class="py-4 px-6 text-right"
                :key="result.time"
                @click="copyResultToClipboard(result.id, result.time)"
              >
                <div class="flex justify-end"></div>
                <transition name="fade" mode="out-in" appear>
                  <span class="copied" v-show="resultsCopied[result.id]"
                    >Copied!</span
                  >
                </transition>
                <span class="">{{ result.time }}</span>
              </td>
            </Transition>
          </tr>
          <Transition name="slide-fade">
            <tr
              :id="'row-' + result.id"
              class="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 select-none"
            >
              <td class="pl-4 pr-4" colspan="3" v-show="hiddenRows[result.id]">
                <span class="pr-2 text-xs font-bold">Categories</span>
                <span
                  v-for="cat in result.sportsCategories"
                  v-bind:key="cat.sportsCategories"
                  class="lowercase text-xs px-2 inline-block"
                  >{{ cat }}
                </span>
              </td>
            </tr>
          </Transition>
        </template>
      </TransitionGroup>
    </table>
  </div>
</template>
<script setup>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { ref, reactive } from "vue";

const hiddenRows = reactive({});

function toggleCategoryRow(id) {
  hiddenRows[id] = !hiddenRows[id];
}

const resultsCopied = reactive({});

const copyResultToClipboard = (id, time) => {
  // console.log(id);
  navigator.clipboard
    .writeText(time)
    .then(() => {
      resultsCopied[id] = true;
      setTimeout(() => {
        resultsCopied[id] = false;
      }, 2000);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
};

defineProps(["results"]);
</script>

<style scoped>
.flash-color-2-enter-from {
  @apply dark:text-slate-200 text-slate-700;
}
.flash-color-2-enter-active {
  @apply transition-colors text-cyan-500 dark:text-cyan-500 duration-1000;
}
.flash-color-2-enter-to {
  @apply dark:text-slate-200 text-slate-700;
}

/* Slide fade transition for category rows */
.slide-fade-enter-active,
.slide-fade-leave-active {
  @apply transition-all duration-100 ease-in-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  @apply transform opacity-0 max-h-0 overflow-hidden;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  @apply transform opacity-100 max-h-6 overflow-hidden;
}

/* Fade Transition */
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}

.copied {
  @apply ml-2 text-sm text-green-600 dark:text-green-400 mr-3;
}
</style>
