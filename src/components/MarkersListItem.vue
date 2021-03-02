<template>
    <tr>
        <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
            {{ marker.label }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ marker.description }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
                @click.prevent="$emit('marker-edit')"
                href="#"
                class="text-yellow-600 hover:text-indigo-900 pr-2"
            >
                Изменить
            </a>
            <a
                @click.prevent="$emit('marker-remove')"
                href="#"
                class="text-red-600 hover:text-indigo-900"
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
};
</script>

<style></style>
