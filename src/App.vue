<template>
    <div id="app">
        <Kartta :results="bikes"/>
    </div>
</template>

<script>
    import Kartta from './components/Kartta.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
            Kartta
        },
        methods: {
            ...mapActions(['fillBikes']),
            fetchApi() {
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
            }
        },
        computed: {
            ...mapGetters(['bikes'])
        },
        mounted() {
            this.fetchApi();
        },
        meta: [{name: 'viewport', content: 'width=device-width, initial-scale=1'}]
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
