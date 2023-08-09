<script setup lang='ts'>
import { LoanCategory, LoanSubCategory } from 'data/dataTypes';
import { tabs } from '~/data/client'
import ApiCategory from '~/api/ApiCategory';
import ApiPlan from '~/api/ApiPlan';
import { getToken } from '~/extra/utils';
import ApiConsultant from '~/api/ApiConsultant';

const categories = ref(Array<LoanCategory>())
const allPlans = ref(Array<LoanSubCategory>())


let token: string | null = null

const profile = ref({
    image: '',
    name: ''
})

onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        window.location.href = '/'
    } else {
        getProfileDetail(token)
        loadData()
    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiConsultant.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        console.log(error)
        window.location.href = '/'
    }
}




// -------------------- request ---------------------
async function loadData() {
    const res = await loadCategory()
    if (res) loadPlans()
}

async function loadCategory() {
    try {
        const res = await ApiCategory.getAll(token!!)
        categories.value = res
        return true
    } catch (error) {
        console.log(error)
        window.location.href = '/'
        return false
    }
}

async function loadPlans() {
    try {
        // loading plans
        const res = await ApiPlan.getAll(token!!)
        allPlans.value = res

    } catch (error) {
        console.log(error)
        window.location.href = '/'
    }
}



//  ------------------- dialog -----------------

const isLeadSubmitVisible = ref(false)
const selectedPlanName = ref('')

function onApply(planName: string) {
    selectedPlanName.value = planName
    isLeadSubmitVisible.value = true
}

function onClose(isSuccess: boolean) {
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
            <Profile :image="profile.image" :name="profile.name" role="Consultant" />
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
.tab-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>