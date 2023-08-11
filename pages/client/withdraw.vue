<script setup lang='ts'>
import { WithdrawHistory, WithdrawPage } from '~/data/dataTypes';
import { tabs } from '~/data/client'

import { dateTimeString, getToken } from '~/extra/utils'

import ApiWithdraw from '~/api/ApiWithdraw';
import ApiConsultant from '~/api/ApiConsultant';

const withdrawPage = ref<WithdrawPage>()

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
        const res = await ApiWithdraw.getWithdrawPage(token!!)
        console.log(res)
        withdrawPage.value = res

    } catch (error) {
        console.log(error)
        navigateTo('/')
    }
}








// ---------------------------- dialogs --------------------





// ------------ extra ----------------

function calculateWithdrawCountPercentage(name: string) {

    let count = 0
    if (withdrawPage.value == undefined) return 0

    withdrawPage.value.withdrawHistory.forEach(item => {
        if (item.status == name) count++
    });

    // calculate percentage
    return Math.round(count / withdrawPage.value.withdrawHistory.length * 100)
}

function calculateWithdrawCount(name: string) {
    if (withdrawPage.value == undefined) return 0

    let count = 0
    withdrawPage.value.withdrawHistory.forEach(item => {
        if (item.status == name) count++
    });

    return count
}


function calculateBalance() {

    if (withdrawPage.value) {
        let withdrawAmount = 0
        withdrawPage.value.withdrawHistory.forEach(element => {
            if (element.status = 'Accepted') {
                withdrawAmount += element.amount
            }
        });

        

        let commissionAmount = 0
        withdrawPage.value.commissionHistory.forEach(element => {
            commissionAmount += element.amount
        });

        console.log(commissionAmount)

        return commissionAmount - withdrawAmount
    }

    return 0
}

function calculateCommissionEarning() {
    if (withdrawPage.value == undefined) return 0
    let commissionAmount = 0
    withdrawPage.value.commissionHistory.forEach(element => {
        commissionAmount += element.amount
    });

    return commissionAmount
}

function calculateReferralEarning() {
    if (withdrawPage.value == undefined) return 0
    let commissionAmount = 0
    withdrawPage.value.commissionHistory.forEach(element => {
        if (element.source == 'Refer') {
            commissionAmount += element.amount
        }
    });

    return commissionAmount
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
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-if="withdrawPage" v-for="item, index in withdrawPage.withdrawHistory">

                        <!-- TODO add condition to check offer expiry -->
                        <tr v-if="item.status == 'Progress'">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>₹{{ item.amount }}</td>
                            <td>{{ item.phone }}</td>
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
                    <template v-if="withdrawPage" v-for="item, index in withdrawPage.withdrawHistory">

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
                    <template v-if="withdrawPage" v-for="item, index in withdrawPage.withdrawHistory">

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
</template>
<style scoped></style>