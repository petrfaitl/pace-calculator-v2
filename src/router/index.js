import { createRouter, createWebHistory } from "vue-router";
import LayoutView from "../views/LayoutView.vue";
import CalculateView from "@/views/CalculateView";
import ResultsView from "@/views/ResultsView";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
