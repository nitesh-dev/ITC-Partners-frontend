<script setup lang='ts'>
import { LoanSubCategory } from 'data/dataTypes';
defineProps<{
    data: LoanSubCategory,
    isVisible: Boolean
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
            <h4>Add Plan</h4>

            <div class="content">
                
                <div class="input image">
                    <span>Plan image</span>
                    <input type="file">
                </div>

                <div class="col-2">
                    <div class="input">
                        <span>Plan name</span>
                        <input type="text">
                    </div>

                    <div class="input">
                        <span>Price (₹)</span>
                        <input type="number" value="100">
                    </div>
                </div>

                <div class="input">
                    <span>Plan description</span>
                    <textarea></textarea>
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