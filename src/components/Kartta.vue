<template>
    <div>
        <div id="map" class="map"></div>
    </div>
</template>


<script>
    import L from "leaflet"
    import 'leaflet-routing-machine';
    import {latLng} from "leaflet";

    export default {
        mounted() {
            this.initMap(this.map);
        },
        components: {},
        props: {
            stations: Array,
            bikesReady: Boolean,
        },
        watch: {
            bikesReady: function () {
                if (this.bikesReady) {
                    console.log('bikesReady', this.bikesReady, 'adding markers..')
                    this.addMarkers(this.map)
                    this.$emit('markersAdded');
                }
            },
        },
        data() {
            return {
                startingPoint: latLng,
                endingPoint: latLng,
                zoom: 13,
                center: latLng(60.192059, 24.945831),
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                withPopup: latLng(60.192059, 24.945831),
                mapOptions: {
                    zoomSnap: 0.5
                },
                showMap: true,
                map: null,
                control: null,
            }
        },
        methods: {
            initMap(map) {
                console.log('initMap')
                map = L.map('map').setView(this.center, this.zoom);

                this.tileLayer = L.tileLayer(
                    this.url,
                    {
                        maxZoom: 18,
                        attribution: this.attribution,
                    }
                );
                this.tileLayer.addTo(map);


                map.on('click', function (e) {
                    console.log('clicked', e)
                    function createButtonHelper(label, container) {
                        let btn = L.DomUtil.create('button', '', container);
                        btn.setAttribute('type', 'button');
                        btn.innerHTML = label;
                        return btn;
                    }

                    let container = L.DomUtil.create('div')
                    let startBtn = createButtonHelper('Start from this location', container);
                    L.DomEvent.on(startBtn, 'click', function () {
                        console.log('startBtn', e)
                    });
                    L.popup()
                        .setContent(container)
                        .setLatLng(e.latlng)
                        .openOn(map);
                });
                this.map = map;
            },
            getLatLng(bikeStop) {
                return latLng(bikeStop.lat, bikeStop.lon)
            },
            getStations() {
                this.$emit('getStationsEvent')
            },
            emptyStations() {
                this.$emit('emptyStationsEvent')
            },
            addRoute(map, start, end) {
                console.log('addRoute')
                this.control = L.Routing.control({
                    waypoints: [
                        L.latLng(this.getLatLng(start)),
                        L.latLng(this.getLatLng(end))
                    ],
                    showAlternatives: false,
                }).addTo(map);
                this.control.hide()
            },
            addMarkers(map) {
                console.log('addMarkers', map)
                for (let i = 0; i < this.stations.bikeRentalStations.length; i++) {
                    L.marker(this.getLatLng(this.stations.bikeRentalStations[i])).addTo(map).on('click', function (e) {
                        console.log('markerClicked', e)

                        function createButtonHelper(label, container) {
                            let btn = L.DomUtil.create('button', '', container);
                            btn.setAttribute('type', 'button');
                            btn.innerHTML = label;
                            return btn;
                        }
                        let container = L.DomUtil.create('div')
                        let endBtn = createButtonHelper('Go to this station', container);
                        L.DomEvent.on(endBtn, 'click', function () {
                            console.log('endBtn', e)
                        });
                        L.popup()
                            .setContent(container)
                            .setLatLng(e.latlng)
                            .openOn(map);
                    });
                }
            },
            setStartingPoint(e) {
                console.log(e)
            },
            setEndingPoint(e) {
                console.log(e)
            },
        }
    }
</script>

<style scoped>
    #map {
        width: 100vw;
        height: 100vh;
        z-index: 1;
    }

    ;
</style>