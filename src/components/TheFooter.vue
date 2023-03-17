<template>
  <div class="container px-4 text-left pt-8">
    <div class="text-xs text-cyan-900 dark:text-cyan-100">
      App version: {{ appVersion }}
    </div>
  </div>
</template>

<script setup>
import { useActivityStore } from "@/store/store";

const { appVersion } = useActivityStore();
</script>
