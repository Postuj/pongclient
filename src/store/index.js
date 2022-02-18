import Vue from "vue";
import Vuex from "vuex";

import board from "./modules/board.js";
import socket from "./modules/socket.js";
import player from "./modules/player.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    board,
    socket,
    player,
  },
});
