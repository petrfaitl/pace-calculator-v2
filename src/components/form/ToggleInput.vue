<template>
  <div class="flex items-center">
    <div
      class="ml-4 relative inline-block w-10 align-middle select-none transition duration-200 ease-in"
    >
      <input
        type="checkbox"
        :checked="modelValue"
        :name="name"
        :id="id"
        @input="$emit('update:modelValue', $event.target.checked)"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full shadow-md border-4 border-slate-400 dark:border-slate-300 bg-slate-400 dark:bg-slate-300 appearance-none cursor-pointer transition duration-300 focus:outline-0"
      />
      <label
        class="toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 dark:bg-slate-500 cursor-pointer transition duration-300"
      ></label>
    </div>
    <label
      :for="id"
      class="uppercase text-cyan-900 dark:text-cyan-50 pl-4 select-none font-medium"
      >{{ label }}</label
    >
  </div>
</template>
<script setup>
defineProps(["label", "id", "modelValue", "name"]);
</script>

<script>
// export default {
//   name: "ToggleInput",
//   // props: ["label", "id", "modelValue", "name"],
// };
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply translate-x-4 border-cyan-600 bg-cyan-600  dark:border-cyan-300 dark:bg-cyan-300;
}

.toggle-checkbox:checked + .toggle-label {
  @apply bg-cyan-300  dark:bg-cyan-700;
}
</style>
