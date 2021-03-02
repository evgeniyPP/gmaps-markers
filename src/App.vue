<template>
    <div id="app">
        <Map
            @marker-add="onMarkerAdd"
            @marker-click="onMarkerClick"
            :markers="markers"
            ref="googleMap"
        />
        <MarkersList
            @marker-select="selectMarker"
            @marker-edit="onMarkerEdit"
            @marker-remove="onMarkerRemove"
            :markers="markers"
        />
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
            this.selectMarker(marker.label);
        },
        onMarkerClick({ latitude, longitude }) {
            const selectedMarker = this.markers.find(
                marker =>
                    marker.position.latitude === latitude &&
                    marker.position.longitude === longitude
            );
            if (!selectedMarker) return;
            this.selectMarker(selectedMarker.label);
        },
        onMarkerEdit(label) {
            const selectedMarker = this.markers.find(m => m.label === label);
            if (!selectedMarker) return;
            const newDescription = this.$window.prompt(
                'Изменить описание точки',
                selectedMarker.description
            );
            if (!newDescription) return;
            selectedMarker.description = newDescription;
        },
        onMarkerRemove(label) {
            const selectedMarker = this.markers.find(m => m.label === label);
            if (!selectedMarker) return;
            const confirm = this.$window.confirm('Удалить точку');
            if (!confirm) return;
            selectedMarker.marker.setMap(null);
            this.selectedMarker = null;
            this.markers = this.markers.filter(
                marker => marker.label !== label
            );
        },
        selectMarker(label) {
            const selectedMarker = this.markers.find(m => m.label === label);
            if (!selectedMarker) return;
            this.selectedMarker = selectedMarker.label;
            const latLng = selectedMarker.marker.getPosition();
            this.$refs.googleMap.setCenter(latLng);
        },
    },
};
</script>
