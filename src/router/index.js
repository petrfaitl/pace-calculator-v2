import { createRouter, createWebHistory } from "vue-router";
import { useActivityStore } from "@/store/store";

const routes = [
  {
    path: "/",
    name: "LayoutView",
    component: () => import("@/views/LayoutView.vue"),
    children: [
      {
        path: "",
        name: "CalculateView",
        component: () => import("@/views/CalculateView.vue"),
        meta: {
          title: "Pace Converter",
        },
        beforeEnter: () => {
          const store = useActivityStore();
          store.activity.id = Date.now();
          store.loadUserPreferences();
        },
      },
      {
        path: "results",
        name: "ResultsView",
        component: () => import("@/views/ResultsView.vue"),
        meta: {
          title: "Results",
        },
        beforeEnter: () => {
          const store = useActivityStore();
          if (!store.activity.id) {
            return { name: "CalculateView" };
          }
          store.activity.bookmarked = store.itemInBookmarks(store.activity.id);
          // store.bookmarks.forEach((el) => console.log("bookmark id", el.id));

          return true;
        },
      },
      {
        path: "preferences",
        name: "PreferencesView",
        component: () => import("@/views/PreferencesView.vue"),
        meta: {
          title: "Preferences",
        },
        beforeEnter: () => {
          const store = useActivityStore();
          // Ensure user preferences are loaded
          store.loadUserPreferences();
          return true;
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: () => {
      return { name: "CalculateView" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
