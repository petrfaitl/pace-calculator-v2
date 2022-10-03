import { createRouter, createWebHistory } from "vue-router";
import LayoutView from "../views/LayoutView.vue";
import CalculateView from "@/views/CalculateView";
import ResultsView from "@/views/ResultsView";
import { useActivityStore } from "@/store/store";

const routes = [
  {
    path: "/",
    name: "LayoutView",
    component: LayoutView,
    children: [
      {
        path: "",
        name: "CalculateView",
        component: CalculateView,
      },
      {
        path: "results",
        name: "ResultsView",
        component: ResultsView,
        beforeEnter: () => {
          const store = useActivityStore();
          if (!store.distanceVal) {
            return { name: "CalculateView" };
          }
          store.activity.id = Date.now();
          store.activity.bookmarked = false;
          return true;
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: () => {
      return { name: "CalculateView" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
