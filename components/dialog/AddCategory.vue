<script setup lang='ts'>
import ApiCategory from '~/api/ApiCategory';
import { getToken } from '~/data/utils';

defineProps({
    isVisible: Boolean
})

const emit = defineEmits<{
    (event: 'close', isSuccess: boolean): void
}>()

const isProcessing = ref(false)

const name = ref('')


async function onSubmit(){
    isProcessing.value = true
    try {
        const res = await ApiCategory.createCategory(getToken(), name.value)
        emit('close', true)
        
    } catch (error) {
        console.log(error)
        alert('something went wrong!')
    }

    isProcessing.value = false
    
}


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <form @submit.prevent="onSubmit()">
            <div class="dialog card">
            <h4>Add Category</h4>
            <div class="content">
                <div class="input">
                    <span>Category name</span>
                    <input v-model="name" type="text" required>
                </div>
            </div>
            <div class="buttons-holder">
                <button class="primary outline" type="button" @click="$emit('close', false)">Cancel</button>
                <button class="success" type="submit">Add</button>
            </div>
        </div>
        </form>
        <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>
    </div>
</template>
<style scoped></style>