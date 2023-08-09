<script setup lang='ts'>
import { tabs } from '~/data/client'
import ApiLead from '~/api/ApiLead';
import { Lead } from 'data/dataTypes';
import { dateTimeString, getToken } from '~/extra/utils'
import ApiConsultant from '~/api/ApiConsultant';

const leads = ref(Array<Lead>())
const profile = ref({
    image: '',
    name: ''
})

onMounted(function () {
    const token = getToken()
    if (!token) {
        //redirect to login
        window.location.href = '/'
    } else {
        getProfileDetail(token)
        fetchAllLeads()
    }

})


async function getProfileDetail(token: string) {
    try {
        const res = await ApiConsultant.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        console.log(error)
        window.location.href = '/'
    }
}





// -------------------- requests --------------------
async function fetchAllLeads() {
    const token = getToken()
    try {
        const res = await ApiLead.getAll(token!!)
        leads.value = res
    } catch (error) {
        console.log(error)
        window.location.href = '/'
    }
}









// -------------- dialog
const isLeadViewDialogVisible = ref(false)
const selectedLeadForView = ref<Lead>()

function openLeadViewDialog(lead: Lead) {
    selectedLeadForView.value = lead
    isLeadViewDialogVisible.value = true
}

function onLeadViewDialogClose() {
    isLeadViewDialogVisible.value = false
}









// ------------ extra ----------------

function calculateLeadsCountPercentage(name: string) {

    let count = 0
    leads.value.forEach(lead => {
        if (lead.status == name) count++
    });

    // calculate percentage
    return Math.round(count / leads.value.length * 100)
}

function calculateLeadsCount(name: string) {

    let count = 0
    leads.value.forEach(lead => {
        if (lead.status == name) count++
    });

    return count
}








const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}



</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="2" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Consultant" />
        </div>

        <h2>Leads</h2>
        <div class="reports">
            <div class="card">
                <p>Approved</p>
                <span>{{ calculateLeadsCount('Approved') }}</span>
                <div class="progress success" :style="{ 'width': calculateLeadsCountPercentage('Approved') + '%' }"></div>
            </div>
            <div class="card">
                <p>Progress</p>
                <span>{{ calculateLeadsCount('Progress') }}</span>
                <div class="progress" :style="{ 'width': calculateLeadsCountPercentage('Progress') + '%' }"></div>
            </div>
            <div class="card">
                <p>Pending</p>
                <span>{{ calculateLeadsCount('Pending') }}</span>
                <div class="progress neutral" :style="{ 'width': calculateLeadsCountPercentage('Pending') + '%' }"></div>
            </div>
            <div class="card">
                <p>Rejects</p>
                <span>{{ calculateLeadsCount('Rejected') }}</span>
                <div class="progress danger" :style="{ 'width': calculateLeadsCountPercentage('Rejected') + '%' }"></div>
            </div>
        </div>


        <WidgetsTab :active-tab="activeTabIndex" :names="['Pending', 'Progress', 'Approved', 'Rejected']"
            :onChange="event => onTabChange(event)">
        </WidgetsTab>

        <!-- Pending -->
        <div v-if="activeTabIndex == 0" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Plan type</th>
                        <th>Submitted at</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == 'Pending'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ item.loan_name }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                            <td @click="openLeadViewDialog(item)">
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Progress -->
        <div v-if="activeTabIndex == 1" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Plan type</th>
                        <th>Submitted At</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == 'Progress'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ item.loan_name }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                            <td @click="openLeadViewDialog(item)">
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Approved -->
        <div v-if="activeTabIndex == 2" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Plan type</th>
                        <th>Plan amount (₹)</th>
                        <th>Commission (%)</th>
                        <th>Submitted at</th>
                        <th>View</th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == 'Approved'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ item.loan_name }}</td>
                            <td>₹{{ item.loan_amount }}</td>
                            <td>{{ item.consultant_commission_percentage }}%</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                            <td @click="openLeadViewDialog(item)">
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Rejected -->
        <div v-if="activeTabIndex == 3" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Submitted At</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == 'Rejected'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                            <td @click="openLeadViewDialog(item)">
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>

                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

    </div>

    <DialogLeadDetail v-if="selectedLeadForView" :onOk="() => onLeadViewDialogClose()" :is-visible="isLeadViewDialogVisible"
        :data="selectedLeadForView" :is-update="false"></DialogLeadDetail>
</template>
<style scoped></style>