<script setup lang='ts'>
import { Lead } from '~/data/dataTypes';
import { dateTimeString, dateTimeToInputFormat } from '~/extra/utils'
defineProps<{
    isVisible: boolean,
    data: Lead
}>()

const emit = defineEmits<{
    (event: 'ok'): void
}>()


function onOk() {
    emit('ok')
}


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card">
            <h4>Lead Details</h4>
            <div class="content">

                <div class="col-2">
                    <div class="input">
                        <span>Name</span>
                        <input type="text" :value="data.first + ' ' + data.last" readonly>
                    </div>
                    <div class="input">
                        <span>Phone</span>
                        <input type="number" :value="data.phone" readonly>
                    </div>
                </div>

                <div class="input">
                    <span>Address</span>
                    <textarea :value="data.address" readonly></textarea>
                </div>


                <div class="col-2">
                    <div class="input">
                        <span>DOB</span>
                        <input type="date" :value="dateTimeToInputFormat(data.dob)" readonly>
                    </div>
                    <div class="input">
                        <span>City</span>
                        <input type="text" :value="data.city" readonly>
                    </div>
                </div>

                <div class="col-2">
                    <div class="input">
                        <span>Pincode</span>
                        <input type="text" :value="data.pincode" readonly>
                    </div>
                    <div class="input">
                        <span>Gender</span>
                        <input type="text" :value="data.gender" readonly>
                    </div>
                </div>

                <div class="input">
                    <span>Purpose of loan</span>
                    <textarea :value="data.purpose_of_loan" rows="5" readonly></textarea>
                </div>

                <div class="col-2">
                    <div class="input">
                        <span>Employer Status</span>
                        <input type="text" :value="data.employer_status" readonly>
                    </div>
                    <div class="input">
                        <span>Monthly Income</span>
                        <input type="number" :value="data.monthly_income" readonly>
                    </div>
                </div>

            </div>
            <div class="buttons-holder">
                <button class="primary" @click="onOk()">Close</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>