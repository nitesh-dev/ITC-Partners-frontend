<script setup lang='ts'>
defineProps({
    message: String,
    isVisible: Boolean,
})



</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card small">
           <div class="loader primary"></div>
           <span>{{ message }}</span>
        </div>
    </div>
</template>
<style scoped>


.dialog{
    width: 200px;
}

.dialog .loader{
    width: 32px;
    height: 32px;
    margin-bottom: 1rem;
}

.dialog span{
    font-size: var(--small-font);
    display: block;
    text-align: center;
    color: var(--color-on-surface);
}

</style>