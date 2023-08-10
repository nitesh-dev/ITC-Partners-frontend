<script setup lang='ts'>
import ApiConsultant from '~/api/ApiConsultant';
import { dateTimeToInputFormat, getToken } from '~/extra/utils'


let prop = defineProps<{
    isVisible: boolean,
    data: {
        first: string,
        last: string,
        phone: number,
        address: string,
        dob: number,
        city: string,
        pincode: number,
        gender: string
    }
}>()

const emit = defineEmits<{
    (event: 'close', isSuccess: boolean): void
}>()


async function onSubmit() {

    try {
        const res = await ApiConsultant.update(getToken()!!, {...prop.data, dob: new Date(dob.value!!.value).getTime()})
        emit('close', true)
    } catch (error) {
        console.log(error)
        alert('Unable to update')
    }
}

const dob = ref<HTMLInputElement>()

</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <form @submit.prevent="onSubmit()">
            <div class="dialog card">
                <h4>Update Profile</h4>
                <div class="content">

                    <div class="col-2">
                        <div class="input">
                            <span>First*</span>
                            <input type="text" v-model="data.first" required>
                        </div>

                        <div class="input">
                            <span>Last*</span>
                            <input type="text" v-model="data.last" required>
                        </div>
                    </div>

                    <div class="col-2">
                        <div class="input">
                            <span>Contact number*</span>
                            <input type="number" v-model="data.phone" required>
                        </div>

                        <div class="input">
                            <span>Date of birth*</span>
                            <input type="date" ref="dob" :value="dateTimeToInputFormat(data.dob)" required>
                        </div>
                    </div>

                    <div class="col-2">
                        <div class="input">
                            <span>City*</span>
                            <input type="text" v-model="data.city" required>
                        </div>

                        <div class="input">
                            <span>Pincode*</span>
                            <input type="number" v-model="data.pincode" required>
                        </div>
                    </div>

                    <div class="col-2">
                        <div class="input">
                            <span>Gender*</span>
                            <select v-model="data.gender" required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div class="input">
                        <span>Address*</span>
                        <textarea rows="4" v-model="data.address" required></textarea>
                    </div>
                </div>
                <div class="buttons-holder">
                    <button class="primary outline" type="button" @click="emit('close', false)">Cancel</button>
                    <button class="primary" type="submit">Update</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped></style>