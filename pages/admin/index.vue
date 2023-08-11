<script setup lang='ts'>

import { getToken } from '~/extra/utils';
import { tabs } from '~/data/admin'
import { earningHistoryRaw, withdrawHistoryRaw, profitHistoryRaw, leadsHistoryRaw } from '~/data/adminRawData'
import ApiAdmin from '~/api/ApiAdmin';
import { AdminDashboard, DoughnutChartDataProps, LineChartDataProps } from 'data/dataTypes';
import ApiOther from '~/api/ApiOther';

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
        getDashboardData(token)
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



const dashboard = ref<AdminDashboard>({
    earning: 0,
    withdraw: 0,
    leadsCount: 0,
    commission: 0,
    consultants: 0,
    earningHistory: [],
    withdrawHistory: [],
    leadsHistory: [],
    consultantsHistory: []
})


const earningHistoryData = ref<LineChartDataProps>()
const withdrawHistoryData = ref<LineChartDataProps>()
const leadsHistoryData = ref<LineChartDataProps>()
const consultantHistoryData = ref<LineChartDataProps>()
const netProfitHistoryData = ref<DoughnutChartDataProps>()

async function getDashboardData(token: string) {
    try {
        const res = await ApiOther.getAdminDashboard(token)
        dashboard.value = res

        earningChartData()
        withdrawChartData()
        leadsChartData()
        netProfitChartData()
        consultantChartData()

    } catch (error) {
        console.log(error)
        navigateTo('/')
    }
}




function earningChartData() {

    // Convert UNIX timestamp to JavaScript Date
    const data = dashboard.value.earningHistory.map(item => ({
        ...item,
        created_at: new Date(item.created_at).setHours(0, 0, 0, 0)
    }));

    // Calculate start time for the last 14 days
    const lastFourteenDays = 14 * 24 * 60 * 60 * 1000; // milliseconds
    const startTime = new Date(Date.now() - lastFourteenDays).setHours(0, 0, 0, 0)
    const now = new Date().setHours(0, 0, 0, 0)

    const values = Array<number>()
    const labels = Array<string>()

    for (let i = startTime; i <= now; i += 24 * 60 * 60 * 1000) {
        let amount = 0
        data.forEach(element => {
            if (element.created_at == i) {
                amount += element.amount
            }
        });

        labels.push(new Date(i).toDateString())
        values.push(amount)

    }

    const prop = [{
        label: 'Earning (₹) ',
        data: values,
        borderColor: "#1665D8",
        backgroundColor: "#EAEEF5",
        borderWidth: 3,
        cubicInterpolationMode: 'monotone',
        fill: true,
        pointRadius: 0
    }]

    earningHistoryData.value = {
        datasets: prop,
        labels: labels
    }

}



function withdrawChartData() {

    // Convert UNIX timestamp to JavaScript Date
    const data = dashboard.value.withdrawHistory.map(item => ({
        ...item,
        created_at: new Date(item.created_at).setHours(0, 0, 0, 0)
    }));

    // Calculate start time for the last 14 days
    const lastFourteenDays = 14 * 24 * 60 * 60 * 1000; // milliseconds
    const startTime = new Date(Date.now() - lastFourteenDays).setHours(0, 0, 0, 0)
    const now = new Date().setHours(0, 0, 0, 0)

    const values = Array<number>()
    const labels = Array<string>()

    for (let i = startTime; i <= now; i += 24 * 60 * 60 * 1000) {
        let amount = 0
        data.forEach(element => {
            if (element.created_at == i) {
                amount += element.amount
            }
        });

        labels.push(new Date(i).toDateString())
        values.push(amount)

    }

    const prop = [{
        label: 'Withdraw (₹) ',
        data: values,
        borderColor: "#d33396",
        backgroundColor: "#f5e6ef",
        borderWidth: 3,
        cubicInterpolationMode: 'monotone',
        fill: true,
        pointRadius: 0
    }]

    withdrawHistoryData.value = {
        datasets: prop,
        labels: labels
    }

}


function leadsChartData() {

    // Convert UNIX timestamp to JavaScript Date
    const data = dashboard.value.leadsHistory.map(item => ({
        ...item,
        created_at: new Date(item.created_at).setHours(0, 0, 0, 0)
    }));

    // Calculate start time for the last 14 days
    const lastFourteenDays = 14 * 24 * 60 * 60 * 1000; // milliseconds
    const startTime = new Date(Date.now() - lastFourteenDays).setHours(0, 0, 0, 0)
    const now = new Date().setHours(0, 0, 0, 0)

    const values = Array<number>()
    const labels = Array<string>()

    for (let i = startTime; i <= now; i += 24 * 60 * 60 * 1000) {
        let amount = 0
        data.forEach(element => {
            if (element.created_at == i) {
                amount += 1
            }
        });

        labels.push(new Date(i).toDateString())
        values.push(amount)

    }

    const prop = [{
        label: 'Leads Submitted ',
        data: values,
        borderColor: "#2BC48A",
        backgroundColor: "#EFFAF1",
        borderWidth: 3,
        cubicInterpolationMode: 'monotone',
        fill: true,
        pointRadius: 0
    }]

    leadsHistoryData.value = {
        datasets: prop,
        labels: labels
    }

}


function consultantChartData() {

    // Convert UNIX timestamp to JavaScript Date
    const data = dashboard.value.consultantsHistory.map(item => ({
        ...item,
        created_at: new Date(item.created_at).setHours(0, 0, 0, 0)
    }));

    // Calculate start time for the last 14 days
    const lastFourteenDays = 14 * 24 * 60 * 60 * 1000; // milliseconds
    const startTime = new Date(Date.now() - lastFourteenDays).setHours(0, 0, 0, 0)
    const now = new Date().setHours(0, 0, 0, 0)

    const values = Array<number>()
    const labels = Array<string>()

    for (let i = startTime; i <= now; i += 24 * 60 * 60 * 1000) {
        let amount = 0
        data.forEach(element => {
            if (element.created_at == i) {
                amount += 1
            }
        });

        labels.push(new Date(i).toDateString())
        values.push(amount)

    }

    const prop = [{
        label: 'Consultants Joined ',
        data: values,
        borderColor: "#F6AB2F",
        backgroundColor: "#f8f2e9",
        borderWidth: 3,
        cubicInterpolationMode: 'monotone',
        fill: true,
        pointRadius: 0
    }]

    consultantHistoryData.value = {
        datasets: prop,
        labels: labels
    }

}


function netProfitChartData() {

    netProfitHistoryData.value = {
        datasets: [{
            data: [dashboard.value.earning, dashboard.value.withdraw, dashboard.value.commission],
            backgroundColor: ['#1665D8', '#d33396', '#F6AB2F'],
        }],
        labels: ['Earning (₹)', 'Withdraw (₹)', 'commission (₹)']
    }

}




</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="0" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Admin" />
        </div>

        <h2>Dashboard</h2>
        <div class="reports">
            <div class="card">
                <p>Total Earning</p>
                <span>₹{{ dashboard.earning }}</span>
                <div class="progress secondary"></div>
            </div>
            <div class="card">
                <p>Total Withdraw</p>
                <span>₹{{ dashboard.withdraw }}</span>
                <div class="progress neutral"></div>
            </div>
            <div class="card">
                <p>Total Profits</p>
                <span>₹{{ dashboard.earning - dashboard.commission }}</span>
                <div class="progress success"></div>
            </div>
            <div class="card">
                <p>Total Commission</p>
                <span>₹{{ dashboard.commission }}</span>
            </div>
            <div class="card">
                <p>Total Consultants</p>
                <span>{{ dashboard.consultants }}</span>
            </div>
            <div class="card">
                <p>Total Leads</p>
                <span>{{ dashboard.leadsCount }}</span>
            </div>
        </div>


        <!-- statistics -->
        <h3>Statistics</h3>
        <div class="statistics">
            <!-- 1 -->
            <div class="card">
                <p class="title">Earning history</p>
                <hr>
                <LineChart v-if="earningHistoryData" :myChartData="earningHistoryData" />
            </div>

            <!-- 2 -->
            <div class="card">
                <p class="title">Withdraw accepted history</p>
                <hr>
                <LineChart v-if="withdrawHistoryData" :myChartData="withdrawHistoryData" />
            </div>

            <!-- 3 -->
            <div class="card">
                <p class="title">Net profit history</p>
                <hr>
                <DoughnutChart v-if="netProfitHistoryData" :myChartData="netProfitHistoryData" />
            </div>

            <!-- 4 -->
            <div class="card">
                <p class="title">Leads submit history</p>
                <hr>
                <LineChart v-if="leadsHistoryData" :myChartData="leadsHistoryData" />
            </div>

            <!-- 5 -->
            <div class="card">
                <p class="title">Consultants join history</p>
                <hr>
                <LineChart v-if="consultantHistoryData" :myChartData="consultantHistoryData" />
            </div>

        </div>



    </div>
</template>
<style scoped>
/* -------------------- statistics --------------- */

.panel .statistics {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.panel .statistics .title {
    margin: 1em;
}

.panel .statistics .card {
    width: 500px;
}

.panel .statistics hr {
    border: none;
    border-bottom: 2px solid var(--color-surface-variant);
}
</style>