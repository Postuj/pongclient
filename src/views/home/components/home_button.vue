<template>
  <v-hover v-slot="{ hover }">
    <div
      @click="() => $router.push(item.to)"
      :style="hover ? 'cursor: pointer' : ''"
      class="d-flex justify-center align-center"
      style="height: 100%; position: relative"
    >
      <v-expand-transition>
        <div
          v-if="hover"
          :class="item.up ? 'v-card--reveal' : 'v-card--reveal-down'"
          class="d-flex transition-fast-in-fast-out primary"
          style="height: 100%"
        ></div>
      </v-expand-transition>
      <div class="d-flex justify-center flex-column">
        <v-icon :color="hover ? 'grey lighten-5' : 'primary'" size="100">{{
          item.icon
        }}</v-icon>
        <div
          :class="hover ? 'grey--text text--lighten-5' : 'primary--text'"
          class="text-h2 font-weight-bold text-uppercase mt-6"
          style="z-index: 0"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: ["item"],
  data: () => ({
    hover: false,
  }),
};
</script>

<style>
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
