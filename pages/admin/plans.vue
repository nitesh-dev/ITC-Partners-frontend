<script setup lang='ts'>
import { tabs } from '~/data/admin' 
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="3" :tab-data="tabs"></Sidebar>
    </div>
</template>
<style scoped>

</style>