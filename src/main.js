import Vue from 'vue';
import App from './App.vue';
import resources from './resources'
import axios from 'axios'


Vue.prototype.$ajax = axios;
// Start the app
new Vue({
  el: '#app',
  render: h => h(App)
});
