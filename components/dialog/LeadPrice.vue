<script setup lang='ts'>
import { getToken } from '~/extra/utils';
import ApiLead from '~/api/ApiLead';
import { Lead} from '~/data/dataTypes';
const prop = defineProps<{
    data: Lead,
    isVisible: Boolean
}>()



const emit = defineEmits<{
    (event: 'submit', isSuccess: boolean): void
}>()

const isProcessing = ref(false)
const loan = ref(0)

async function onSubmit(){
    isProcessing.value = true
    try {
        const res = await ApiLead.completeLead(getToken()!!, prop.data.id, loan.value)
        
        prop.data.loan_amount = loan.value
        loan.value = 0
        emit('submit', true)

    } catch (error) {
        console.log(error)
        alert('Unable to process your request!')
    }
    isProcessing.value = false
}


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
                            <input type="number" :value="data.consultant_commission_percentage" readonly>
                        </div>
                        <div class="input">
                            <span>Plan</span>
                            <input type="text" :value="data.loan_name" readonly>
                        </div>
                    </div>
                    <div class="input">
                        <span>Enter plan amount (₹)</span>
                        <input type="number" min="10" v-model="loan" required>
                    </div>
                </div>

                <p class="note">Note: after form submit commission of this lead will be transferred to the consultant and
                    its referral.</p>
                <div class="buttons-holder">
                    <button class="primary outline" @click="emit('submit', false)" type="button">Cancel</button>
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