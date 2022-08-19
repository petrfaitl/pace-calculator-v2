<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    document.title = "Pace Converter";
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

/* Slide Left Transition */
.slide-left-move,
.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition-all duration-500;
}
.slide-left-enter-from {
  @apply opacity-0;
  @apply translate-x-1;
}

.slide-left-leave-to {
  @apply opacity-0;
  @apply -translate-x-1;
}
/* Slide Up Transition */
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all duration-500;
}
.slide-up-enter-from {
  @apply opacity-0;
  @apply translate-y-1;
}

.slide-up-leave-to {
  @apply opacity-0;
  @apply -translate-y-1;
}

/* Fade Transition */
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}
</style>
