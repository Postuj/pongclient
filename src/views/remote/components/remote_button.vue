<template>
  <div
    v-long-press="100"
    @long-press-start="onLongPressStart"
    @long-press-stop="onLongPressStop"
    class="d-flex justify-center align-center"
    style="height: 100%; position: relative"
  >
    <v-expand-transition duration="200">
      <div
        v-if="isPressed"
        class="d-flex transition-fast-in-fast-out primary"
        :class="item.name == 'up' ? 'v-card--reveal' : 'v-card--reveal-down'"
        style="height: 100%"
      ></div>
    </v-expand-transition>
    <div class="d-flex justify-center flex-column">
      <v-icon :color="isPressed ? 'grey lighten-5' : 'primary'" size="100">{{
        item.icon
      }}</v-icon>
      <!-- <div
        :class="isPressed ? 'grey--text text--lighten-5' : 'primary--text'"
        class="text-h2 font-weight-bold text-uppercase mt-6"
        style="z-index: 0"
      >
        {{ item.name }}
      </div> -->
    </div>
  </div>
</template>

<script>
import LongPress from "vue-directive-long-press";
import { mapActions } from "vuex";
export default {
  directives: {
    "long-press": LongPress,
  },
  props: ["item"],
  data: () => ({
    isPressed: false,
    intervalId: null,
    up: false,
  }),
  methods: {
    ...mapActions(["requestPositionUpdate"]),
    onLongPressStart() {
      this.isPressed = true;
    },
    onLongPressStop() {
      this.isPressed = false;
    },
    updatePosition() {
      if (!this.isPressed) return;

      this.requestPositionUpdate(this.up);
    },
  },
  mounted() {
    this.up = this.item.name == "up";
    this.intervalId = setInterval(this.updatePosition, 50);
  },
  beforeDestroy() {
    if (this.isPressed) this.isPressed = false;
    if (!this.intervalId) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
};
</script>

<style scoped>
.v-card--reveal {
  z-index: 0;
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
}

.v-card--reveal-down {
  z-index: 0;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.v-nav-reveal {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
