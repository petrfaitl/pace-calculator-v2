<template>
  <div class="flex flex-col">
    <label :for="$attrs.id" class="text-sm text-cyan-900 dark:text-cyan-50">{{
      $attrs.label
    }}</label>
    <div v-bind="$attrs">
      <span class="text-base inline-flex dark:text-slate-200 text-slate-700">{{
        $attrs.msg
      }}</span>
      <span class="text-sm inline-flex"> {{ $attrs.units }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderField",
  inheritAttrs: false,
  props: {},
};
</script>

<style scoped></style>
