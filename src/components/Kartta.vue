<template>
    <l-map style="height: 100vh; width: 100vw"
           :zoom="zoom"
           :center="center"
           :options="mapOptions"
    >
        <l-tile-layer
                :url="url"
                :attribution="attribution"
        />
        <l-marker v-for="bikeStop in results.bikeRentalStations" :lat-lng="getLatLng(bikeStop)"
                  v-bind:key="bikeStop.id">
            <l-popup>
                <div>
                    <h3>
                        {{bikeStop.stationId}} {{bikeStop.name}}
                    </h3>
                    <b-table
                            :items="[{ bikesAvailable: bikeStop.bikesAvailable, spacesAvailable: bikeStop.spacesAvailable }]"/>
                </div>
            </l-popup>
        </l-marker>
    </l-map>
</template>


<script>
    import {latLng} from "leaflet";
    import {LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";

    export default {
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
        },
        props: {
            results: Array,
        },
        data() {
            return {
                zoom: 13,
                center: latLng(60.192059, 24.945831),
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                withPopup: latLng(60.192059, 24.945831),
                mapOptions: {
                    zoomSnap: 0.5
                },
                showMap: true
            }
        },
        methods: {
            getLatLng(bikeStop) {
                return latLng(bikeStop.lat, bikeStop.lon)
            }
        }
    }
</script>

<style scoped>
    .vue2leaflet-map{
        z-index: 1;
    }
</style>