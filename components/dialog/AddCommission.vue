<script setup lang='ts'>
import ApiCommission from '~/api/ApiCommission';
import { Commission } from '~/data/dataTypes';
import { getToken } from '~/extra/utils';

const prop = defineProps<{
    data: Commission,
    isVisible: boolean,
    isCreate: boolean
}>()



const emit = defineEmits<{
    (event: 'close', isSuccess: boolean): void
}>()


async function addCommission() {
    isProcessing.value = true
    try {
        const res = await ApiCommission.createCommission(getToken()!!, prop.data.name, prop.data.leads_count, prop.data.commission_percentage)
        emit('close', true)
    } catch (error) {
        alert(error)
    }

    isProcessing.value = false
}

async function updateCommission() {
    isProcessing.value = true
    try {
        const res = await ApiCommission.updateCommission(getToken()!!, prop.data.id, prop.data.name, prop.data.leads_count, prop.data.commission_percentage)
        emit('close', true)
    } catch (error) {
        alert(error)
    }

    isProcessing.value = false
}


function onsubmit(){

    if(prop.isCreate){
        addCommission()
    }else{
        updateCommission()
    }
}


const isProcessing = ref(false)


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card">
            <form @submit.prevent="onsubmit()">
                <h4 v-if="isCreate">Add Commission Level</h4>
                <h4 v-else>Update Commission Level</h4>

                <div class="content">
                    <div class="col-2">
                        <div class="input">
                            <span>Level name</span>
                            <input type="text" required v-model="data.name">
                        </div>
                        <div class="input">
                            <span>Leads Count</span>
                            <input type="number" min="2" required v-model="data.leads_count">
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input">
                            <span>Commission (%)</span>
                            <input type="number" min="1" required v-model="data.commission_percentage">
                        </div>
                    </div>
                </div>

                <div class="buttons-holder">
                    <button class="primary outline" type="button" @click="$emit('close', false)">Cancel</button>
                    <button v-if="isCreate" class="success" type="submit">Add</button>
                    <button v-else class="success" type="submit">Update</button>
                </div>
                
            </form>
        </div>

        <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>
    </div>
</template>
<style scoped></style>