<template>
  <div class="mt-8 p-6 bg-slate-100 dark:bg-slate-800 rounded-md">
    <h2 class="text-xl font-medium mb-4 dark:text-slate-50">About</h2>
    <div class="text-left grid grid-cols-2 gap-4 text-sm">
      <div class="dark:text-slate-300">App version:</div>
      <div class="font-medium dark:text-slate-50">
        {{ appVersion }}
      </div>

      <div class="dark:text-slate-300">Contact:</div>
      <div class="font-medium dark:text-slate-50 relative">
        <span
          class="cursor-pointer hover:underline"
          @click="copyEmailToClipboard"
          >{{ email }}</span
        >
        <span v-if="emailCopied" class="copied">Copied!</span>
      </div>

      <!--      <div class="dark:text-slate-300">Developer:</div>-->
      <!--      <div class="font-medium dark:text-slate-50">-->
      <!--        {{ developer }}-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useActivityStore } from "@/store/store";
import pkg from "../../package.json";
import { ref } from "vue";

const { developer, email } = pkg;

const store = useActivityStore();

const { appVersion } = storeToRefs(store);

const emailCopied = ref(false);

const copyEmailToClipboard = () => {
  navigator.clipboard
    .writeText(email)
    .then(() => {
      emailCopied.value = true;
      setTimeout(() => {
        emailCopied.value = false;
      }, 2000);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
};
</script>
<style scoped>
.copied {
  @apply ml-2 text-sm text-green-600 dark:text-green-400 absolute -top-4 right-8;
}
</style>
