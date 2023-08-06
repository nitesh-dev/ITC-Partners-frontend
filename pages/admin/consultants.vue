<script setup lang='ts'>
import { tabs } from '~/data/admin' 

const consultants = ref(Array<string>())


</script>
<template>
    <div class="panel">
        
        <Sidebar :active-tab="1" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Consultants</h2>


    </div>
</template>
<style scoped>

</style>