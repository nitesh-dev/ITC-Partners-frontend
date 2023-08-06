<script setup lang='ts'>
import { MyChartData } from '~/data/dataTypes'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement

} from 'chart.js'

import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Title, Tooltip, Legend)

const props = defineProps<{
    myChartData: MyChartData,
    backgroundColors: string[]
}>()

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                display: false,
            }

        }
    },
    plugins: {
        tooltip: {
            enabled: true, // Enable tooltips
            intersect: false, // To show tooltips on all elements
        },
        legend: {
            display: false,
        }
    },


}


const chartData = {
    labels: props.myChartData.datasets.labels,
    datasets: [{
        data: props.myChartData.datasets.data,
        backgroundColor: props.backgroundColors,
    }]
}


</script>
<template>
    <div class="graph">
        <Doughnut :options="chartOptions" :data="chartData" />
    </div>
</template>
<style scoped>
.graph {
    min-height: 300px;
    padding: 8px;
}
</style>