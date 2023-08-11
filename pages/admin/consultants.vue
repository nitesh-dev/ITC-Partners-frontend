<script setup lang='ts'>

import { ConsultantAccount } from 'data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString, getToken } from '~/extra/utils'
import ApiConsultant from '~/api/ApiConsultant'
import ApiAdmin from '~/api/ApiAdmin';



const consultants = ref(Array<ConsultantAccount>())

let token: string | null = null

const profile = ref({
    image: '',
    name: ''
})

onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('/admin/login')
    } else {
        getProfileDetail(token)
        fetchAllConsultants()
    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiAdmin.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        console.log(error)
        navigateTo('/admin/login')
    }
}







// -------------------- requests --------------------
async function fetchAllConsultants() {
    try {
        const res = await ApiConsultant.getAll(token!!)
        consultants.value = res

    } catch (error) {
        console.log(error)
    }
}


async function approve(consultantId: number) {
    isProcessing.value = true
    try {
        const index = consultants.value.findIndex((v) => v.id == consultantId)

        if (index != -1) {

            const res = await ApiConsultant.updateStatus(token!!, consultantId, true)
            consultants.value[index].is_approved = true

        }

    } catch (error) {
        console.log(error)
    }

    isProcessing.value = false
}


async function deleteConsultant(consultantId: number) {
    isProcessing.value = true
    try {
        const index = consultants.value.findIndex((v) => v.id == consultantId)

        if (index != -1) {
            const res = await ApiConsultant.deleteAccount(token!!, consultantId)
            consultants.value.splice(index, 1)
        }

    } catch (error) {
        console.log(error)
    }

    isProcessing.value = false
}



// ---------------------------- dialogs --------------------

let selectedConsultant: null | ConsultantAccount = null
const isApproveDialogVisible = ref(false)
const isRejectDialogVisible = ref(false)
const isDeleteDialogVisible = ref(false)
const isProcessing = ref(false)



// Accept dialog
function onAcceptDialog(isOk: boolean) {

    isApproveDialogVisible.value = false
    if (selectedConsultant == null) return
    if (isOk) {
        approve(selectedConsultant.id)
    }
}


function openAcceptDialog(consultant: ConsultantAccount) {
    selectedConsultant = consultant
    isApproveDialogVisible.value = true
}


// reject dialog

function onRejectDialog(isOk: boolean) {

    isRejectDialogVisible.value = false
    if (selectedConsultant == null) return
    if (isOk) {

        // delete the consultant account on reject
        deleteConsultant(selectedConsultant.id)
    }
}


function openRejectDialog(consultant: ConsultantAccount) {
    selectedConsultant = consultant
    isRejectDialogVisible.value = true
}



// delete dialog 
function onDeleteAccount(isOk: boolean) {
    isDeleteDialogVisible.value = false
    if (selectedConsultant == null) return
    if (isOk) {
        deleteConsultant(selectedConsultant.id)
    }
}

function openDeleteAccountDialog(consultant: ConsultantAccount) {
    selectedConsultant = consultant
    isDeleteDialogVisible.value = true
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
            <Profile :image="profile.image" :name="profile.name" role="Admin" />
        </div>

        <h2>Consultants</h2>
        <!-- <div class="search card">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
            </svg>
            <input type="text" placeholder="Search here">
        </div> -->

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
                                <button class="success" @click="openAcceptDialog(item)">Accept</button>
                            </td>
                            <td>
                                <button class="danger" @click="openRejectDialog(item)">Reject</button>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>



    </div>

    <DialogAccept :onCancel="() => onAcceptDialog(false)" :onOk="() => onAcceptDialog(true)"
        :is-visible="isApproveDialogVisible" button-name="Accept" title="Request Accept"
        message="Do you really want to accept this consultant?"></DialogAccept>
    <DialogAccept :onCancel="() => onRejectDialog(false)" :onOk="() => onRejectDialog(true)"
        :is-visible="isRejectDialogVisible" :is-danger="true" button-name="Reject" title="Request Reject"
        message="Do your really want to reject the new consultant?"></DialogAccept>

    <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>

    <DialogDelete :onDelete="() => onDeleteAccount(true)" :onCancel="() => onDeleteAccount(false)"
        :is-visible="isDeleteDialogVisible"
        message="Do you really want to remove the consultant account. This action will delete all leads, withdraw and account of the consultant. This action can't be undone.">
    </DialogDelete>
</template>
<style scoped>.panel {}</style>