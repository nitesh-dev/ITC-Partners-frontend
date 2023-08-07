<script setup lang='ts'>

import { ConsultantAccount } from 'data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString } from '~/extra/utils'
import ApiConsultant from '~/api/ApiConsultant'


const consultants = ref(Array<ConsultantAccount>())

onMounted(function(){
    fetchAllConsultants()
})

async function fetchAllConsultants(){
    try {
        const res = await ApiConsultant.getAll()
        consultants.value = res
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}




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
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Referral Code</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Joined At</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in consultants">
                        <tr v-if="item.is_approved">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.referral_code }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.dob) }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                            <td>
                                <button class="danger">Remove</button>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <div v-else-if="activeTabIndex == 1" class="tab-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Referral Code</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Joined At</th>
                        <th>Approve</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in consultants">
                        <tr v-if="!item.is_approved">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.referral_code }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                            <td>
                               <button class="success">Accept</button>
                            </td>
                            <td>
                               <button class="danger">Reject</button>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>



    </div>

    <DialogAccept :is-visible="false" button-name="Accept" title="Request Accept" message="Empty"></DialogAccept>
    <DialogAccept :is-visible="false" :is-danger="true" button-name="Reject" title="Request Reject" message="Empty"></DialogAccept>
</template>
<style scoped>
.panel {

}


</style>