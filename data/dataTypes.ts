export interface MyChartData {
    labelH: string,
    labelV: string,
    datasets: {
        labels: string[],
        data: number[]
    }
}

export interface AdminAccount{
    id: number
    first: string,
    last: string,
    phone: number,
    address: string,
    pincode: string,
    gender: string,
    datetime: number,
    dob: number,
    profile_url: string
}

export interface ConsultantAccount{
    id: number
    first: string,
    last: string,
    email: string,
    phone: number,
    address: string,
    referral_code: string,
    dob: number,
    city: string,
    pincode: string,
    gender: Gender,
    is_approved: boolean,
    created_at: number,
    profile_url: string
}


export interface Lead{
    id: number
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
    consultant_id: number
    status: LeadStatus,
    datetime: number
}

export enum LeadStatus{
    Pending,
    Progress,
    Approved,
    Rejected
}


export enum Gender{
    Male,
    Female
}

export interface LoanCategory{
    id: number
    name: string
}

export interface LoanSubCategory{
    id: number
    category_id: number
    name: string,
    price: number,
    discount: number,
    description: string,
    image: string,
    datetime: number
}

export interface Offer{
    id: number
    category_id: number
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
    id: number
    name: string,
    leads_count: number,
    commission_percentage: number
}

export interface WithdrawHistory{
    id: number
    consultant_id: number
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
