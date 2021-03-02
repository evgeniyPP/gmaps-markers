<template>
    <div id="app">
        <Map
            @marker-add="onMarkerAdd"
            @marker-click="onMarkerClick"
            :markers="markers"
        />
        <MarkersList :markers="markers" />
    </div>
</template>

<script>
import Map from './components/Map';
import MarkersList from './components/MarkersList';

export default {
    name: 'App',
    components: {
        Map,
        MarkersList,
    },
    data() {
        return {
            markers: [],
            selectedMarker: null,
        };
    },
    methods: {
        onMarkerAdd(marker) {
            this.markers.push(marker);
        },
        onMarkerClick({ latitude, longitude }) {
            const selectedMarker = this.markers.find(
                marker =>
                    marker.position.latitude === latitude &&
                    marker.position.longitude === longitude
            );
            if (!selectedMarker) return;
            this.selectedMarker = selectedMarker;
        },
    },
};
</script>
