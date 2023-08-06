<script setup lang='ts'>
const props = defineProps<{
    activeTab: number,
    names: string[]
}>()

const emit = defineEmits<{
    (event: 'change', id: number): void
}>()


function changeTab(index: number) {
    emit('change', index)
}

</script>
<template>
    <div class="tabs card">
        <div @click="changeTab(index)" class="tab" v-for="item, index in names" :class="{ 'active': index == activeTab }">{{
            item }}</div>
    </div>
</template>
<style scoped>
.tabs {
    display: flex;
    margin: 2rem 0;
    width: 100%;
    max-width: 800px;
}

.tabs .tab {
    height: 100%;
    border-bottom: 4px solid white;
    padding: 1rem;
    min-width: 100px;
    text-align: center;
    color: var(--color-on-surface-dark);
    cursor: context-menu;
}

.tabs .tab.active {
    border-color: var(--color-secondary);
    color: var(--color-secondary);
}
</style>