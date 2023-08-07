<script setup lang='ts'>
import { tabs } from '~/data/client' 





const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}



</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="2" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Consultant" />
        </div>

        <h2>Leads</h2>
        <div class="reports">
            <div class="card">
                <p>Approved</p>
                <span>49</span>
                <div class="progress success"></div>
            </div>
            <div class="card">
                <p>Progress</p>
                <span>5</span>
                <div class="progress"></div>
            </div>
            <div class="card">
                <p>Pending</p>
                <span>3</span>
                <div class="progress neutral"></div>
            </div>
            <div class="card">
                <p>Rejects</p>
                <span>4</span>
                <div class="progress danger"></div>
            </div>
        </div>


        <WidgetsTab :active-tab="activeTabIndex" :names="['Pending', 'Progress', 'Approved', 'Rejected']"
            :onChange="event => onTabChange(event)" />


    </div>
</template>
<style scoped>





</style>