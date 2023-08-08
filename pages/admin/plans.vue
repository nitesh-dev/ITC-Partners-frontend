<script setup lang='ts'>
import ApiCategory from '~/api/ApiCategory';
import { LoanCategory, LoanSubCategory } from 'data/dataTypes';
import { getToken } from '~/data/utils';
import { tabs } from '~/data/admin'

let token = 'null'

const categories = ref(Array<LoanCategory>())


onMounted(function () {
    token = getToken()
    loadData()
})




// -------------------- request ---------------------
async function loadData() {
    const res = await loadCategory()
    if(res) loadPlans()
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

    } catch (error) {
        console.log(error)
    }
}




// ----------------------- dialog ------------------

const isAddCategoryDialogVisible = ref(false)




// Accept dialog
function openAddCategoryDialog() {
    isAddCategoryDialogVisible.value = true
}


function onAddCategoryClose(isSuccess: boolean){
    isAddCategoryDialogVisible.value = false
    if(isSuccess) loadCategory()
}






const allPlans = ref(Array<LoanSubCategory>())

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
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Plans</h2>
        <button class="primary" @click="openAddCategoryDialog()">Add Category</button>
        <button class="secondary">Add Plan</button>
        <WidgetsTab :active-tab="activeTabIndex" :names="categories.map((item) => item.name)"
            :onChange="event => onTabChange(event)">
        </WidgetsTab>

        <template v-for="category, index in categories">
            <div v-if="activeTabIndex == index" class="tab-container plan">

                <template v-for="plan, index in allPlans">
                    <div class="card" v-if="plan.category_id == category.id">
                        <div class="title">
                            <img src="~/public/images/no_image.png">
                            <h3>{{ plan.name }}</h3>
                        </div>
                        <p>{{ plan.description }}</p>
                        <div class="price-container">
                            <div class="container">
                                <span class="price">₹{{ plan.price }}</span>
                            </div>
                            <button class="primary">Edit</button>
                        </div>
                    </div>
                </template>
            </div>
        </template>


    </div>

    <DialogAddCategory :is-visible="isAddCategoryDialogVisible" :onClose="onAddCategoryClose"></DialogAddCategory>
    <DialogAddPlan :is-visible="false" :data="allPlans[0]"></DialogAddPlan>
</template>
<style scoped>
.panel>button {
    display: inline-flex;
    margin-right: 0.5rem;
}
</style>