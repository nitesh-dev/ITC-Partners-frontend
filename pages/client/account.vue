<script setup lang='ts'>
import { tabs } from '~/data/client' 
import {earningHistoryRaw, withdrawHistoryRaw, profitHistoryRaw, leadsHistoryRaw} from '~/data/adminRawData'
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Consultant" />
        </div>

        <h2>Dashboard</h2>
        <div class="reports">
            <div class="card">
                <p>Total Earning</p>
                <span>₹100,500</span>
            </div>
            <div class="card">
                <p>Total Withdraw</p>
                <span>₹100,500</span>
                <div class="progress secondary"></div>
            </div>
            <div class="card">
                <p>Total Referrals</p>
                <span>10</span>
            </div>
            <div class="card">
                <p>Total Leads Submitted</p>
                <span>49</span>
            </div>
        </div>


        <!-- statistics -->
        <h3>Statistics</h3>
        <div class="statistics">
            <!-- 1 -->
            <div class="card">
                <p class="title">Earning history</p>
                <hr>
                <LineChart borderColor="#1665D8" backgroundColor="#EAEEF5" :myChartData="earningHistoryRaw"/>
            </div>

            <!-- 2 -->
            <div class="card">
                <p class="title">Withdraw history</p>
                <hr>
                <LineChart borderColor="#d33396" backgroundColor="#f5e6ef" :myChartData="withdrawHistoryRaw"/>
            </div>

            <!-- 3 -->
            <div class="card">
                <p class="title">Leads history</p>
                <hr>
                <LineChart borderColor="#2BC48A" backgroundColor="#EFFAF1" :myChartData="leadsHistoryRaw"/>
            </div>

        </div>

        

    </div>
</template>
<style scoped>



/* -------------------- statistics --------------- */

.panel .statistics{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.panel .statistics .title{
    margin: 1em;
}

.panel .statistics .card{
    width: 500px;
}

.panel .statistics hr{
    border: none;
    border-bottom: 2px solid var(--color-surface-variant);
}



</style>