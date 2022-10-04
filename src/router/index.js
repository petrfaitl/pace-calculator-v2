import { createRouter, createWebHistory } from "vue-router";
// import LayoutView from "../views/LayoutView.vue";
// import CalculateView from "@/views/CalculateView";
// import ResultsView from "@/views/ResultsView";
import { useActivityStore } from "@/store/store";

const routes = [
  {
    path: "/",
    name: "LayoutView",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/LayoutView.vue"),
    children: [
      {
        path: "",
        name: "CalculateView",
        component: () =>
          import(
            /* webpackChunkName: "calculate" */ "../views/CalculateView.vue"
          ),
        beforeEnter: () => {
          const store = useActivityStore();
          store.activity.id = Date.now();
        },
      },
      {
        path: "results",
        name: "ResultsView",
        component: () =>
          import(/* webpackChunkName: "results" */ "../views/ResultsView.vue"),
        beforeEnter: () => {
          const store = useActivityStore();
          if (!store.distanceVal) {
            return { name: "CalculateView" };
          }
          store.activity.bookmarked = store.itemInBookmarks(store.activity.id);
          // store.bookmarks.forEach((el) => console.log("bookmark id", el.id));

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
