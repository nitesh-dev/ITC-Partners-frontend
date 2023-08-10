<script setup lang='ts'>
import { getToken } from '~/extra/utils';
import ApiLead from '~/api/ApiLead';
import { Lead } from '~/data/dataTypes';

const prop = defineProps<{
    isVisible: boolean,
    planName: string

}>()

const lead = ref<Lead>({
    id: 0,
    first: '',
    last: '',
    phone: NaN,
    address: '',
    dob: NaN,
    city: '',
    pincode: NaN,
    gender: 'Male',
    loan_amount: 0,
    loan_name: '',
    purpose_of_loan: '',
    employer_status: '',
    monthly_income: NaN,
    consultant_commission_percentage: 0,
    consultant_id: 0,
    status: 'Pending',
    created_at: 0
})


const dob = ref('')

const emit = defineEmits<{
    (event: 'close', isSuccess: boolean): void
}>()


const isProcessing = ref(false)

async function onSubmit() {
    const dobNumber = new Date(dob.value)
    isProcessing.value = true
    try {

        const res = await ApiLead.createLead(getToken()!!, {...lead.value, dob: dobNumber.getTime(), loan_name: prop.planName})
        alert('Lead successfully submitted')

        lead.value = {
            id: 0,
            first: '',
            last: '',
            phone: NaN,
            address: '',
            dob: NaN,
            city: '',
            pincode: NaN,
            gender: 'Male',
            loan_amount: NaN,
            loan_name: '',
            purpose_of_loan: '',
            employer_status: '',
            monthly_income: NaN,
            consultant_commission_percentage: 0,
            consultant_id: 0,
            status: 'Pending',
            created_at: 0
        }


        emit('close', true)
    } catch (error) {
        alert('Failed to submit lead')
    }

    isProcessing.value = false
}

</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <form @submit.prevent="onSubmit()">
            <div class="dialog medium card">
                <h4>Submit Lead</h4>
                <div class="content">

                    <div class="col-2">
                        <div class="input">
                            <span>First*</span>
                            <input type="text" v-model="lead.first" required>
                        </div>
                        <div class="input">
                            <span>Last*</span>
                            <input type="text" v-model="lead.last" required>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="input">
                            <span>Contact no.*</span>
                            <input type="number" v-model="lead.phone" required>
                        </div>
                        <div class="input">
                            <span>DOB*</span>
                            <input type="date" v-model="dob" required>
                        </div>
                        <div class="input">
                            <span>City*</span>
                            <input type="text" v-model="lead.city" required>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="input">
                            <span>Pincode*</span>
                            <input type="number" v-model="lead.pincode" required>
                        </div>
                        <div class="input">
                            <span>Gender</span>
                            <select v-model="lead.gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div class="input">
                            <span>Selected Plan</span>
                            <input type="text" :value="planName" readonly>
                        </div>
                    </div>
                    <div class="input">
                        <span>Address*</span>
                        <textarea rows="2" v-model="lead.address" required></textarea>
                    </div>

                    <div class="col-2">
                        <div class="input">
                            <span>Lead status*</span>
                            <input type="text" placeholder="e.g farmer" v-model="lead.employer_status" required>
                        </div>

                        <div class="input">
                            <span>Monthly earning (₹)*</span>
                            <input type="number" min="1000" v-model="lead.monthly_income" required>
                        </div>
                    </div>

                    <div class="input">
                        <span>Purpose*</span>
                        <textarea rows="4" v-model="lead.purpose_of_loan" placeholder="Describe why you are taking this plan." required></textarea>
                    </div>
                </div>
                <div class="buttons-holder">
                    <button class="primary outline" type="button" @click="emit('close', false)">Close</button>
                    <button class="primary" type="submit">Submit</button>
                </div>
            </div>
        </form>
        <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>
    </div>
</template>
<style scoped></style>