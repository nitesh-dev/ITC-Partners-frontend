<script setup lang='ts'>
import { tabs } from '~/data/admin' 
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>
    </div>
</template>
<style scoped>
.panel {
    width: 100%;
    min-height: 100vh;
    background-color: var(--color-surface-variant);
}
</style>