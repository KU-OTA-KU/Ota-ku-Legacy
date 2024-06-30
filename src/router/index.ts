import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import CatalogView from "@/views/CatalogView.vue";
import OpenAnimeView from "@/views/OpenAnimeView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: IndexView,
  },
  {
    path: "/catalog",
    name: "catalog",
    component: CatalogView,
  },
  {
    path: "/anime",
    name: "openAnime",
    component: OpenAnimeView,
  },
  {
    path: "/authors/ru",
    component: OpenAnimeView,
  },
  {
    path: "/terms/ru",
    component: OpenAnimeView,
  },
  {
    path: "/privacyPolicy/ru",
    component: OpenAnimeView,
  },
  {
    path: "/:catchAll(.*)",
    component: OpenAnimeView,
  },
  {
    path: "/error",
    component: OpenAnimeView,
  },
  {
    path: "/404",
    component: OpenAnimeView,
  },
];

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () =>
//     import(/* webpackChunkName: "catalog" */ "../views/AnimeCatalog.vue"),

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
