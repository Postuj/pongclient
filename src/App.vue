<template>
  <v-app style="background-color: #263238">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["disconnect"]),
  },
  // created() {
  //   this.connect();
  // },
  beforeUnmount() {
    this.disconnect();
  },
  mounted() {
    this.disconnect();
  },
};
</script>

<style>
html {
  padding: 0;
  margin: 0;
  height: 100vh !important;
  color: #42b883;
  background-color: #263238;
}

.full-height {
  height: 100%;
}
</style>
