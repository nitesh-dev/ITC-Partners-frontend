<script setup lang='ts'>
import { LoanSubCategory } from 'data/dataTypes';
defineProps<{
    isVisible: Boolean
}>()

const emit = defineEmits<{
    (event: 'cancel'): void
    (event: 'choose'): void
}>()

function onCancel() {
    emit('cancel')
}

function onChoose() {
    emit('choose')
}


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

const selectedPlan = ref(-1)

function onPlanSelect(index: number) {
    selectedPlan.value = index
}

</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card">
            <h4>Choose Plan</h4>

            <div class="content">
                <table>
                    <tbody>
                        <tr class="spacer">
                            <td></td>
                        </tr>
                        <template v-for="item, index in allPlans">
                            <tr :class="{ 'active primary': selectedPlan == index }" @click="onPlanSelect(index)">
                                <td>{{ item.name }}</td>
                                <td>₹{{ item.price }}</td>
                            </tr>
                        </template>

                    </tbody>
                </table>
            </div>
            <div class="buttons-holder">
                <button class="primary outline" @click="onCancel()">Cancel</button>
                <button class="primary" @click="onChoose()">Choose</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.dialog-holder {
    z-index: 7;
    cursor: pointer;
}

.content{
    max-height: 400px;
    overflow: auto;
}
</style>