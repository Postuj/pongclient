<template>
  <div class="full-height py-0 accent">
    <div class="full-height py-0" style="position: relative">
      <v-row class="full-height pa-0">
        <v-col
          class="pa-0"
          cols="12"
          md="6"
          v-for="(item, i) in items"
          :key="i"
        >
          <remote-button :item="item" />
        </v-col>
        <!-- <v-col cols="12">
          <div>
            <div class="text-subtitle-2 primary--text">
              Player {{ getPlayer.id }}
            </div>
          </div>
        </v-col> -->
      </v-row>
      <div
        @click="requestPlayerChangeGameState"
        class="d-flex justify-space-between align-center secondary nav-section pt-6 pb-4 px-10"
      >
        <v-icon color="grey lighten-5" size="50">mdi-pause</v-icon>
        <v-btn @click="closeGameClick" color="error" icon x-large
          ><v-icon size="50">mdi-close</v-icon></v-btn
        >
        <div v-if="getSocketError" class="text-h6 error--text">
          {{ getSocketError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RemoteButton from "./components/remote_button.vue";
export default {
  components: {
    RemoteButton,
  },
  data: () => ({
    items: [
      {
        name: "up",
        icon: "mdi-arrow-up",
      },
      {
        name: "player",
        icon: "mdi-arrow-down",
      },
    ],
  }),
  computed: {
    ...mapGetters(["getPlayer", "getSocketError"]),
  },
  methods: {
    ...mapActions([
      "requestPlayerSetup",
      "requestPlayerChangeGameState",
      "connect",
      "disconnect",
    ]),
    changeGameStateClick() {
      this.requestPlayerChangeGameState();
    },
    closeGameClick() {
      this.disconnect();
      this.$router.push("/");
    },
  },
  created() {
    this.connect(false);
  },
  beforeUnmount() {
    this.disconnect();
  },
  mounted() {
    const r = (Math.random() + 1).toString(36).substring(7);
    this.requestPlayerSetup(r);
  },
};
</script>

<style>
.nav-section {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
