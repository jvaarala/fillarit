import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css';
import store from "@/store";
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')


