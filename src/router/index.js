import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Genres from "../views/Genres.vue";
import Details from "../views/Details.vue";
import Search from "../views/Search.vue";
import Login from "../views/Login.vue";
import UserProfile from "../views/UserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/genres/:genres",
    name: "Genres",
    component: Genres,
    props: true,
  },
  {
    path: "/user/:userid",
    name: "UserProfile",
    component: UserProfile,
    props: true,
  },
  {
    path: "/details/:id",
    name: "Details",
    component: Details,
    props: true,
  },
  {
    path: "/search/:name",
    name: "Search",
    component: Search,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
