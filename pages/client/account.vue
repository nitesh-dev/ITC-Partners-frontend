<script setup lang='ts'>
import { tabs } from '~/data/client' 
import {earningHistoryRaw, withdrawHistoryRaw, profitHistoryRaw, leadsHistoryRaw} from '~/data/adminRawData'
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Consultant" />
        </div>

        <h2>Account</h2>
       

        

    </div>
</template>
<style scoped>


</style>