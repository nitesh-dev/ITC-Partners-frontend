export interface MyChartData {
    labelH: string,
    labelV: string,
    datasets: {
        labels: string[],
        data: number[]
    }
}

export interface AdminAccount {
    id: number
    first: string,
    last: string,
    email: string,
    phone: number,
    city: string,
    address: string,
    pincode: number,
    gender: 'Male' | 'Female',
    created_at: number,
    dob: number,
    profile_url: string
}

export interface ConsultantAccount {
    id: number
    first: string,
    last: string,
    email: string,
    phone: number,
    address: string,
    referral_code: string,
    dob: number,
    city: string,
    pincode: number,
    gender: 'Male' | 'Female',
    is_approved: boolean,
    created_at: number,
    profile_url: string
}


export interface Lead {
    id: number;
    first: string;
    last: string;
    phone: number;
    address: string;
    dob: number;
    city: string;
    pincode: number;
    gender: "Male" | "Female";
    loan_amount: number;
    loan_name: string;
    purpose_of_loan: string;
    employer_status: string;
    monthly_income: number;
    consultant_commission_percentage: number;
    consultant_id: number;
    status: 'Pending' | 'Progress' | 'Approved' | 'Rejected';
    created_at: number;
}


export interface LoanCategory {
    id: number
    name: string,
    create_at: number
}

export interface LoanSubCategory {
    id: number
    category_id: number
    name: string,
    description: string,
    image_url: string,
    created_at: number
}

export interface Offer {
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

export interface Commission {
    id: number
    name: string,
    leads_count: number,
    commission_percentage: number,
    created_at: number
}

export interface WithdrawHistory {
    id: number
    consultant_id: number,
    amount: number,
    first: string,
    last: string,
    phone: number,
    status: 'Progress' | 'Rejected' | 'Accepted',
    created_at: number
}

export interface CommissionHistory {
    id: number
    consultant_id: number,
    source: 'Lead' | 'Refer',
    amount: number,
    created_at: number
}


export interface Referral {
    id: number,
    name: string,
    city: string,
    pincode: number,
    profile_url: string,
    earning: number,
    created_at: number
}





// -------------------------------

// consultant withdraw page data
export interface WithdrawPage {
    withdrawHistory: Array<WithdrawHistory>,
    commissionHistory: Array<CommissionHistory>
}


export interface ConsultantDashboard{
    earning: number,
    withdraw: number,
    leadsCount: number,
    referrals: number,
    earningHistory: Array<{ amount: number, source: string, created_at: number }>,
    withdrawHistory: Array<{amount: number, created_at: number}>,
    leadsHistory: Array<{created_at: number}>
}


export interface AdminDashboard {
    earning: number,
    withdraw: number,
    leadsCount: number,
    commission: number,
    consultants: number,
    earningHistory: Array<{ amount: number, created_at: number }>,
    withdrawHistory: Array<{ amount: number, created_at: number }>,
    leadsHistory: Array<{ created_at: number }>,
    consultantsHistory: Array<{ created_at: number }>,
}





// ----------------- cart data 


export interface LineChartDataProps{
    labels: Array<string>,
    datasets: Array<any>
}

export interface DoughnutChartDataProps{
    labels: Array<string>,
    datasets: Array<any>
}


