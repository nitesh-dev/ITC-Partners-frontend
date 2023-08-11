<script setup lang='ts'>
import { WithdrawHistory } from '~/data/dataTypes';
import { tabs } from '~/data/admin'

import { dateTimeString, getToken } from '~/extra/utils'
import ApiWithdraw from '~/api/ApiWithdraw';
import ApiAdmin from '~/api/ApiAdmin';

const withdrawHistory = ref(Array<WithdrawHistory>())

let token: string | null = null

const profile = ref({
    image: '',
    name: ''
})

onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('admin/login')
    } else {
        getProfileDetail(token)
        loadHistory()
    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiAdmin.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        console.log(error)
        navigateTo('admin/login')
    }
}





// -------------------- request ---------------------

async function loadHistory() {
    try {
        const res = await ApiWithdraw.getAll(token!!)
        withdrawHistory.value = res

    } catch (error) {
        alert(error)
    }
}



async function approveAndReject(id: number, status: 'Accepted' | 'Rejected') {
    isProcessing.value = true
    try {
        const index = withdrawHistory.value.findIndex((v) => v.id == id)

        if (index != -1) {
            const res = await ApiWithdraw.updateStatus(token!!, id, status)
            withdrawHistory.value[index].status = status
        }

    } catch (error) {
        alert(error)
    }

    isProcessing.value = false
}







// ---------------------------- dialogs --------------------

let selectedWithdraw: null | WithdrawHistory = null
const isApproveDialogVisible = ref(false)
const isRejectDialogVisible = ref(false)
const dialogMessage = ref('')
const isProcessing = ref(false)


// Accept dialog
function onAcceptDialog(isOk: boolean) {

    isApproveDialogVisible.value = false
    if (selectedWithdraw == null) return
    if (isOk) {
        approveAndReject(selectedWithdraw.id, 'Accepted')
    }
}


function openAcceptDialog(withdraw: WithdrawHistory) {
    selectedWithdraw = withdraw
    dialogMessage.value = 'Have you paid the requested amount to ' + withdraw.first + '?. Note: do this only when you have paid!'
    isApproveDialogVisible.value = true
}


// reject dialog
function onRejectDialog(isOk: boolean) {
    isRejectDialogVisible.value = false
    if (selectedWithdraw == null) return
    if (isOk) {
        approveAndReject(selectedWithdraw.id, 'Rejected')
    }
}


function openRejectDialog(withdraw: WithdrawHistory) {
    selectedWithdraw = withdraw
    dialogMessage.value = 'Do you really want to reject the request amount of ' + withdraw.first + '?.'
    isRejectDialogVisible.value = true
}






// ------------ extra ----------------

function calculateWithdrawCountPercentage(name: string) {

    let count = 0
    withdrawHistory.value.forEach(item => {
        if (item.status == name) count++
    });

    // calculate percentage
    return Math.round(count / withdrawHistory.value.length * 100)
}

function calculateWithdrawCount(name: string) {

    let count = 0
    withdrawHistory.value.forEach(item => {
        if (item.status == name) count++
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
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>

         <!-- header -->
         <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Admin" />
        </div>

        <h2>Withdraw Requests</h2>

        <div class="reports">
            <div class="card">
                <p>Progress</p>
                <span>{{ calculateWithdrawCount('Progress') }}</span>
                <div class="progress" :style="{ 'width': calculateWithdrawCountPercentage('Progress') + '%' }"></div>
            </div>

            <div class="card">
                <p>Approved</p>
                <span>{{ calculateWithdrawCount('Accepted') }}</span>
                <div class="progress success" :style="{ 'width': calculateWithdrawCountPercentage('Accepted') + '%' }"></div>
            </div>

            <div class="card">
                <p>Rejects</p>
                <span>{{ calculateWithdrawCount('Rejected') }}</span>
                <div class="progress danger" :style="{ 'width': calculateWithdrawCountPercentage('Rejected') + '%' }"></div>
            </div>
        </div>

        <WidgetsTab :active-tab="activeTabIndex" :names="['Progress', 'Accepted', 'Rejected']"
            :onChange="event => onTabChange(event)">
        </WidgetsTab>

        <!-- Progress -->
        <div v-if="activeTabIndex == 0" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Withdraw Amount (₹)</th>
                        <th>Phone</th>
                        <th>Requested at</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in withdrawHistory">

                        <!-- TODO add condition to check offer expiry -->
                        <tr v-if="item.status == 'Progress'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>₹{{ item.amount }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                            <td><button @click="openAcceptDialog(item)" class="success">Pay & Accept</button></td>
                            <td><button @click="openRejectDialog(item)" class="danger">Reject</button></td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Accepted -->
        <div v-if="activeTabIndex == 1" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Withdraw Amount (₹)</th>
                        <th>Phone</th>
                        <th>Requested at</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in withdrawHistory">

                        <!-- TODO add condition to check offer expiry -->
                        <tr v-if="item.status == 'Accepted'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>₹{{ item.amount }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Rejected -->
        <div v-if="activeTabIndex == 2" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Withdraw Amount (₹)</th>
                        <th>Phone</th>
                        <th>Requested at</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in withdrawHistory">

                        <tr v-if="item.status == 'Rejected'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>₹{{ item.amount }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

    </div>

    <DialogAccept :onCancel="() => onAcceptDialog(false)" :onOk="() => onAcceptDialog(true)"
        :is-visible="isApproveDialogVisible" button-name="Pay & Accept" title="Request Accept" :message="dialogMessage">
    </DialogAccept>

    <DialogAccept :onCancel="() => onRejectDialog(false)" :onOk="() => onRejectDialog(true)"
        :is-visible="isRejectDialogVisible" :is-danger="true" button-name="Reject" title="Request Reject"
        :message="dialogMessage"></DialogAccept>
</template>
<style scoped>
a {}
</style>