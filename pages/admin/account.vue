<script setup lang='ts'>
import { AdminAccount } from 'data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString } from '~/extra/utils'


const account = ref<AdminAccount>({
    id: 'sdfsdf',
    first: 'Nitesh',
    last: 'Kumar',
    phone: 56465456464,
    address: 'jksdhfj sdjfksjd fkjksld fklsdjf',
    pincode: '6546545',
    gender: 'Male',
    image: '',
    datetime: 0,
    dob: 0
})
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="7" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Account</h2>
        <button class="primary">Edit Profile</button>
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
                    <p>{{ dateTimeString(account.datetime) }}</p>
                </div>
            </div>

        </div>
    </div>

    <DialogDelete></DialogDelete>
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