<template>
    <div class="my-6">
        <div class="max-w-11/12 mx-auto">
            <p class="mb-4 text-lg leading-6 font-medium text-gray-900">
                Маркеры
            </p>
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                    >
                        <div
                            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                        >
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            № маркера
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Описание
                                        </th>
                                        <th
                                            scope="col"
                                            class="w-40 relative px-6 py-3"
                                        >
                                            <span class="sr-only">
                                                Действия
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                    x-max="1"
                                >
                                    <tr v-if="!markers.length">
                                        <td
                                            colspan="100%"
                                            class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                        >
                                            Маркеров пока нет
                                        </td>
                                    </tr>
                                    <template v-else>
                                        <MarkersListItem
                                            v-for="marker in markers"
                                            :key="marker.id"
                                            :marker="marker"
                                            @marker-select="
                                                selectMarker(marker.id)
                                            "
                                            @marker-edit="editMarker(marker.id)"
                                            @marker-remove="
                                                removeMarker(marker.id)
                                            "
                                        />
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MarkersListItem from './MarkersListItem';

export default {
    name: 'MarkersList',
    props: {
        markers: Array,
    },
    components: { MarkersListItem },
    methods: {
        selectMarker(id) {
            this.$emit('marker-select', id);
        },
        editMarker(id) {
            this.$emit('marker-edit', id);
        },
        removeMarker(id) {
            this.$emit('marker-remove', id);
        },
    },
};
</script>
