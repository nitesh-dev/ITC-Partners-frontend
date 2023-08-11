<script setup lang='ts'>
import { DoughnutChartDataProps } from '~/data/dataTypes'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement

} from 'chart.js'

import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Title, Tooltip, Legend)

defineProps<{
    myChartData: DoughnutChartDataProps
}>()

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false,
            }
        },
        y: {
            display: false,
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
        <Doughnut :options="chartOptions" :data="myChartData" />
    </div>
</template>
<style scoped>
.graph {
    min-height: 300px;
    padding: 8px;
}
</style>