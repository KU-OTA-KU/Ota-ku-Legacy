import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import NProgress from 'nprogress';
import '@/css/nprogress.css';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: IndexView,
  },
  {
    path: "/catalog",
    name: "catalog",
    component: () => import('@/views/CatalogView.vue')
  },
  {
    path: "/anime",
    name: "openAnime",
    component: () => import('@/views/OpenAnimeView.vue')
  },
  {
    path: "/authors/ru",
    component: () => import('@/views/OpenAnimeView.vue')
  },
  {
    path: "/terms/ru",
    component: () => import('@/views/OpenAnimeView.vue')
  },
  {
    path: "/privacyPolicy/ru",
    component: () => import('@/views/OpenAnimeView.vue')
  },
  {
    path: "/:catchAll(.*)",
    component: () => import('@/views/OpenAnimeView.vue')
  },
  {
    path: "/error",
    component: () => import('@/views/OpenAnimeView.vue')
  },
  {
    path: "/404",
    component: () => import('@/views/OpenAnimeView.vue')
  },
];

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () =>
//     import(/* webpackChunkName: "catalog" */ "../views/AnimeCatalog.vue"),

const router = createRouter({
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
