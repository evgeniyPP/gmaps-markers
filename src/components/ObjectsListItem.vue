<template>
    <tr>
        <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
            {{ index + 1 }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ object.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
                @click.prevent="editObject"
                href="#"
                class="text-yellow-600 hover:text-yellow-900 pr-2"
            >
                Изменить
            </a>
            <a
                @click.prevent="removeObject"
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
    name: 'ObjectsListItem',
    props: {
        object: Object,
        index: Number,
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
