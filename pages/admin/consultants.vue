<script setup lang='ts'>

import { ConsultantAccount } from 'data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString } from '~/extra/utils'


const consultants = ref(Array<ConsultantAccount>())
consultants.value.push({
    id: 'hsdafjhds',
    first: 'Nitesh',
    last: 'Kumar',
    phone: 45465456456,
    address: 'India bihar',
    referral_code: '56456',
    pincode: '454545',
    gender: 'Male',
    is_approved: true,
    image: '',
    datetime: 4564654654654,
    dob: 4546545645
})

consultants.value.push({
    id: 'hsdafjhds',
    first: 'Nitesh',
    last: 'Kumar',
    phone: 45465456456,
    address: 'India bihar',
    referral_code: '56456',
    pincode: '454545',
    gender: 'Male',
    is_approved: true,
    image: '',
    datetime: 4564654654654,
    dob: 4546545645
})


consultants.value.push({
    id: 'hsdafjhds',
    first: 'Nitesh',
    last: 'Kumar',
    phone: 45465456456,
    address: 'India bihar',
    referral_code: '56456',
    pincode: '454545',
    gender: 'Male',
    is_approved: true,
    image: '',
    datetime: 4564654654654,
    dob: 4546545645
})


consultants.value.push({
    id: 'hsdafjhds',
    first: 'Nitesh',
    last: 'Kumar',
    phone: 45465456456,
    address: 'India bihar',
    referral_code: '56456',
    pincode: '454545',
    gender: 'Male',
    is_approved: false,
    image: '',
    datetime: 4564654654654,
    dob: 4546545645
})
















const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}


</script>
<template>
    <div class="panel">

        <Sidebar :active-tab="1" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Consultants</h2>
        <div class="search card">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
            </svg>
            <input type="text" placeholder="Search here">
        </div>

        <WidgetsTab :active-tab="activeTabIndex" :names="['Consultants', 'New consultants']"
            :onChange="event => onTabChange(event)" />

        <div v-if="activeTabIndex == 0" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Referral Code</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Joined At</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in consultants">
                        <tr v-if="item.is_approved">
                            <td><img src="~/public/images/no_image.png"></td>
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.referral_code }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.dob) }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
                            <td>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <div v-else-if="activeTabIndex == 1" class="tab-container">

        </div>



    </div>
</template>
<style scoped>
.panel .search {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    max-width: 800px;
    width: 100%;
    fill: var(--color-on-surface);
    gap: 1rem;
}

.panel .search svg {
    fill: inherit;
}

.panel .search input {
    height: 100%;
    border: none;
    width: 100%;
    outline: none;
    color: var(--color-on-surface-dark);
}
</style>