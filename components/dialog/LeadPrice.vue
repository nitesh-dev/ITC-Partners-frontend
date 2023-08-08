<script setup lang='ts'>
import { Lead} from '~/data/dataTypes';
const prop = defineProps<{
    data: Lead,
    isVisible: Boolean
}>()


const data = ref(prop.data)



const emit = defineEmits<{
    (event: 'submit', isSuccess: boolean): void
}>()


function onClose(isSuccess: boolean) {
    emit('submit', isSuccess)
}




// async function updateStatus(leadId: number, status: 'Pending' | 'Progress' | 'Approved' | 'Rejected') {
//     isProcessing.value = true
//     try {
//         const index = leads.value.findIndex((v) => v.id == leadId)

//         if (index != -1) {

//             const res = await ApiLead.updateStatus(token, leadId, status)
//             leads.value[index].status = status
//         } else {
//             throw 'Unable to do processing'
//         }

//     } catch (error) {
//         console.log(error)
//     }

//     isProcessing.value = false
// }

function onSubmit(){
    // onClose(true)
    alert('Todo work left to submit')
}

const isProcessing = ref(false)


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        
        <form method="post" @submit.prevent="onSubmit()">
            <div class="dialog card">
                <h4>Complete Lead Request</h4>

                <div class="content">

                    <div class="col-3">
                        <div class="input">
                            <span>Lead name</span>
                            <input type="text" :value="data.first + ' ' + data.last" readonly>
                        </div>
                        <div class="input">
                            <span>Commission (%)</span>
                            <input type="text" :value="data.consultant_commission_percentage" readonly>
                        </div>
                        <div class="input">
                            <span>Plan</span>
                            <input type="text" readonly>
                        </div>
                    </div>
                    <div class="input">
                        <span>Enter plan amount (₹)</span>
                        <input type="number" min="10" v-model="data.loan_amount" required>
                    </div>
                </div>

                <p class="note">Note: after form submit commission of this lead will be transferred to the consultant and
                    its referral.</p>
                <div class="buttons-holder">
                    <button class="primary outline" @click="onClose(false)" type="button">Cancel</button>
                    <button class="success" type="submit">Complete</button>
                </div>
            </div>
        </form>

        <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>
    </div>
    

</template>
<style scoped>
p.note {
    color: var(--color-secondary);
}

.col-3 {
    display: grid;
    grid-template-columns: 1fr 0.7fr 1fr;
    align-items: center;
    gap: 0.5rem;
}
</style>