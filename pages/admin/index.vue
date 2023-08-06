<script setup lang='ts'>
import { tabs } from '~/data/admin' 
import {earningHistoryRaw, withdrawHistoryRaw, profitHistoryRaw, leadsHistoryRaw} from '~/data/adminRawData'
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="0" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
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
            </div>
            <div class="card">
                <p>Total Profits</p>
                <span>₹100,500</span>
            </div>
            <div class="card">
                <p>Total Consultants</p>
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
                <p class="title">Net profit history</p>
                <hr>
                <DoughnutChart  :backgroundColors="['#1665D8','#d33396', '#F6AB2F']" :myChartData="profitHistoryRaw"/>
            </div>

            <!-- 4 -->
            <div class="card">
                <p class="title">Leads history</p>
                <hr>
                <LineChart borderColor="#2BC48A" backgroundColor="#EFFAF1" :myChartData="leadsHistoryRaw"/>
            </div>

        </div>

    </div>
</template>
<style scoped>

.card{
    background-color: var(--color-surface);
    border-radius: var(--normal-radius);
}
.panel {
    overflow: auto;
    padding-left: 3rem;
    padding-right: 1rem;
}

.panel .header {
    margin: 2rem 0;
    display: flex;
    justify-content: flex-end;
}


/* ------------------- reports -------------------*/
.panel>.reports{
    margin-top: 2rem;
    margin-bottom: 3rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

}

.panel>.reports .card{
    height: 100px;
    width: 260px;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.panel>.reports p{
    font-size: var(--small-font);
    margin: 0;
    margin-bottom: 0.5em;
}

.panel>.reports span{
    font-size: var(--average-2-font);
    color: var(--color-primary);
}




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