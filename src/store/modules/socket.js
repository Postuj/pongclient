import SocketioService from "../../services/socketio.service.js";

const state = {
  socketService: SocketioService,
  isBoard: false,
  socketError: null,
};

const getters = {
  getSocketService: (state) => state.socketService,
  getIsBoard: (state) => state.isBoard,
  getSocketError: (state) => state.socketError,
};

const actions = {
  connect({ commit }, isBoard) {
    commit("SET_IS_BOARD", isBoard);
    state.socketService.setupSocketConnection(isBoard);
  },
  disconnect() {
    state.socketService.disconnect();
  },
};

const mutations = {
  SET_IS_BOARD: (state, data) => (state.isBoard = data),
  SET_SOCKET_ERROR: (state, data) => (state.socketError = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
