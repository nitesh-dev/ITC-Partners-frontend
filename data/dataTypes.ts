export interface MyChartData {
    labelH: string,
    labelV: string,
    datasets: {
        labels: string[],
        data: number[]
    }
}

export interface AdminAccount{
    id: string,
    first: string,
    last: string,
    phone: number,
    address: string,
    pincode: string,
    gender: string,
    image: string,
    datetime: number,
    dob: number
}

export interface ConsultantAccount{
    id: string,
    first: string,
    last: string,
    phone: number,
    address: string,
    referral_code: string,
    pincode: string,
    gender: string,
    is_approved: boolean,
    image: string,
    datetime: number,
    dob: number
}


export interface Lead{
    id: string,
    first: string,
    last: string,
    phone: number,
    address: string,
    dob: number,
    city: string,
    pincode: string,
    gender: string,
    purpose_of_loan: string,
    employer_status: string,
    monthly_income: string,
    consultant_id: string,
    status: LeadStatus,
    datetime: number
}

export enum LeadStatus{
    Pending,
    Progress,
    Approved,
    Rejected
}

export interface LoanCategory{
    id: string,
    name: string
}

export interface LoanSubCategory{
    id: string,
    category_id: string,
    name: string,
    price: number,
    discount: number,
    description: string,
    image: string,
    datetime: number
}

export interface Offer{
    id: string,
    category_id: string,
    name: string,
    price: number,
    discount: number,
    description: string,
    image: string,
    start_datetime: number,
    end_datetime: number,
    label: string
}

export interface Commission{
    id: string,
    name: string,
    leads_count: number,
    commission_percentage: number
}

export interface WithdrawHistory{
    id: string,
    consultant_id: string,
    amount: number,
    datetime: number,
    first: string,
    last: string,
    phone: number,
    status: WithdrawStatus,
}

export enum WithdrawStatus{
    Progress,
    Accepted,
    Rejected
}
