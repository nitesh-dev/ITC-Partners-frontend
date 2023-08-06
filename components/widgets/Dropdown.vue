<script setup lang='ts'>

defineProps({
    hideDelete: Boolean,
    hideEdit: Boolean,
    hideView: Boolean,
    isHidden: Boolean
})

const emit = defineEmits<{
    (event: 'edit'): void
    (event: 'view'): void
    (event: 'delete'): void
}>()

function onItemClick(index: number) {
    if (index == 0) {
        emit('view')
    } else if (index == 1) {
        emit('edit')
    } else if ('delete') {
        emit('delete')
    }
}


</script>
<template>
    <div v-if="!isHidden" class="menu card">

        <div @click="onItemClick(0)" class="item" v-if="!hideView">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
            </svg>
            <p>View</p>
        </div>

        <div @click="onItemClick(1)" class="item" v-if="!hideEdit">
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" />
            </svg>
            <p>Edit</p>
        </div>

        <div @click="onItemClick(2)" class="item danger" v-if="!hideDelete">
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" />
            </svg>
            <p>Delete</p>
        </div>
    </div>
</template>
<style scoped>
.menu {
    padding: 0.5rem 0;
    min-width: 200px;
    position: absolute !important;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    top: 50px;
    right: 0;
}

.menu .item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 8px 1rem;
    color: var(--color-on-surface-dark);
    fill: var(--color-on-surface-dark);
}

.menu .item:hover {
    background-color: rgb(241, 241, 241);
}

.menu .item.danger {
    color: var(--color-error);
    fill: var(--color-error);
}



.menu p {
    color: inherit;
    margin: 0;
}

.menu svg {
    width: 20px;
    fill: inherit;
}
</style>