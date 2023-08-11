<script setup lang='ts'>
import ApiWithdraw from '~/api/ApiWithdraw';
import { getToken } from '~/extra/utils';

const prop = defineProps<{
    balance: number,
    isVisible: boolean
}>()

const emit = defineEmits<{
    (event: 'close', isSuccess: boolean): void
}>()


const amount = ref<number>(NaN)


async function sendRequest() {
    try {
        if (amount.value > prop.balance) {
            alert('Requested amount will be smaller than your balance')
        } else {

            // send request
            const res = await ApiWithdraw.createWithdraw(getToken()!!, amount.value)
            amount.value = NaN
            emit('close', true)
        }
    } catch (error) {
        console.log(error)
        alert('failed to send your request!')
    }
}


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <form @submit.prevent="sendRequest()">
            <div class="dialog card">
                <h4>Send Withdraw Request</h4>
                <div class="content">
                    <div class="input">
                        <span>Enter your request amount (₹)*</span>
                        <input type="number" min="1" v-model="amount" required>
                    </div>
                    <p><b>Note:</b> Your money will transferred to your account, once admin approve it. You can also call
                        the admin to process your request.</p>
                    <p class="note">You will not able to submit or cancel your withdraw request once send.</p>
                </div>

                <div class="buttons-holder">
                    <button class="primary outline" type="button" @click="emit('close', false)">Cancel</button>
                    <button class="primary" type="submit">Request</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
p.note {
    color: var(--color-secondary);
}
</style>