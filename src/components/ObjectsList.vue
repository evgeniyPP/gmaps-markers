<template>
    <div class="my-6">
        <div class="max-w-11/12 mx-auto">
            <p class="mb-4 text-lg leading-6 font-medium text-gray-900">
                Объекты
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
                                            №
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Название объекта
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
                                    <tr v-if="!objects || !objects.length">
                                        <td
                                            colspan="100%"
                                            class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                        >
                                            Объектов пока нет
                                        </td>
                                    </tr>
                                    <template v-else>
                                        <ObjectsListItem
                                            v-for="(object, index) in objects"
                                            :key="object.id"
                                            :object="object"
                                            :index="index"
                                            @object-edit="editObject(object.id)"
                                            @object-remove="
                                                removeObject(object.id)
                                            "
                                        />
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="mt-4 flex flex-row-reverse">
                    <button
                        @click="addObject"
                        type="button"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-green-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Добавить объект
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ObjectsListItem from './ObjectsListItem';

export default {
    name: 'ObjectsList',
    props: {
        objects: Array,
    },
    components: { ObjectsListItem },
    methods: {
        addObject() {
            const name = this.$window.prompt('Введите название объекта');
            if (!name) return;
            this.$emit('object-add', name);
        },
        editObject(id) {
            this.$emit('object-edit', id);
        },
        removeObject(id) {
            this.$emit('object-remove', id);
        },
    },
};
</script>
