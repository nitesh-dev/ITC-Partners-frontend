<script setup lang='ts'>
import { LoanCategory, LoanSubCategory } from 'data/dataTypes';
import { tabs } from '~/data/admin'

const categories = ref(Array<LoanCategory>())
categories.value.push({
    id: '1',
    name: ' Insurance'
})

categories.value.push({
    id: '2',
    name: ' Loans'
})

categories.value.push({
    id: '3',
    name: ' Credit Cards'
})


const allPlans = ref(Array<LoanSubCategory>())
allPlans.value.push({
    id: '1',
    category_id: '1',
    name: 'sdasdf',
    price: 4555,
    discount: 0,
    description: 'jksdhf sdjfhjksdahf hsdfjkha sdfhjksdhf jshdfjkhsadfjkhsd dfjkfhsajkdfhjksad hfjkadshfjhd d',
    image: '',
    datetime: 0
})

allPlans.value.push({
    id: '2',
    category_id: '2',
    name: 'sdfas dsfaddf',
    price: 4555,
    discount: 0,
    description: 'jksdhf sdjfhjksdahf hsdfjkha sdfhjksdhf jshdfjkhsadfjkhsd dfjkfhsajkdfhjksad hfjkadshfjhd d',
    image: '',
    datetime: 0
})

allPlans.value.push({
    id: '3',
    category_id: '3',
    name: 'sdfa dafadf sdf',
    price: 4555,
    discount: 0,
    description: 'jksdhf sdjfhjksdahf hsdfjkha sdfhjksdhf jshdfjkhsadfjkhsd dfjkfhsajkdfhjksad hfjkadshfjhd d',
    image: '',
    datetime: 0
})

allPlans.value.push({
    id: '4',
    category_id: '1',
    name: 'sdfa d dsfadfafadf sdf',
    price: 4555,
    discount: 0,
    description: 'jksdhf sdjfhjksdahf hsdfjkha sdfhjksdhf jshdfjkhsadfjkhsd dfjkfhsajkdfhjksad hfjkadshfjhd d',
    image: '',
    datetime: 0
})

allPlans.value.push({
    id: '5',
    category_id: '3',
    name: 'sdfa dafadsfsdaf df sdf',
    price: 4555,
    discount: 0,
    description: 'jksdhf sdjfhjksdahf hsdfjkha sdfhjksdhf jshdfjkhsadfjkhsd dfjkfhsajkdfhjksad hfjkadshfjhd d',
    image: '',
    datetime: 0
})


const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}

</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="3" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Plans</h2>
        <button class="primary">Add Category</button>
        <button class="secondary">Add Plan</button>
        <WidgetsTab :active-tab="activeTabIndex" :names="categories.map((item) => item.name)"
            :onChange="event => onTabChange(event)">
        </WidgetsTab>

        <template v-for="category, index in categories">
            <div v-if="activeTabIndex == index" class="tab-container plan">

                <template v-for="plan, index in allPlans">
                    <div class="card" v-if="plan.category_id == category.id">
                        <div class="title">
                            <img src="~/public/images/no_image.png">
                            <h3>{{ plan.name }}</h3>
                        </div>
                        <p>{{ plan.description }}</p>
                        <div class="price-container">
                            <div class="container">
                                <span class="price">₹{{ plan.price }}</span>
                            </div>
                            <button class="primary">Edit</button>
                        </div>
                    </div>
                </template>
            </div>
        </template>


    </div>

    <DialogAddCategory :is-visible="false"></DialogAddCategory>
    <DialogAddPlan :is-visible="false" :data="allPlans[0]"></DialogAddPlan>
</template>
<style scoped>

.panel>button{
    display: inline-flex;
    margin-right: 0.5rem;
}
.plan {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.plan .card {
    width: 400px;
    min-height: 200px;
    padding: 1rem;
}

.plan .card .title {
    display: flex;
    gap: 1rem;
}

.plan .card img {
    width: 80px;
    height: 80px;
    border-radius: var(--normal-radius);
    object-fit: cover;
}

.plan .price-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.plan .price-container .container {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
}

.plan .price {
    font-size: 28px;
    color: var(--color-secondary);

}

.plan .discount {
    font-size: 28px;
    color: var(--color-on-surface-dark);
}
</style>