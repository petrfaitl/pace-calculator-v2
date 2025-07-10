<template>
  <MainNav ref="nav" />

  <main
    class="flex flex-col md:flex-row justify-around container xl:w-9/12 mx-auto lg:gap-8 mt-24"
    @click.self="close()"
  >
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>

    <!--    <router-view />-->
  </main>
  <TheFooter />
</template>
<script setup>
import MainNav from "@/components/MainNav.vue";
import { ref } from "vue";
import TheFooter from "@/components/TheFooter.vue";

const nav = ref(null);

const close = () => {
  nav.value.closeBookmarks();
};
</script>

<style></style>
