<script setup lang='ts'>
import { Commission } from 'data/dataTypes';
import { tabs } from '~/data/admin'

import { dateTimeString } from '~/extra/utils'

const commissions = ref(Array<Commission>())
commissions.value.push({
    id: '1',
    name: 'Bronze',
    leads_count: 10,
    commission_percentage: 2
})

commissions.value.push({
    id: '2',
    name: 'Silver',
    leads_count: 20,
    commission_percentage: 3
})

commissions.value.push({
    id: '3',
    name: 'Gold',
    leads_count: 40,
    commission_percentage: 4
})



</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Commissions</h2>
        <button class="primary">Add Commission</button>
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

                        <!-- TODO add condition to check offer expiry -->
                        <tr>
                            <td><span class="chip pink">{{ item.name }}</span></td>
                            <td>{{ item.leads_count }}</td>
                            <td>{{ item.commission_percentage }}%</td>
                            <td>
                                <svg class="normal" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" />
                                </svg>
                            </td>
                            <td>
                                <svg class="danger" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>
    </div>

    <DialogAddCommission :is-visible="false" :is-update="false" :data="commissions[0]"></DialogAddCommission>
</template>
<style scoped>
.tab-container {
    margin-top: 2rem;
}
</style>