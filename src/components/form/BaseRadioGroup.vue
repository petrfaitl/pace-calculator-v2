<template>
  <div class="flex gap-4">
    <RadioButton
      v-for="opt in options"
      :id="opt.label"
      :value="opt.value"
      :name="opt.label"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :label="opt.label"
      :key="opt.value"
    />
  </div>
</template>

<script setup>
import RadioButton from "@/components/form/RadioButton";
import { toRefs } from "vue";

const props = defineProps(["options", "modelValue"]);
defineEmits(["update:modelValue"]);
const { options, modelValue } = toRefs(props);
</script>

<style scoped></style>
