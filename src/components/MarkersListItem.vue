<template>
    <tr @click="selectMarker" class="cursor-pointer">
        <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
            {{ marker.id }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ marker.description }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
                @click.prevent="editMarker"
                href="#"
                class="text-yellow-600 hover:text-yellow-900 pr-2"
            >
                Изменить
            </a>
            <a
                @click.prevent="removeMarker"
                href="#"
                class="text-red-600 hover:text-red-900"
            >
                Удалить
            </a>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'MarkersListItem',
    props: {
        marker: Object,
    },
    methods: {
        selectMarker() {
            this.$emit('marker-select');
        },
        editMarker() {
            this.$emit('marker-edit');
        },
        removeMarker() {
            this.$emit('marker-remove');
        },
    },
};
</script>
