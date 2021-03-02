<template>
    <div class="w-11/12 h-120 mx-auto my-4 bg-gray-400" :id="name"></div>
</template>

<script>
export default {
    name: 'Map',
    props: {
        name: {
            type: String,
            default: 'google-map',
        },
    },
    data() {
        return {
            map: null,
            labels: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            labelIndex: 0,
            markers: [],
        };
    },
    methods: {
        addMarker(position) {
            const label = this.labels[this.labelIndex++ % this.labels.length];
            const marker = new this.$gmaps.Marker({
                position,
                label,
                map: this.map,
            });

            const description = this.$window.prompt('Введите описание');
            if (!description) {
                marker.setMap(null);
                return;
            }

            this.map.panTo(position);
            this.markers.push({
                label,
                description,
                position: {
                    latitude: position.lat(),
                    longitude: position.lng(),
                },
                marker,
            });
        },
        initMap() {
            const element = document.getElementById(this.name);
            const options = {
                zoom: 14,
                center: new this.$gmaps.LatLng(55.75, 37.62),
            };
            this.map = new this.$gmaps.Map(element, options);
            this.map.addListener('click', e => this.addMarker(e.latLng));
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>
