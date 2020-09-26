<template>
    <div>Sää Helsingissä tällä hetkellä: <b>{{weather.main.temp}} °C, {{weather.weather[0].description}}</b></div>
</template>

<script>
    export default {
        name: "Saatila",
        props: {
            weather: {}
        }
    }
</script>

<style scoped>

</style>