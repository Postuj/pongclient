const state = {
  board: null,
};

const getters = {
  getBoard: (state) => state.board,
};

const actions = {
  requestBoardSetup({ rootState }, gameBoardData) {
    rootState.socket.socketService.emitBoardEvent({
      type: "create",
      name: "board",
      content: gameBoardData,
    });
  },
  requestChangeGameState({ rootState }, isRunning) {
    rootState.socket.socketService.emitBoardEvent({
      type: "changeRunningState",
      name: "board",
      content: {
        isRunning,
      },
    });
  },
};

const mutations = {
  SET_BOARD: (state, data) => (state.board = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
