<script setup lang='ts'>
import { LoanCategory } from 'data/dataTypes';
import { tabs } from '~/data/client'

const categories = ref(Array<LoanCategory>())
categories.value.push({
    id: '1',
    name: ' Insurance'
})

categories.value.push({
    id: '2',
    name: ' Loans'
})

categories.value.push({
    id: '3',
    name: ' Credit Cards'
})


const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}


</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="1" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Consultant" />
        </div>

        <h2>Offers & Plans</h2>
        <WidgetsTab :active-tab="activeTabIndex" :names="categories.map((item) => item.name)"
            :onChange="event => onTabChange(event)">
        </WidgetsTab>

        <!-- 1 -->
        <div v-if="activeTabIndex == 0" class="tab-container">
            <PlanCard v-for="item in 6"></PlanCard>
        </div>

        <!-- 1 -->
        <div v-if="activeTabIndex == 1" class="tab-container">
            <PlanCard v-for="item in 4"></PlanCard>
        </div>

        <!-- 1 -->
        <div v-if="activeTabIndex == 2" class="tab-container">
            <PlanCard v-for="item in 3"></PlanCard>
        </div>




    </div>
</template>
<style scoped>
.tab-container{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

</style>