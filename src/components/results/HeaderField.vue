<template>
  <div class="flex flex-col">
    <label :for="$attrs.id" class="text-sm text-cyan-900 dark:text-cyan-50">{{
      $attrs.label
    }}</label>

    <div v-bind="$attrs">
      <span class="text-base inline-flex">{{ msg }}</span>
      <span class="text-sm inline-flex"> {{ units }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps(["msg", "units"]);
</script>

<script>
export default {
  name: "HeaderField",
  inheritAttrs: false,
};
</script>

<style scoped></style>
