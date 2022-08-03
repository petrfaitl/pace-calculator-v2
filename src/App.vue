<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    document.title = "Pace Calculator";
    document.description =
      "Pace calculator and conversion app. Get running pace for common running distances. 400m, 800m, 1500m, 5k, 10k, half marathon, marathon and others.";
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg-primary {
  @apply bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-500
  dark:bg-cyan-500 dark:hover:bg-cyan-500/70;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
