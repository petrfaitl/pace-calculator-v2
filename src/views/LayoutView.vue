<template>
  <MainNav />

  <main
    class="flex flex-col md:flex-row justify-around container xl:w-9/12 mx-auto lg:gap-8"
  >
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>

    <!--    <router-view />-->
  </main>
</template>

<script>
// @ is an alias to /src
import MainNav from "@/components/MainNav";

export default {
  name: "LayoutView",
  components: { MainNav },
  data() {
    return {};
  },
};
</script>

<style></style>
