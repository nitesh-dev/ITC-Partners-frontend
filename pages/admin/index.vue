<script setup lang='ts'>
const tabs = Array<{ name: string, url: string }>()
tabs.push({
    name: 'Dashboard',
    url: '/admin'
}) 
tabs.push({
    name: 'Consultants',
    url: '/admin/consultants'
}) 
tabs.push({
    name: 'Leads',
    url: '/admin/leads'
}) 
tabs.push({
    name: 'Plans',
    url: '/admin/plans'
}) 
tabs.push({
    name: 'Commission',
    url: '/admin/commission'
}) 
tabs.push({
    name: 'Withdraw',
    url: '/admin/withdraw'
}) 
tabs.push({
    name: 'Account',
    url: '/admin/account'
}) 
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="0" :tab-data="tabs"></Sidebar>
    </div>
</template>
<style scoped>
.panel {
    width: 100%;
    min-height: 100vh;
    background-color: var(--color-surface-variant);
}
</style>