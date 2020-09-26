<template>
    <div id="app">
        <Saatila :weather="weather"/>
        <Kartta :results="bikes"/>
    </div>
</template>

<script>
    import Kartta from '@/components/Kartta.vue'
    import Saatila from "@/components/Saatila";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
            Kartta,
            Saatila
        },
        methods: {
            ...mapActions(['fillBikes', 'fillWeather']),
            fetchMapApi() {
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
                            this.fillBikes(result.data);
                        }
                    )
                    .catch(error => console.log('error', error));
            },
            fetchWeatherApi() {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                const apiKey = "114332134ea7ed53cb7a0e88a863eb5d"
                fetch("https://api.openweathermap.org/data/2.5/weather?q=Helsinki&lang=fi&appid="+apiKey+"&units=metric", requestOptions)
                    .then(response => response.text())
                    .then(result => {this.fillWeather(JSON.parse(result))})
                    .catch(error => console.log('error', error));
            }
        },
        computed: {
            ...mapGetters(['bikes','weather'])
        },
        mounted() {
            this.fetchMapApi();
            this.fetchWeatherApi();
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
