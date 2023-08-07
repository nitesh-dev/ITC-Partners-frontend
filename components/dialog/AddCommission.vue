<script setup lang='ts'>
import { Commission } from 'data/dataTypes';

defineProps<{
    data: Commission,
    isVisible: Boolean,
    isUpdate: Boolean
}>()

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
            <h4>Add Commission Level</h4>
            <div class="content">
                <div class="col-2">
                    <div class="input">
                        <span>Level name</span>
                        <input type="text">
                    </div>
                    <div class="input">
                        <span>Leads Count</span>
                        <input type="number" value="10">
                    </div>
                </div>
                <div class="col-2">
                    <div class="input">
                        <span>Commission (%)</span>
                        <input type="number" value="10">
                    </div>
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