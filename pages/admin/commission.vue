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
                                <button class="primary">Edit</button>
                            </td>
                            <td>
                                <button class="danger">Delete</button>
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