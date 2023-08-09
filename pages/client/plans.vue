<script setup lang='ts'>
import { LoanCategory, LoanSubCategory } from 'data/dataTypes';
import { getToken } from '~/data/utils';
import { tabs } from '~/data/client'
import ApiCategory from '~/api/ApiCategory';
import ApiPlan from '~/api/ApiPlan';

const categories = ref(Array<LoanCategory>())
const allPlans = ref(Array<LoanSubCategory>())

let token = 'null'
onMounted(function () {
    token = getToken()
    loadData()
})




// -------------------- request ---------------------
async function loadData() {
    const res = await loadCategory()
    if (res) loadPlans()
}

async function loadCategory() {
    try {
        const res = await ApiCategory.getAll(token)
        categories.value = res
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

async function loadPlans() {
    try {

        // loading plans
        const res = await ApiPlan.getAll(token)
        allPlans.value = res

    } catch (error) {
        console.log(error)
    }
}



//  ------------------- dialog -----------------

const isLeadSubmitVisible = ref(false)
const selectedPlanName = ref('')

function onApply(planName: string){
    selectedPlanName.value = planName
    isLeadSubmitVisible.value = true
}

function onClose(isSuccess: boolean){
    isLeadSubmitVisible.value = false
}






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

        <template v-for="category, index in categories">
            <div v-if="activeTabIndex == index" class="tab-container plan">

                <template v-for="plan, index in allPlans">
                    <PlanCard :onApply="onApply" v-if="plan.category_id == category.id" :plan="plan" :is-admin="false">
                    </PlanCard>
                </template>
            </div>
        </template>

    </div>

    <DialogSubmitLead :onClose="onClose" :is-visible="isLeadSubmitVisible" :plan-name="selectedPlanName"></DialogSubmitLead>
</template>
<style scoped>
.tab-container{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

</style>