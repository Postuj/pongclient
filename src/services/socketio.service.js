import { io } from "socket.io-client";
// import boardService from "./board.service";
import store from "../store/index";
// import axios from "axios";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(isBoard) {
    console.log(process.env.VUE_APP_SOCKET_ENDPOINT);
    const socket = io("http://192.168.100.127:3000", {
      transports: ["websocket"],
      rejectUnauthorized: false,
      agent: false,
      upgrade: false,
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
    });
    // console.log(socket.connected ? "Connected" : "Disconnected");
    if (isBoard) {
      socket.on("boardEvent", ({ data }) => {
        this.handleBoardEvent(data);
      });
    } else {
      socket.on("playerEvent", ({ data }) => {
        this.handlePlayerEvent(data);
      });
    }
    socket.on("connect", () => {
      console.log("connected");
      // axios.post("http://192.168.100.127:3000/testpoint/", {
      //   errorBody: 'connected',
      // });
    });
    socket.on("connect_error", (err) => {
      // axios.post("http://192.168.100.127:3000/testpoint/", {
      //   errorBody: err,
      // });
      store.commit("SET_SOCKET_ERROR", err.message);
    });
    this.socket = socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("disconnect");
    }
  }

  handleBoardEvent(data) {
    if (!data.success) return;
    const content = data.content;
    if (data.type == "create") {
      store.commit("SET_BOARD", content.board);
    } else if (data.type == "update") {
      // console.log('update')
      // console.log(content.board.isRunning)
      store.commit("SET_BOARD", content.board);
    }
  }

  handlePlayerEvent(data) {
    if (!data.success || data.content.code == store.getters.getCode) return;
    console.log("Me");
    const content = data.content;
    if (data.type == "join") {
      console.log(content.player);
      store.commit("SET_PLAYER", content.player);
    }
  }

  emitBoardEvent(event) {
    this.socket.emit("boardEvent", { data: event });
  }

  emitPlayerEvent(event) {
    this.socket.emit("playerEvent", { data: event });
  }
}

export default new SocketioService();
