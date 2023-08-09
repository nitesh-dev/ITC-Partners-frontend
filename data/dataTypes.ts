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
    email: string,
    phone: string,
    city: string,
    address: string,
    pincode: string,
    gender: 'Male' | 'Female',
    created_at: number,
    dob: number,
    profile_url: string
}

export interface ConsultantAccount{
    id: number
    first: string,
    last: string,
    email: string,
    phone: string,
    address: string,
    referral_code: string,
    dob: number,
    city: string,
    pincode: string,
    gender: 'Male' | 'Female',
    is_approved: boolean,
    created_at: number,
    profile_url: string
}


export interface Lead{
    id: number;
    first: string;
    last: string;
    phone: string;
    address: string;
    dob: number;
    city: string;
    pincode: string;
    gender: "Male"|"Female";
    loan_amount: number;
    loan_name: string;
    purpose_of_loan: string;
    employer_status: string;
    monthly_income: number;
    consultant_commission_percentage: number;
    consultant_id: number;
    status: 'Pending'| 'Progress'| 'Approved'| 'Rejected';
    created_at: number;
}


export interface LoanCategory{
    id: number
    name: string,
    create_at: number
}

export interface LoanSubCategory{
    id: number
    category_id: number
    name: string,
    description: string,
    image_url: string,
    created_at: number
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
    commission_percentage: number,
    created_at: number
}

export interface WithdrawHistory{
    id: number
    consultant_id: number,
    amount: number,
    first: string,
    last: string,
    phone: number,
    status: 'Progress' | 'Accepted' | 'Rejected',
    created_at: number
}

