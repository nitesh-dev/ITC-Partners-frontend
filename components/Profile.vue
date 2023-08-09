<script setup lang='ts'>
defineProps<{
    name: string,
    role: string,
    image: string
}>()
</script>
<template>
    <div class="profile">
        <img :src="image">
        <div>
            <h4>{{ name }}</h4>
            <span>{{ role }}</span>
        </div>
    </div>
</template>
<style scoped>
.profile{
    border-radius: var(--normal-radius);
    background-color: var(--color-surface);
    min-width: 250px;
    height: 68px;
    width: max-content;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0 10px;
}

.profile img{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.profile h4{
    margin: 0;
    font-weight: normal;
}
.profile span{
    font-size: var(--small-font);
    color: var(--color-primary);
    font-weight: bold;
}

</style>