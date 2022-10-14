<template>
  <button
    v-bind="$attrs"
    class="h-16 w-full font-medium uppercase rounded-md disabled:translate-y-0 disabled:shadow-none disabled:opacity-40 disabled:active:bg-cyan-500 disabled:dark:active:bg-cyan-500 disabled:dark:opacity-40 disabled:dark:active:shadow-none disabled:cursor-not-allowed active:-translate-y-0.5 bg-cyan-500 text-white active:bg-cyan-600 active:shadow-lg dark:hover:text-cyan-50 dark:bg-cyan-500 dark:active:bg-cyan-500/70 transition select-none"
  >
    {{ msg }}
  </button>
</template>
<script setup>
defineProps(["msg"]);
</script>
