<template>
    <div :id="name" class="w-11/12 h-120 mx-auto my-4 bg-gray-400"></div>
</template>

<script>
export default {
    name: 'Map',
    props: {
        markers: Array,
        name: {
            type: String,
            default: 'google-map',
        },
    },
    data() {
        return {
            map: null,
            labelIndex: 0,
        };
    },
    methods: {
        addMarker(position) {
            const description = this.$window.prompt('Введите описание точки');
            if (!description) return;

            const label = ++this.labelIndex + '';
            const marker = new this.$gmaps.Marker({
                position,
                label,
                map: this.map,
            });

            this.map.panTo(position);
            marker.addListener('click', ({ latLng }) =>
                this.$emit('marker-click', {
                    latitude: latLng.lat(),
                    longitude: latLng.lng(),
                })
            );
            this.$emit('marker-add', {
                label,
                description,
                position: {
                    latitude: position.lat(),
                    longitude: position.lng(),
                },
                marker,
            });
        },
        setCenter(latLng) {
            this.map.setCenter(latLng);
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
