import Vue from 'vue';
import App from './App.vue';
import './index.css';

Vue.config.productionTip = false;

Vue.prototype.$window = window;
Vue.prototype.$gmaps = window.google.maps;

new Vue({
    render: h => h(App),
}).$mount('#app');
