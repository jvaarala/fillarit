<template>
    <div id="app">
        <Saatila :weather="weather"/>
        <Kartta :stations="this.bikes" :bikes-ready="this.$store.state.bikesReady" @getStationsEvent="handleGetStationsEvent" @emptyStationsEvent="handleEmptyStationsEvent"/>
    </div>
</template>

<script>
    import Kartta from '@/components/Kartta.vue'
    import Saatila from "@/components/Saatila";
    import {mapMutations, mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
            Kartta,
            Saatila
        },
        methods: {
            ...mapMutations([
                'SET_BIKES_READY',
                'FILL_BIKES',
                'FILL_WEATHER',
            ]),
            fetchMapApi() {
                console.log('fetchMapApi')
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const graphql = JSON.stringify({
                    query: "  query {\n  bikeRentalStations {\n    stationId\n    name\n    bikesAvailable\n    spacesAvailable\n    lat\n    lon\n    allowDropoff\n  }\n  }",
                    variables: {}
                });
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: graphql,
                    redirect: 'follow'
                };

                fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                            //this.results = JSON.parse(result);
                        console.log(result.data)
                            this.FILL_BIKES(result.data);
                        }
                    ).finally(() => {
                    console.log(this.bikes.bikeRentalStations)
                    this.SET_BIKES_READY(true)
                }).catch(error => console.log('error', error));
            },
            fetchWeatherApi() {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                const apiKey = "***" // API KEY
                fetch("https://api.openweathermap.org/data/2.5/weather?q=Helsinki&lang=fi&appid="+apiKey+"&units=metric", requestOptions)
                    .then(response => response.text())
                    .then(result => {this.fillWeather(JSON.parse(result))})
                    .catch(error => console.log('error', error));
            },
            handleEmptyStationsEvent() {
                console.log('handleEmptyStationsEvent')
                this.FILL_BIKES([])
            },
            handleGetStationsEvent() {
                console.log('handlegGetStationsEvent')
                this.fetchMapApi();
            },
        },
        computed: {
            ...mapGetters(['bikes','weather','bikesReady'])
        },
        mounted() {
            //this.fetchWeatherApi();
            this.fetchMapApi();
        },
        meta: [{name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
