import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/home_page.vue";
import Board from "../views/board/board_page.vue";
import Remote from "../views/remote/remote_page.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
  },
  {
    path: "/remote",
    name: "Remote",
    component: Remote,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
