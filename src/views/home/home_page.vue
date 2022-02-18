<template>
  <div class="full-height py-0">
    <v-row class="full-height pa-0">
      <v-col class="pa-0" cols="12" md="6" v-for="(item, i) in items" :key="i">
        <home-button :item="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HomeButton from "./components/home_button.vue";

export default {
  components: { HomeButton },
  name: "Home",
  data: () => ({
    items: [
      {
        name: "board",
        icon: "mdi-server",
        to: "/board",
        up: true,
      },
      {
        name: "player",
        icon: "mdi-remote-tv",
        to: "/remote",
        up: false,
      },
    ],
  }),
};
</script>
