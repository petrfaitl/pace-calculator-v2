<template>
  <div class="flex flex-col">
    <label class="text-sm text-cyan-900 dark:text-cyan-100">{{ label }}</label>

    <div v-bind="$attrs">
      <span class="text-base inline-flex">{{ msg }}</span>
      <span class="text-sm block"> {{ units }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps(["msg", "units", "label"]);
</script>

<script>
export default {
  name: "HeaderField",
  inheritAttrs: false,
};
</script>

<style scoped></style>
