<script setup lang='ts'>
defineProps({
    isVisible: Boolean
})

const emit = defineEmits<{
    (event: 'cancel'): void
    (event: 'add'): void
}>()

function onCancel() {
    emit('cancel')
}

function onAdd() {
    emit('add')
}


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card">
            <h4>Add Category</h4>
            <div class="content">
                <div class="input">
                    <span>Category name</span>
                    <input type="text">
                </div>
            </div>
            <div class="buttons-holder">
                <button class="primary outline" @click="onCancel()">Cancel</button>
                <button class="success" @click="onAdd()">Add</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>