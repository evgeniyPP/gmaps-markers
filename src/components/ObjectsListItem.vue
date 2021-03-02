<template>
    <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ object.name }}
        </td>
        <td
            class="w-40 px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
        >
            <a
                @click.prevent="editObject"
                href="#"
                class="text-yellow-600 hover:text-indigo-900 pr-2"
            >
                Изменить
            </a>
            <a
                @click.prevent="removeObject"
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
    name: 'ObjectsListItem',
    props: {
        object: Object,
    },
    methods: {
        editObject() {
            this.$emit('object-edit');
        },
        removeObject() {
            this.$emit('object-remove');
        },
    },
};
</script>
