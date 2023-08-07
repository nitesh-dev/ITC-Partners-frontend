<script setup lang='ts'>
import { WithdrawHistory, WithdrawStatus } from '~/data/dataTypes';
import { tabs } from '~/data/admin'

import { dateTimeString } from '~/extra/utils'

const withdrawHistory = ref(Array<WithdrawHistory>())
withdrawHistory.value.push({
    id: 'dsfadf',
    consultant_id: '45ds4d',
    amount: 1000,
    datetime: 0,
    first: 'Nitesh',
    last: 'Kumar',
    phone: 54564564,
    status: WithdrawStatus.Progress
})

withdrawHistory.value.push({
    id: 'dsfadf',
    consultant_id: '45ds4d',
    amount: 1000,
    datetime: 0,
    first: 'Nitesh',
    last: 'Kumar',
    phone: 54564564,
    status: WithdrawStatus.Progress
})

withdrawHistory.value.push({
    id: 'dsfadf',
    consultant_id: '45ds4d',
    amount: 1000,
    datetime: 0,
    first: 'Nitesh',
    last: 'Kumar',
    phone: 54564564,
    status: WithdrawStatus.Progress
})

withdrawHistory.value.push({
    id: 'dsfadf',
    consultant_id: '45ds4d',
    amount: 1000,
    datetime: 0,
    first: 'Nitesh',
    last: 'Kumar',
    phone: 54564564,
    status: WithdrawStatus.Accepted
})

withdrawHistory.value.push({
    id: 'dsfadf',
    consultant_id: '45ds4d',
    amount: 105500,
    datetime: 0,
    first: 'Niddtesh',
    last: 'Kumar',
    phone: 54564564,
    status: WithdrawStatus.Rejected
})


const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}


</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="6" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Withdraw Requests</h2>
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
                        <tr v-if="item.status == WithdrawStatus.Progress">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>₹{{ item.amount }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
                            <td><button class="success">Accept</button></td>
                            <td><button class="danger">Reject</button></td>
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
                        <tr v-if="item.status == WithdrawStatus.Accepted">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>₹{{ item.amount }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
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

                        <!-- TODO add condition to check offer expiry -->
                        <tr v-if="item.status == WithdrawStatus.Rejected">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>₹{{ item.amount }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

    </div>
</template>
<style scoped>
a {}
</style>