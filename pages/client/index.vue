<script setup lang='ts'>
import { tabs } from '~/data/client'
import ApiConsultant from '~/api/ApiConsultant';
import { getToken } from '~/extra/utils';
import ApiOther from '~/api/ApiOther';
import { ConsultantDashboard, LineChartDataProps, MyChartData } from 'data/dataTypes';

const isLoaded = ref(false)
const profile = ref({
    image: '',
    name: ''
})

onMounted(() => {
    const token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('/')
    } else {
        getProfileDetail(token)
        getDashboardData(token)

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


const dashboard = ref<ConsultantDashboard>({
    earning: 0,
    withdraw: 0,
    leadsCount: 0,
    referrals: 0,
    earningHistory: [],
    withdrawHistory: [],
    leadsHistory: []
})


const earningHistoryData = ref<LineChartDataProps>()
const withdrawHistoryData = ref<LineChartDataProps>()
const leadsHistoryData = ref<LineChartDataProps>()

async function getDashboardData(token: string) {
    try {
        const res = await ApiOther.getConsultantDashboard(token)
        dashboard.value = res
        isLoaded.value = true

        earningChartData()
        withdrawChartData()
        leadsChartData()

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

function calculateWithdrawPercentage() {

    // calculate percentage
    return Math.round(dashboard.value.withdraw / dashboard.value.earning * 100)
}


</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="0" :tab-data="tabs"></Sidebar>

        <template v-if="isLoaded">
            <!-- header -->
            <div class="header">
                <Profile :image="profile.image" :name="profile.name" role="Consultant" />
            </div>

            <h2>Dashboard</h2>
            <div class="reports">
                <div class="card">
                    <p>Total Earning</p>
                    <span>₹{{ dashboard.earning.toLocaleString() }}</span>
                </div>
                <div class="card">
                    <p>Total Withdraw</p>
                    <span>₹{{ dashboard.withdraw.toLocaleString() }}</span>
                    <div class="progress secondary" :style="{ 'width': calculateWithdrawPercentage() + '%' }"></div>
                </div>
                <div class="card">
                    <p>Total Referrals</p>
                    <span>{{ dashboard.referrals }}</span>
                </div>
                <div class="card">
                    <p>Total Leads Submitted</p>
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
                    <p class="title">Withdraw history</p>
                    <hr>
                    <LineChart v-if="withdrawHistoryData" :myChartData="withdrawHistoryData" />
                </div>

                <!-- 3 -->
                <div class="card">
                    <p class="title">Leads history</p>
                    <hr>
                    <LineChart v-if="leadsHistoryData" :myChartData="leadsHistoryData" />
                </div>

            </div>
        </template>

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