import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Scrummy - Scrum sizing game for remote teams",
      },
    },
    {
      path: "/:room",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RoomView.vue"),
      meta: {
        title: "Scrummy - Scrum sizing game for remote teams",
      },
    },
  ],
});

export default router;
