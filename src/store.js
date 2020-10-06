import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        state: {
            bikes: [],
            bikesReady: false,
            weather: {}
        },
        getters: {
            bikes: state => state.bikes,
            bikesReady: state => state.bikesReady,
            weather: state => state.weather
        },
        mutations: {
            SET_BIKES_READY(state, bikesReady) {
                state.bikesReady = bikesReady;
            },
            FILL_BIKES(state, bikes) {
                state.bikes = bikes
            },
            FILL_WEATHER(state, weather) {
                state.weather = weather
            }
        },
    }
)