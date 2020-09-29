import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import firebase from "../utils/firebase";
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/genres/:genres",
    name: "Genres",
    component: Genres,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/:userid",
    name: "UserProfile",
    component: UserProfile,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/details/:id",
    name: "Details",
    component: Details,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search/:name",
    name: "Search",
    component: Search,
    props: true,
    meta: {
      requiresAuth: true,
    },
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

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requireGuest = to.matched.some((record) => record.meta.requiresGuest);
  if (requireAuth && !firebase.auth().currentUser) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
  // {{  BUG --> WHEN AUTHUSER DIRECT CHANGE LINK TO /LOGIN IT DIRECT TO / , BUT WHEN AUTHUSER SIGNOUT THO IT DIRECT TO /  }}
  else if (
    requireGuest &&
    firebase.auth().currentUser &&
    store.getters.userData
  ) {
    next({
      path: "/",
    });
  }
  // {{  BUG --> WHEN AUTHUSER DIRECT CHANGE LINK TO /LOGIN IT DIRECT TO / , BUT WHEN AUTHUSER SIGNOUT THO IT DIRECT TO /  }}
  else {
    next(); // make sure to always call next()!
  }
});

export default router;
