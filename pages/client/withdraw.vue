<script setup lang='ts'>
import { WithdrawHistory } from '~/data/dataTypes';
import { tabs } from '~/data/client'

import { dateTimeString } from '~/extra/utils'
import { getToken } from '~/data/utils';
import ApiWithdraw from '~/api/ApiWithdraw';

const withdrawHistory = ref(Array<WithdrawHistory>())

let token = 'null'
onMounted(function () {
    token = getToken()
    loadHistory()

})




// -------------------- request ---------------------

async function loadHistory() {
    try {
        const res = await ApiWithdraw.getAll(token)
        withdrawHistory.value = res

    } catch (error) {
        alert(error)
    }
}








// ---------------------------- dialogs --------------------

const isApproveDialogVisible = ref(false)




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
        <Sidebar :active-tab="4" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Consultant" />
        </div>

        <h2>Withdraw</h2>
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
                    <template v-for="item, index in withdrawHistory">

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
</template>
<style scoped></style>