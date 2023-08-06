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


// withdraw history data
export const withdrawHistoryRaw: MyChartData = {
    labelH: 'Date',
    labelV: 'Withdraw (₹)',
    datasets: {
        labels: ['10/2/23', '11/2/23', '12/2/23', '13/2/23', '14/2/23', '15/2/23', '16/2/23'],
        data: [2000,6000,1000,3500,7000,4500,1000]
    }
} 

// net profit history data
export const profitHistoryRaw: MyChartData = {
    labelH: 'Date',
    labelV: 'Withdraw (₹)',
    datasets: {
        labels: ['Earning','Withdraw', 'commission'],
        data: [10000,3000, 5000]
    }
} 


// earning history data
export const leadsHistoryRaw: MyChartData = {
    labelH: 'Date',
    labelV: 'Leads count',
    datasets: {
        labels: ['10/2/23', '11/2/23', '12/2/23', '13/2/23', '14/2/23', '15/2/23', '16/2/23'],
        data: [50,10,30,100,5,78,53]
    }
} 