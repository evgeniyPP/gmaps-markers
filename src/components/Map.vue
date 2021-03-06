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

            const marker = new this.$gmaps.Marker({
                position,
                label: ++this.labelIndex + '',
                map: this.map,
            });
            marker.addListener('click', ({ latLng }) =>
                this.$emit('marker-click', {
                    latitude: latLng.lat(),
                    longitude: latLng.lng(),
                })
            );
            this.$emit('marker-add', {
                id: this.labelIndex,
                description,
                position: {
                    latitude: position.lat(),
                    longitude: position.lng(),
                },
                objects: [],
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
                disableDefaultUI: true,
                zoomControl: true,
            };
            this.map = new this.$gmaps.Map(element, options);
            this.map.addListener('click', e => this.addMarker(e.latLng));
        },
        setMarkers(data) {
            const dataWithMarkers = data.map(
                ({ id, description, objects, position }) => {
                    const marker = new this.$gmaps.Marker({
                        position: {
                            lat: position.latitude,
                            lng: position.longitude,
                        },
                        label: id + '',
                        map: this.map,
                    });
                    marker.addListener('click', ({ latLng }) =>
                        this.$emit('marker-click', {
                            latitude: latLng.lat(),
                            longitude: latLng.lng(),
                        })
                    );
                    return {
                        id,
                        description,
                        position,
                        objects,
                        marker,
                    };
                }
            );
            this.$emit('set-markers', dataWithMarkers);
        },
    },
    mounted() {
        this.initMap();

        const isSavedPreviously = localStorage.getItem('markers');
        if (isSavedPreviously) {
            const data = JSON.parse(isSavedPreviously);
            if (data.length) {
                this.setMarkers(data);
                const firstItem = data[0];
                const lastItem = data[data.length - 1];
                this.labelIndex = lastItem.id;
                this.setCenter({
                    lat: firstItem.position.latitude,
                    lng: firstItem.position.longitude,
                });
            }
        }
    },
};
</script>
