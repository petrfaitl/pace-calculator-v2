<template>
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
</template>

<script>
import RadioButton from "@/components/form/RadioButton";

export default {
  name: "BaseRadioGroup",
  components: { RadioButton },
  props: {
    options: { type: Array, required: true },
    modelValue: { type: Number, required: true },
  },
};
</script>

<style scoped></style>
