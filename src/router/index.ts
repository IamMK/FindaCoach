import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import CoachDetail from "@/pages/coaches/CoachDetail.vue";
import CoachList from "@/pages/coaches/CoachList.vue";
import CoachRegister from "@/pages/coaches/CoachRegister.vue";

import ContactCoach from "@/pages/requests/ContactCoach.vue";
import ReceivedRequests from "@/pages/requests/ReceivedRequests.vue";
import UserAuth from "@/pages/auth/UserAuth.vue";

import NotFound from "@/pages/NotFound.vue";
import { useAuthStore } from "@/store/auth";

// const authStore = useAuthStore();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    name: "coaches",
    component: CoachList,
  },
  {
    path: "/coaches/:id",
    props: true,
    children: [
      {
        path: "contact",
        name: "contact",
        component: ContactCoach,
      },
    ],
    component: CoachDetail,
  },
  {
    path: "/register",
    name: "register",
    meta: { requiresAuth: true },
    component: CoachRegister,
  },
  {
    path: "/requests",
    name: "requests",
    meta: { requiresAuth: true },
    component: ReceivedRequests,
  },
  {
    path: "/auth",
    name: "auth",
    meta: { requiresUnauth: true },
    component: UserAuth,
  },
  {
    path: "/:notFound(.*)",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && useAuthStore().isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
