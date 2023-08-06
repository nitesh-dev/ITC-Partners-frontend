<script setup lang='ts'>

import { tabs } from '~/data/admin'


const consultants = ref(Array<string>())

function onTabChange(index: number){
    alert(index)
}


</script>
<template>
    <div class="panel">

        <Sidebar :active-tab="1" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Consultants</h2>
        <div class="search card">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
            </svg>
            <input type="text" placeholder="Search here">
        </div>

        <WidgetsTab :active-tab="0" :names="['Consultants', 'New consultants']" :onChange="event => onTabChange(event)"/>

        <!-- <table>
            <thead>
                <td>
                    <td></td>
                </td>
            </thead>
        </table> -->



    </div>
</template>
<style scoped>
.panel .search {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    max-width: 800px;
    width: 100%;
    fill: var(--color-on-surface);
    gap: 1rem;
}

.panel .search svg{
    fill: inherit;
}

.panel .search input{
    height: 100%;
    border: none;
    width: 100%;
    outline: none;
    color: var(--color-on-surface-dark);
}

</style>