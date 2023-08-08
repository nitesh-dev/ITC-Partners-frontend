<script setup lang='ts'>
import { LoanSubCategory } from 'data/dataTypes';

defineProps<{
    plan: LoanSubCategory,
    isAdmin: boolean
}>()

const emit = defineEmits<{
  (event: 'delete', id: number): void
  (event: 'apply', id: number): void
}>()


</script>
<template>
    <div class="plan card">
        <!-- <p class="banner">Mega offer 30% off</p> -->
        <img src="../public/images/finance_loan.jpg">

        <div class="content">
            <h2>{{ plan.name }}</h2>
            <p>{{ plan.description }}</p>

            <button v-if="isAdmin" class="danger" @click="emit('delete', plan.id)">Delete</button>
            <button v-else class="primary" @click="emit('apply', plan.id)">Apply now</button>
        </div>
    </div>
</template>
<style scoped>

.col-2{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}
.plan {
    width: 300px;
    min-height: 400px;
    position: relative;
    overflow: auto;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-bottom: 1rem;
}

.plan .banner {
    width: max-content;
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--color-secondary);
    margin: 0;
    color: white;
    font-size: var(--small-font);
    padding: 0.5em 1em;
    border-top-left-radius: var(--medium-radius);
}


.plan img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: var(--medium-radius) var(--medium-radius) 0 0;
}

.plan .content {
    padding: 1rem;
}

.plan h2 {
    margin-top: 0;
    text-align: center;
    color: var(--color-secondary);
}

.plan .content p {
    text-align: center;
    color: var(--color-on-surface-dark);
    opacity: 0.8;
}


.plan button {
    display: block;
    width: 100%;
}
</style>