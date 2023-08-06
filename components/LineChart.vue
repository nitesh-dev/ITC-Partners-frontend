<script setup lang='ts'>
import { MyChartData } from '~/data/dataTypes'
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

ChartJS.defaults.color = '#red';
const props = defineProps<{
    myChartData: MyChartData,
    borderColor: string,
    backgroundColor: string
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
        label: props.myChartData.labelV,
        data: props.myChartData.datasets.data,
        borderColor: props.borderColor,
        backgroundColor: props.backgroundColor,
        borderWidth: 3,
        cubicInterpolationMode: 'monotone',
        fill:true,
        pointRadius: 0
    }]
}


</script>
<template>
    <div class="graph">
        <Line :options="chartOptions" :data="chartData" />
    </div>
</template>
<style scoped>
.graph {
    min-height: 300px;
    padding: 8px;
}
</style>