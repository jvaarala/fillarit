<template>
    <div id="app">
        <Fillarit :results="this.results"/>
    </div>
</template>

<script>
    import Fillarit from './components/Fillarit.vue'

    export default {
        name: 'App',
        components: {
            Fillarit
        },
        methods: {
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
                    .then(response => response.text())
                    .then(result => this.results = JSON.parse(result))
                    .catch(error => console.log('error', error));
            }
        },
        mounted() {
            this.stationData = this.fetchApi();
        },
        data: function () {
            return {
                results: JSON
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
