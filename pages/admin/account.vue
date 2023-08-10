<script setup lang='ts'>
import ApiAdmin from '~/api/ApiAdmin';
import { AdminAccount } from 'data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString, getToken } from '~/extra/utils'


let token: string | null = null

onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('/admin/login')
    } else {
        getProfileDetail(token)

    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiAdmin.get(token)
        account.value = res
    } catch (error) {
        console.log(error)
        navigateTo('/admin/login')
    }
}



const account = ref<AdminAccount>({
    id: 0,
    first: '',
    last: '',
    email: '',
    phone: 0,
    city: '',
    address: '',
    pincode: 0,
    gender: 'Male',
    created_at: 0,
    dob: 0,
    profile_url: ''
})


const updatable = ref({
    first: '',
    last: '',
    phone: 0,
    address: '',
    dob: 0,
    pincode: 0,
    gender: 'Male'
})







// add plan dialog
const isProfileDialogVisible = ref(false)

function openProfileDialog() {
    isProfileDialogVisible.value = true
    updatable.value = {
        first: account.value.first,
        last: account.value.last,
        phone: account.value.phone,
        address: account.value.address,
        dob: account.value.dob,
        pincode: account.value.pincode,
        gender: account.value.gender
    }
}

function onProfileDialogClose(isSuccess: boolean) {
    if (isSuccess) getProfileDetail(token!!)
    isProfileDialogVisible.value = false
}






</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="7" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="account.profile_url" :name="account.first + ' ' + account.last" role="Admin" />
        </div>

        <h2>Account</h2>
        <button @click="openProfileDialog()" class="primary">Edit Profile</button>
        <div class="profile">

            <div class="equal-row">
                <div class="card">
                    <span>Id</span>
                    <p>{{ account.id }}</p>
                </div>
                <div class="card">
                    <span>Name</span>
                    <p>{{ account.first }} {{ account.last }}</p>
                </div>
            </div>

            <div class="equal-row">
                <div class="card">
                    <span>Phone</span>
                    <p>{{ account.phone }}</p>
                </div>
                <div class="card">
                    <span>Address</span>
                    <p>{{ account.address }}</p>
                </div>
            </div>

            <div class="equal-row">
                <div class="card">
                    <span>Pincode</span>
                    <p>{{ account.pincode }}</p>
                </div>
                <div class="card">
                    <span>Gender</span>
                    <p>{{ account.gender }}</p>
                </div>
            </div>

            <div class="equal-row">
                <div class="card">
                    <span>Date of birth</span>
                    <p>{{ dateTimeString(account.dob) }}</p>
                </div>
                <div class="card">
                    <span>Joined at</span>
                    <p>{{ dateTimeString(account.created_at) }}</p>
                </div>
            </div>

        </div>
    </div>

    <DialogAdminUpdateProfile :onClose="onProfileDialogClose" :data="updatable" :is-visible="isProfileDialogVisible">
    </DialogAdminUpdateProfile>
</template>
<style scoped>
.panel>.profile {
    margin-top: 2rem;
    max-width: 800px;
    width: 100%;
}

.profile .equal-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
}

.panel .card {
    padding: 1rem;
    border-radius: 4px;
}

.panel>.profile .card p {
    color: var(--color-on-surface-dark);
    margin: 0;
    margin-top: 0.5em;
}

.profile .card span {
    color: var(--color-on-surface);
    margin: 0;
}
</style>