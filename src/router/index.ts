import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import CoachDetail from "@/pages/coaches/CoachDetail.vue";
import CoachList from "@/pages/coaches/CoachList.vue";
import CoachRegister from "@/pages/coaches/CoachRegister.vue";

import ContactCoach from "@/pages/requests/ContactCoach.vue";
import ReceivedRequests from "@/pages/requests/ReceivedRequests.vue";

import NotFound from "@/pages/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "coaches",
  },
  {
    path: "/coaches",
    name: "coaches",
    component: CoachList,
  },
  {
    path: "/coaches/:id",
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
    component: CoachRegister,
  },
  {
    path: "/requests",
    name: "requests",
    component: ReceivedRequests,
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

export default router;
