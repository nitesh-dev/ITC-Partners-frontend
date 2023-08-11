<script setup lang='ts'>
import { WithdrawHistory, WithdrawPage } from '~/data/dataTypes';
import { tabs } from '~/data/client'

import { dateTimeString, getToken } from '~/extra/utils'

import ApiWithdraw from '~/api/ApiWithdraw';
import ApiConsultant from '~/api/ApiConsultant';

const withdrawData = ref<WithdrawPage>()

let token: string | null = null

const profile = ref({
    image: '',
    name: ''
})

onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('/')
    } else {
        getProfileDetail(token)
        loadHistory()
    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiConsultant.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        console.log(error)
        navigateTo('/')
    }
}





// -------------------- request ---------------------

async function loadHistory() {
    try {
        const response = await ApiWithdraw.getWithdrawPage(token!!)
        withdrawData.value = response

    } catch (error) {
        console.log(error)
        navigateTo('/')
    }
}








// ---------------------------- dialogs --------------------

const isWithdrawDialogVisible = ref(false)

function openWithdrawDialog() {
    isWithdrawDialogVisible.value = true
}

function onWithdrawClose(isSuccess: boolean) {
    isWithdrawDialogVisible.value = false
    if (isSuccess) loadHistory()
}



// ------------ extra ----------------

function calculateWithdrawCountPercentage(name: string) {

    let count = 0
    if (withdrawData.value == undefined) return 0

    withdrawData.value.withdrawHistory.forEach(item => {
        if (item.status == name) count++
    });

    // calculate percentage
    return Math.round(count / withdrawData.value.withdrawHistory.length * 100)
}

function calculateWithdrawCount(name: string) {
    if (withdrawData.value == undefined) return 0

    let count = 0
    withdrawData.value.withdrawHistory.forEach(item => {
        if (item.status == name) count++
    });

    return count
}


function calculateBalance() {

    if (withdrawData.value) {
        let withdrawAmount = 0
        withdrawData.value.withdrawHistory.forEach(element => {
            if (element.status == 'Accepted') {
                withdrawAmount += element.amount
            }
        });



        let commissionAmount = 0
        withdrawData.value.commissionHistory.forEach(element => {
            commissionAmount += element.amount
        });


        return commissionAmount - withdrawAmount
    }

    return 0
}

function calculateCommissionEarning() {
    if (withdrawData.value == undefined) return 0
    let commissionAmount = 0
    withdrawData.value.commissionHistory.forEach(element => {
        commissionAmount += element.amount
    });

    return commissionAmount
}

function calculateReferralEarning() {
    if (withdrawData.value == undefined) return 0
    let commissionAmount = 0
    withdrawData.value.commissionHistory.forEach(element => {
        if (element.source == 'Refer') {
            commissionAmount += element.amount
        }
    });

    return commissionAmount
}


function isInProgress() {
    if (withdrawData.value == undefined) return true

    withdrawData.value.withdrawHistory.forEach(element => {
        if (element.status == 'Progress') {
            return true
        }
    });

    return false
}


const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}



</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="4" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Consultant" />
        </div>

        <h2>Withdraw</h2>
        <div class="reports">
            <div class="card">
                <p>Balance</p>
                <span>₹{{ calculateBalance() }}</span>
            </div>

            <div class="card">
                <p>Commission Earning</p>
                <span>₹{{ calculateCommissionEarning() }}</span>
            </div>

            <div class="card">
                <p>Referral Earning</p>
                <span>₹{{ calculateReferralEarning() }}</span>
            </div>
        </div>

        <div class="reports">
            <div class="card">
                <p>Progress</p>
                <span>{{ calculateWithdrawCount('Progress') }}</span>
                <div class="progress" :style="{ 'width': calculateWithdrawCountPercentage('Progress') + '%' }"></div>
            </div>

            <div class="card">
                <p>Approved</p>
                <span>{{ calculateWithdrawCount('Accepted') }}</span>
                <div class="progress success" :style="{ 'width': calculateWithdrawCountPercentage('Accepted') + '%' }">
                </div>
            </div>

            <div class="card">
                <p>Rejects</p>
                <span>{{ calculateWithdrawCount('Rejected') }}</span>
                <div class="progress danger" :style="{ 'width': calculateWithdrawCountPercentage('Rejected') + '%' }"></div>
            </div>
        </div>

        <button v-if="!isInProgress()" class="primary" @click="openWithdrawDialog()">Send withdraw request</button>
        <p v-else>You can only request one request at a time, Please wait for the request to be approved.</p>

        <WidgetsTab :active-tab="activeTabIndex" :names="['Progress', 'Accepted', 'Rejected']" :onChange="onTabChange">
        </WidgetsTab>

        <!-- Progress -->
        <div v-if="activeTabIndex == 0" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Withdraw Amount (₹)</th>
                        <th>Requested at</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-if="withdrawData" v-for="item, index in withdrawData.withdrawHistory">

                        <!-- TODO add condition to check offer expiry -->
                        <tr v-if="item.status == 'Progress'">
                            <td>₹{{ item.amount }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
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
                        <th>Withdraw Amount (₹)</th>
                        <th>Requested at</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-if="withdrawData" v-for="item, index in withdrawData.withdrawHistory">

                        <!-- TODO add condition to check offer expiry -->
                        <tr v-if="item.status == 'Accepted'">
                            <td>₹{{ item.amount }}</td>
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
                        <th>Withdraw Amount (₹)</th>
                        <th>Requested at</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-if="withdrawData" v-for="item, index in withdrawData.withdrawHistory">

                        <tr v-if="item.status == 'Rejected'">
                            <td>₹{{ item.amount }}</td>
                            <td>{{ dateTimeString(item.created_at) }}</td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <DialogWithdrawRequest :balance="calculateBalance()" :is-visible="isWithdrawDialogVisible"
            :onClose="onWithdrawClose" />
    </div>
</template>
<style scoped></style>