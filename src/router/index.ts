import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import SignUpView from "@/views/Auth/SignUpView.vue";
import CreateCarListView from "@/views/createCarList/CreateCarListView.vue";
import FleetDetailView from "@/views/createCarList/FleetDetailView.vue";
import MyListView from "@/views/createCarList/MyListView.vue";
import { projectAuth } from "@/firebase/config";
import { ROUTES_NAME } from "./constants";

const requiredAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: ROUTES_NAME.LOGIN });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: ROUTES_NAME.HOME,
      component: HomeView,
      beforeEnter: requiredAuth,
    },
    {
      path: "/login",
      name: ROUTES_NAME.LOGIN,
      component: LoginView,
    },
    {
      path: "/signup",
      name: ROUTES_NAME.SIGN_UP,
      component: SignUpView,
    },
    {
      path: "/carFleet/create-car",
      name: ROUTES_NAME.CREATE_CAR,
      component: CreateCarListView,
      beforeEnter: requiredAuth,
    },
    {
      path: "/carFleet/:id",
      name: ROUTES_NAME.CARFLEET_DETAILS,
      component: FleetDetailView,
      beforeEnter: requiredAuth,
      props: true,
    },
    {
      path: "/my-carFleet",
      name: ROUTES_NAME.MY_CARFLEET,
      component: MyListView,
      beforeEnter: requiredAuth,
    },
  ],
});

export default router;
