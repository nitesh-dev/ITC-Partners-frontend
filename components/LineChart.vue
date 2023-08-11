<script setup lang='ts'>
import { LineChartDataProps, MyChartData } from '~/data/dataTypes'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Filler
} from 'chart.js'

import { Bar, Line } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, LineController, LineElement, PointElement, Filler, Title, Tooltip, Legend)

defineProps<{
    myChartData: LineChartDataProps
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



</script>
<template>
    <div class="graph">
        <Line :options="chartOptions" :data="myChartData" />
    </div>
</template>
<style scoped>
.graph {
    min-height: 300px;
    padding: 8px;
}
</style>