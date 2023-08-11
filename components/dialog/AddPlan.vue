<script setup lang='ts'>
import { getToken } from '~/extra/utils';
import ApiPlan from '~/api/ApiPlan';


const prop = defineProps<{
    categoryId: number,
    isVisible: Boolean
}>()

const emit = defineEmits<{
    (event: 'close', isSuccess: boolean): void
}>()

const name = ref('')
const description = ref('')
const file = ref<HTMLInputElement>()


async function submitPlan() {
    isProcessing.value = true
    try {
        const image = file.value!!.files!![0]
        const res = await ApiPlan.createPlan(getToken()!!, prop.categoryId, name.value, description.value, image)
        emit('close', true)
    } catch (error) {
        console.log(error)
        alert('Something went wrong')
    }
    isProcessing.value = false
}


const isProcessing = ref(false)



</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card">
            <form  @submit.prevent="submitPlan()" enctype="multipart/form-data">
                <h4>Add Plan</h4>

                <div class="content">

                    <div class="col-2">
                        <div class="input">
                            <span>Plan name</span>
                            <input type="text" v-model="name" required>
                        </div>

                        <div class="input image">
                            <span>Plan image</span>
                            <input type="file" ref="file" required>
                        </div>
                    </div>

                    <div class="input">
                        <span>Plan description</span>
                        <textarea rows="6" v-model="description" required></textarea>
                    </div>
                </div>
                <div class="buttons-holder">
                    <button class="primary outline" type="button" @click="$emit('close', false)">Cancel</button>
                    <button class="success" type="submit">Add</button>
                </div>
            </form>
        </div>

        <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>
    </div>
</template>
<style scoped></style>