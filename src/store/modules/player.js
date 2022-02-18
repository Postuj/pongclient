const state = {
  player: {
    id: -1,
  },
  code: null,
};

const getters = {
  getPlayer: (state) => state.player,
  getCode: (state) => state.code,
};

const actions = {
  requestPlayerSetup({ commit, rootState }, randomCode) {
    commit("SET_CODE", randomCode);
    rootState.socket.socketService.emitPlayerEvent({
      type: "join",
      name: "player",
      content: {
        code: randomCode,
      },
    });
  },
  requestPositionUpdate({ rootState }, up) {
    rootState.socket.socketService.emitPlayerEvent({
      type: "move",
      name: "player",
      playerCode: state.code,
      content: {
        up,
      },
    });
  },
  requestPlayerChangeGameState({ rootState }, isRunning) {
    rootState.socket.socketService.emitPlayerEvent({
      type: "changeRunningState",
      name: "board",
      content: {
        isRunning,
      },
    });
  },
};

const mutations = {
  SET_PLAYER: (state, data) => (state.player = data),
  SET_CODE: (state, data) => (state.code = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
