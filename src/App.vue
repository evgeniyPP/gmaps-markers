<template>
    <div id="app">
        <Map
            @marker-add="onMarkerAdd"
            @marker-click="onMarkerClick"
            @set-markers="setMarkers"
            :markers="markers"
            ref="googleMap"
        />
        <MarkersList
            @marker-select="selectMarker"
            @marker-edit="onMarkerEdit"
            @marker-remove="onMarkerRemove"
            :markers="markers"
        />
        <ObjectsList
            v-if="selectedMarker"
            @object-add="onObjectAdd"
            @object-edit="onObjectEdit"
            @object-remove="onObjectRemove"
            :objects="selectedMarker.objects"
        />
    </div>
</template>

<script>
import Map from './components/Map';
import MarkersList from './components/MarkersList';
import ObjectsList from './components/ObjectsList';

export default {
    name: 'App',
    components: {
        Map,
        MarkersList,
        ObjectsList,
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
            this.selectMarker(marker.id);
            this.save();
        },
        onMarkerClick({ latitude, longitude }) {
            const selectedMarker = this.markers.find(
                marker =>
                    marker.position.latitude === latitude &&
                    marker.position.longitude === longitude
            );
            if (!selectedMarker) return;
            this.selectMarker(selectedMarker.id);
        },
        onMarkerEdit(id) {
            const selectedMarker = this.markers.find(m => m.id === id);
            if (!selectedMarker) return;
            const newDescription = this.$window.prompt(
                'Изменить описание точки',
                selectedMarker.description
            );
            if (!newDescription) return;
            selectedMarker.description = newDescription;
            this.save();
        },
        onMarkerRemove(id) {
            const selectedMarker = this.markers.find(m => m.id === id);
            if (!selectedMarker) return;
            const confirm = this.$window.confirm('Удалить точку?');
            if (!confirm) return;
            selectedMarker.marker.setMap(null);
            this.selectedMarker = null;
            this.markers = this.markers.filter(m => m.id !== id);
            this.save();
        },
        selectMarker(id) {
            const selectedMarker = this.markers.find(m => m.id === id);
            if (!selectedMarker) return;
            this.selectedMarker = selectedMarker;
            const latLng = selectedMarker.marker.getPosition();
            this.$refs.googleMap.setCenter(latLng);
        },
        onObjectAdd(name) {
            const selectedMarker = this.markers.find(
                m => m.id === this.selectedMarker.id
            );
            if (!selectedMarker) return;
            const id = selectedMarker.objects.length + 1;
            selectedMarker.objects.push({
                id,
                name,
            });
            this.save();
        },
        onObjectEdit(id) {
            const selectedMarker = this.markers.find(
                m => m.id === this.selectedMarker.id
            );
            if (!selectedMarker) return;
            const selectedObject = selectedMarker.objects.find(
                o => o.id === id
            );
            if (!selectedObject) return;
            const name = this.$window.prompt(
                'Изменить название объекта',
                selectedObject.name
            );
            if (!name) return;
            selectedObject.name = name;
            this.save();
        },
        onObjectRemove(id) {
            const selectedMarker = this.markers.find(m => m.id === id);
            if (!selectedMarker) return;
            const selectedObject = selectedMarker.objects.find(
                o => o.id === id
            );
            if (!selectedObject) return;
            const confirm = this.$window.confirm('Удалить объект?');
            if (!confirm) return;
            this.selectedMarker.objects = this.selectedMarker.objects.filter(
                o => o.id !== id
            );
            this.save();
        },
        save() {
            const data = this.markers.map(
                ({ id, description, objects, position }) => ({
                    id,
                    description,
                    objects,
                    position,
                })
            );
            localStorage.setItem('markers', JSON.stringify(data));
        },
        setMarkers(data) {
            this.markers = data;
        },
    },
};
</script>
