<script setup lang='ts'>
defineProps({
    message: String,
    isVisible: Boolean
})

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'delete'): void
}>()

function onCancel(){
    emit('cancel')
}

function onDelete(){
    emit('delete')
}


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card">
            <h4>Delete</h4>
            <div class="content">
                <p>{{ message }}</p>
            </div>
            <div class="buttons-holder">
                <button class="primary" @click="onCancel()">Cancel</button>
                <button class="danger" @click="onDelete()">Delete</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>