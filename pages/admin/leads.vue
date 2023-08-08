<script setup lang='ts'>
import { Lead, LeadStatus } from '~/data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString } from '~/extra/utils'

import { getToken } from '~/data/utils';
import ApiLead from '~/api/ApiLead';

let token = 'null'

const leads = ref(Array<Lead>())

onMounted(function () {
    token = getToken()
    fetchAllLeads()
})





// -------------------- requests --------------------
async function fetchAllLeads() {
    try {
        const res = await ApiLead.getAll(token)

        leads.value = res
        console.log(leads.value)

    } catch (error) {
        console.log(error)
    }
}


async function updateStatus(leadId: number, status: 'Pending' | 'Progress' | 'Approved' | 'Rejected') {
    isProcessing.value = true
    try {
        const index = leads.value.findIndex((v) => v.id == leadId)

        if (index != -1) {

            const res = await ApiLead.updateStatus(token, leadId, status)
            leads.value[index].status = status
        } else {
            throw 'Unable to do processing'
        }

    } catch (error) {
        console.log(error)
    }

    isProcessing.value = false
}




// ---------------------------- dialogs --------------------

let selectedLead: null | Lead = null
const isApproveDialogVisible = ref(false)
const isRejectDialogVisible = ref(false)
const isLeadViewDialogVisible = ref(false)
const isLeadPriceDialogVisible = ref(false)
const isProcessing = ref(false)
const selectedLeadForView = ref<Lead>()


// Accept dialog
function onAcceptDialog(isOk: boolean) {

    isApproveDialogVisible.value = false
    if (selectedLead == null) return
    if (isOk) {
        updateStatus(selectedLead.id, 'Progress')
    }
}


function openAcceptDialog(lead: Lead) {
    selectedLead = lead
    isApproveDialogVisible.value = true
}


// reject dialog
function onRejectDialog(isOk: boolean) {

    isRejectDialogVisible.value = false
    if (selectedLead == null) return
    if (isOk) {
        updateStatus(selectedLead.id, 'Rejected')
    }
}


function openRejectDialog(lead: Lead) {
    selectedLead = lead
    isRejectDialogVisible.value = true
}


function openLeadViewDialog(lead: Lead) {
    selectedLeadForView.value = lead
    isLeadViewDialogVisible.value = true
}

function onLeadViewDialogClose() {
    isLeadViewDialogVisible.value = false
}



// lead price update dialog
function openLeadPriceUpdateDialog(lead: Lead) {
    selectedLeadForView.value = lead
    isLeadPriceDialogVisible.value = true
}


function onLeadPriceDialogClose(isSuccess: boolean) {
    isLeadPriceDialogVisible.value = false
    if (isSuccess) {
        const index = leads.value.findIndex((v) => v.id == selectedLeadForView.value?.id)

        if (index > -1) {
            leads.value[index].status = 'Approved'
        }
    }
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
            <Profile name="Nitesh kr" role="Admin" />
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
            :onChange="event => onTabChange(event)" />



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
                        <th>Accept</th>
                        <th>Reject</th>
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
                            <td>
                                <button @click="openAcceptDialog(item)" class="success">Accept</button>
                            </td>
                            <td>
                                <button @click="openRejectDialog(item)" class="danger">Reject</button>
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
                        <th>Loan type</th>
                        <th>Submitted At</th>
                        <th>View</th>
                        <th>Pay & Approve</th>

                        <th>Reject</th>
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
                            <td>
                                <button @click="openLeadPriceUpdateDialog(item)" class="success">Pay & Approve</button>
                            </td>
                            <td>
                                <button @click="openRejectDialog(item)" class="danger">Reject</button>
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

    <DialogAccept :onCancel="() => onAcceptDialog(false)" :onOk="() => onAcceptDialog(true)"
        :is-visible="isApproveDialogVisible" button-name="Accept" title="Request Accept"
        message="Do you really want to accept this lead?"></DialogAccept>
    <DialogAccept :onCancel="() => onRejectDialog(false)" :onOk="() => onRejectDialog(true)"
        :is-visible="isRejectDialogVisible" :is-danger="true" button-name="Reject" title="Request Reject"
        message="Do your really want to reject this lead?"></DialogAccept>

    <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>

    <DialogLeadPrice v-if="selectedLeadForView" :is-visible="isLeadPriceDialogVisible" :data="selectedLeadForView"
        :onSubmit="event => onLeadPriceDialogClose(event)"></DialogLeadPrice>
</template>
<style scoped></style>