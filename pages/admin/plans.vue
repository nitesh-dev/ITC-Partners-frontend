<script setup lang='ts'>
import ApiCategory from '~/api/ApiCategory';
import { LoanCategory, LoanSubCategory } from 'data/dataTypes';
import { tabs } from '~/data/admin'
import ApiPlan from '~/api/ApiPlan';
import { getToken } from '~/extra/utils';
import ApiAdmin from '~/api/ApiAdmin';



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
        navigateTo('/admin/login')
    } else {
        getProfileDetail(token)
        loadData()
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
        return false
    }
}

async function loadPlans() {
    try {

        // loading plans
        const res = await ApiPlan.getAll(token!!)
        allPlans.value = res
        console.log(allPlans)

    } catch (error) {
        console.log(error)
    }
}




// ----------------------- dialog ------------------

const isAddCategoryDialogVisible = ref(false)
const isAddPlanDialogVisible = ref(false)
const isDeleteDialogVisible = ref(false)
const isProcessing = ref(false)
const deleteDialogMessage = ref('')
let selectedPlanToDelete: LoanSubCategory | null = null





function openAddCategoryDialog() {
    isAddCategoryDialogVisible.value = true
}


function onAddCategoryClose(isSuccess: boolean) {
    isAddCategoryDialogVisible.value = false
    if (isSuccess) loadCategory()
}





// plan delete dialog
function openPlanDeleteDialog(planId: number) {

    // finding plan
    const plan = allPlans.value.find((item) => item.id == planId)
    if (plan == undefined) return
    selectedPlanToDelete = plan

    deleteDialogMessage.value = 'Do you really want to delete *' + plan.name + ' Plan* ?. This action can\'t be undone.'
    isDeleteDialogVisible.value = true

}

async function onPlanDelete(isDelete: boolean) {
    isDeleteDialogVisible.value = false

    if (isDelete && selectedPlanToDelete) {
        const index = allPlans.value.findIndex((item) => item.id == selectedPlanToDelete!!.id)
        if (index == -1) return

        isProcessing.value = true
        try {
            const res = ApiPlan.deletePlan(token!!, selectedPlanToDelete.id)

            // remove the plan from list
            allPlans.value.splice(index, 1)
        } catch (error) {
            console.log(error)
        }
        isProcessing.value = false
    }

}


// add plan dialog

function openAddPlanDialog() {
    isAddPlanDialogVisible.value = true
}

function onAddPlanDialogClose(isSuccess: boolean) {
    if (isSuccess) loadPlans()
    isAddPlanDialogVisible.value = false
}






const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}

</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="3" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Admin" />
        </div>

        <h2>Plans</h2>
        <button class="primary" @click="openAddCategoryDialog()">Add Category</button>
        <button class="secondary" @click="openAddPlanDialog()">Add Plan</button>
        <WidgetsTab :active-tab="activeTabIndex" :names="categories.map((item) => item.name)"
            :onChange="event => onTabChange(event)">
        </WidgetsTab>

        <template v-for="category, index in categories">
            <div v-if="activeTabIndex == index" class="tab-container plan">

                <template v-for="plan, index in allPlans">
                    <PlanCard v-if="plan.category_id == category.id" :plan="plan" :is-admin="true"
                        :onDelete="openPlanDeleteDialog">
                    </PlanCard>
                </template>
            </div>
        </template>


    </div>

    <DialogAddCategory :is-visible="isAddCategoryDialogVisible" :onClose="onAddCategoryClose"></DialogAddCategory>
    <DialogAddPlan v-if="categories[activeTabIndex] != undefined" :onClose="onAddPlanDialogClose"
        :is-visible="isAddPlanDialogVisible" :category-id="categories[activeTabIndex].id"></DialogAddPlan>

    <DialogProcess :is-visible="isProcessing" message="processing"></DialogProcess>

    <DialogDelete :onDelete="() => onPlanDelete(true)" :onCancel="() => onPlanDelete(false)"
        :is-visible="isDeleteDialogVisible" :message="deleteDialogMessage">
    </DialogDelete>
</template>
<style scoped>
.panel>button {
    display: inline-flex;
    margin-right: 0.5rem;
}

.tab-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>