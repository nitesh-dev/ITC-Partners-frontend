<script setup lang='ts'>
import { Offer } from 'data/dataTypes';


defineProps<{
    data: Offer,
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
            <h4 v-if="isUpdate">Update Offer</h4>
            <h4 v-else="isUpdate">Add Offer</h4>

            <div class="content">

                <div class="col-2">
                    <div class="input image">
                        <span>Offer image</span>
                        <input type="file">
                    </div>
                    <button class="primary">Choose plan</button>
                </div>

                <div class="col-2">
                    <div class="input">
                        <span>Offer name</span>
                        <input type="text">
                    </div>
                    <div class="input">
                        <span>Label</span>
                        <input type="text" placeholder="e.g Mega Offer">
                    </div>
                </div>

                <div class="col-2">
                    <div class="input">
                        <span>Plan price (₹)</span>
                        <input type="number" value="100" readonly>
                    </div>
                    <div class="input">
                        <span>Discount (₹)</span>
                        <input type="number" value="100">
                    </div>
                </div>

                <div class="col-2">
                    <div class="input">
                        <span>Offer start</span>
                        <input type="date" value="100">
                    </div>
                    <div class="input">
                        <span>Offer end</span>
                        <input type="date" value="100">
                    </div>
                </div>

                <div class="input">
                    <span>Offer description</span>
                    <textarea></textarea>
                </div>
            </div>
            <div class="buttons-holder">
                <button class="primary outline" @click="onCancel()">Cancel</button>
                <button class="success" @click="onAdd()">Add</button>
            </div>
        </div>
    </div>

    <DialogChoosePlan :is-visible="false"></DialogChoosePlan>
</template>
<style scoped>

</style>