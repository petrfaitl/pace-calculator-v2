<template>
  <MainNav />
  <main
    class="flex flex-col md:flex-row justify-around container xl:w-9/12 mx-auto lg:gap-8"
  >
    <router-view />
    <!--    <CalculateView />-->
    <!--    <ResultsView />-->
  </main>
</template>

<script>
// @ is an alias to /src
import MainNav from "@/components/MainNav";
// import CalculateView from "@/views/CalculateView";
// import ResultsView from "@/views/ResultsView";

export default {
  name: "LayoutView",
  components: { MainNav },
  data() {
    return {};
  },
};
</script>
