import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
// import { io } from "socket.io-client";
// import VueSocketIO from 'vue-socket.io'

// export const socket = io("http://localhost:3000");
// Vue.use(VueSocketIO, socket);

Vue.config.productionTip = false

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: "http://localhost:3000",
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_"
//   }
// }))

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
