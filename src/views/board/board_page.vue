<template>
  <div class="full-height py-0 accent" style="position: relative">
    <canvas ref="gameBoard"></canvas>
    <div class="canvas-overlay">
      <div class="d-flex justify-space-around align-center full-height">
        <div
          class="secondary--text text-h1 font-weight-bold"
          v-for="(score, i) in playersScores"
          :key="i"
        >
          {{ score }}
        </div>
      </div>
    </div>
    <v-fade-transition duration="200">
      <div
        class="canvas-overlay"
        style="background: #111111; opacity: 0.6"
        v-if="!isRunning"
      >
        <div class="d-flex justify-center align-center full-height">
          <div class="font-weight-regular mr-md-16">
            <v-btn
              @click="playClick"
              x-large
              icon
              :color="isRunning ? 'primary' : 'error'"
              ><v-icon size="160">{{
                isRunning ? "mdi-pause" : "mdi-play"
              }}</v-icon></v-btn
            >
          </div>
          <div class="font-weight-regular ml-md-16">
            <v-btn @click="closeGameClick" x-large icon color="error"
              ><v-icon size="160"> mdi-close </v-icon></v-btn
            >
          </div>
        </div>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    isRunning: false,
    context: null,
    canvas: null,
    playersScores: [0, 0],
  }),
  methods: {
    ...mapActions([
      "requestBoardSetup",
      "requestChangeGameState",
      "connect",
      "disconnect",
    ]),
    closeGameClick() {
      this.disconnect();
      this.$router.push("/");
    },
    playClick() {
      this.requestChangeGameState(!this.isRunning);
    },
    drawLine() {
      this.context.strokeStyle = "#455A64";
      this.context.lineWidth = 6;
      this.context.setLineDash([35, 35]);
      this.context.moveTo(Math.floor(this.canvas.width / 2), 0);
      this.context.lineTo(
        Math.floor(this.canvas.width / 2),
        this.canvas.height
      );
      this.context.stroke();
    },
    drawPlayer(player) {
      this.context.fillStyle = "#42b883";
      this.context.fillRect(player.x, player.y, player.width, player.height); // 10 120
    },
    drawBall(ball) {
      const circle = new Path2D();
      circle.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      this.context.fillStyle = "#42b883";
      this.context.fill(circle);
    },
    updateBoard() {
      const board = this.getBoard;
      this.isRunning = board.isRunning;

      // CLEAR
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // DRAW LINE
      this.drawLine();

      // DRAW PLAYERS AND SCORE
      const scores = [];
      for (let i = 0; i < board.players.length; i++) {
        const player = board.players[i];
        if (i < 2) scores.push(player.score);
        this.drawPlayer(player);
      }
      if (scores.length == this.playersScores.length)
        this.playersScores = scores;

      // DRAW BALL
      if (board.ball) {
        this.drawBall(board.ball);
      }
    },
  },
  computed: {
    ...mapGetters(["getBoard"]),
  },
  created() {
    this.connect(true);
  },
  beforeUnmount() {
    this.disconnect();
  },
  mounted() {
    const canvas = this.$refs.gameBoard;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const context = canvas.getContext("2d");

    this.canvas = canvas;
    this.context = context;

    this.drawLine();

    this.requestBoardSetup({
      width: canvas.width,
      height: canvas.height,
    });
  },
  watch: {
    getBoard() {
      // REDRAW
      if (this.getBoard) this.updateBoard();
    },
  },
};
</script>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
  z-index: 1;
}

.canvas-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
