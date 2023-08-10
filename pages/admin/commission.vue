<script setup lang='ts'>
import { Commission } from 'data/dataTypes';
import { tabs } from '~/data/admin'

import { dateTimeString, getToken } from '~/extra/utils'
import ApiCommission from '~/api/ApiCommission';
import ApiAdmin from '~/api/ApiAdmin';

const commissions = ref(Array<Commission>())

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
        loadCommission()
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

async function loadCommission() {
    try {
        const res = await ApiCommission.getAll(token!!)
        commissions.value = res

    } catch (error) {
        console.log(error)
    }
}






// ----------------------- dialog ------------------

const isCommissionDialogVisible = ref(false)
const isDialogModeCreate = ref(true)
const isDeleteDialogVisible = ref(false)
const isProcessing = ref(false)
const deleteDialogMessage = ref('')

const selectedCommission = ref<Commission | null>(null)




function openCommissionDialog(isCreate: boolean, selectedComm: Commission | null = null) {
    if (selectedComm == null) {
        selectedCommission.value = {
            id: 0,
            name: '',
            leads_count: NaN,
            commission_percentage: NaN,
            created_at: 0
        }
    } else {
        selectedCommission.value = {
            id: selectedComm.id,
            name: selectedComm.name,
            leads_count: selectedComm.leads_count,
            commission_percentage: selectedComm.commission_percentage,
            created_at: 0
        }
    }
    isDialogModeCreate.value = isCreate
    isCommissionDialogVisible.value = true
}


function onCommissionDialogClose(isSuccess: boolean) {
    isCommissionDialogVisible.value = false
    if (isSuccess) loadCommission()
}



let selectedCommissionToDelete: Commission | null = null

// delete dialog
function openCommissionDeleteDialog(id: number) {

    // finding plan
    const commission = commissions.value.find((item) => item.id == id)
    if (commission == undefined) return
    selectedCommissionToDelete = commission

    deleteDialogMessage.value = 'Do you really want to delete *' + commission.name + ' Commission* ?. This action can\'t be undone.'
    isDeleteDialogVisible.value = true

}

async function onCommissionDelete(isDelete: boolean) {
    isDeleteDialogVisible.value = false

    if (isDelete && selectedCommissionToDelete) {
        const index = commissions.value.findIndex((item) => item.id == selectedCommissionToDelete!!.id)
        if (index == -1) return

        isProcessing.value = true
        try {
            const res = ApiCommission.deletePlan(token!!, selectedCommissionToDelete.id)

            // remove the item from list
            commissions.value.splice(index, 1)
        } catch (error) {
            console.log(error)
        }
        isProcessing.value = false
    }

}



</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Admin" />
        </div>

        <h2>Commissions</h2>
        <button class="primary" @click="openCommissionDialog(true)">Add Commission</button>
        <div class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Leads Count</th>
                        <th>Commission (%)</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in commissions">

                        <tr>
                            <td><span class="chip pink">{{ item.name }}</span></td>
                            <td>{{ item.leads_count }}</td>
                            <td>{{ item.commission_percentage }}%</td>
                            <td>
                                <button class="primary" @click="openCommissionDialog(false, item)">Edit</button>
                            </td>
                            <td>
                                <button @click="openCommissionDeleteDialog(item.id)" class="danger">Delete</button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <DialogAddCommission :onClose="onCommissionDialogClose" :is-visible="isCommissionDialogVisible"
        :data="selectedCommission!!" :is-create="isDialogModeCreate">
    </DialogAddCommission>

    <DialogDelete :onDelete="() => onCommissionDelete(true)" :onCancel="() => onCommissionDelete(false)"
        :is-visible="isDeleteDialogVisible" :message="deleteDialogMessage">
    </DialogDelete>
</template>
<style scoped>
.tab-container {
    margin-top: 2rem;
}
</style>