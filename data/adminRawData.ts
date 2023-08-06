import { MyChartData } from '~/data/dataTypes'

// earning history data
export const earningHistoryRaw: MyChartData = {
    labelH: 'Date',
    labelV: 'Earning (₹)',
    datasets: {
        labels: ['10/2/23', '11/2/23', '12/2/23', '13/2/23', '14/2/23', '15/2/23', '16/2/23'],
        data: [4000,5000,2000,1000,4000,7000,5000]
    }
} 