<template>
  <div class="relative">
    <table class="w-full text-base text-left text-slate-700 dark:text-slate-50">
      <thead
        class="uppercase text-base text-left text-cyan-900 dark:text-cyan-50 pl-4 mb-3 border-b-2 border-cyan-500 select-none"
      >
        <tr>
          <th scope="col" class="py-3 px-6 font-medium">Distance</th>
          <th scope="col" class="py-3 px-6 font-medium text-right">Time</th>
          <th scope="col" class="py-3 px-6 hidden">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <TransitionGroup tag="tbody" name="slide-up" appear>
        <template v-for="result in results" v-bind:key="result.name">
          <tr
            class="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 select-none"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium dark:text-slate-200 text-slate-700 whitespace-nowrap"
            >
              {{ result.name }}
            </th>

            <td class="py-4 px-6 dark:text-slate-200 text-slate-700 text-right">
              {{ result.pace }}
            </td>
            <td class="py-4 px-6 text-right hidden">
              <a
                href="#"
                class="font-medium text-cyan-600 dark:text-cyan-500 hover:underline"
                >Edit</a
              >
            </td>
          </tr>
        </template>
      </TransitionGroup>
    </table>
  </div>
</template>

<script>
//TODO update to setup
export default {
  name: "TableResults",
  props: {
    results: {
      type: Array,
    },
  },
};
</script>
