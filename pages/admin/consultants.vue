<script setup lang='ts'>
import { tabs } from '~/data/admin' 
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="1" :tab-data="tabs"></Sidebar>
    </div>
</template>
<style scoped>

</style>