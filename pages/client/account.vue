<script setup lang='ts'>
import ApiConsultant from '~/api/ApiConsultant';
import { getToken, dateTimeString } from '~/extra/utils';
import { tabs } from '~/data/client'
import { ConsultantAccount } from 'data/dataTypes';

let token: string | null = null


onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('/')
    } else {
        getProfileDetail(token)
    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiConsultant.get(token)
        account.value = res

    } catch (error) {
        navigateTo('/')
    }
}

const account = ref<ConsultantAccount>({
    id: 0,
    first: '',
    last: '',
    email: '',
    phone: 0,
    address: '',
    referral_code: '',
    dob: 0,
    city: '',
    pincode: 0,
    gender: 'Male',
    is_approved: false,
    created_at: 0,
    profile_url: ''
})
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <div class="card referral">
                <span>Referral Code</span>
                <p>{{ account.referral_code }}</p>
            </div>
            <Profile :image="account.profile_url" :name="account.first + ' ' + account.last" role="Admin" />
        </div>

        <h2>Account</h2>
        <button class="primary">Edit Profile</button>

        <p class="danger" v-if="!account.is_approved">Your account is not approved yet. Some of the functionality are turned off. <br>You will have all the functionality available once you will approved by the admin. You can also contact them using phone number.</p>
        <p class="success" v-else>Your account is successfully approved by admin.</p>

        <div class="profile">

            <div class="equal-row">
                <div class="card">
                    <span>Email</span>
                    <p>{{ account.email }}</p>
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
                    <span>City</span>
                    <p>{{ account.city }}</p>
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

    <DialogDelete></DialogDelete>
</template>
<style scoped>

p.danger{
    color: var(--color-error);
}

p.success{
    color: var(--color-primary);
}

.referral{
    background-color: var(--color-primary);
    height: 68px;
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
    justify-content: center;

}

.referral span{
    color: white;
    font-size: var(--small-font);
    margin: 0;
    opacity: 0.8;
}

.referral p{
    color: white;
    font-weight: bold;
    margin: 0;
}

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