export type UserRole = 'contractor' | 'state_admin' | 'manager';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export type ContractStatus = 'draft' | 'active' | 'expired' | 'terminated' | 'on_hold';

export interface FundingSource {
    type: 'BCP' | 'APD' | 'TBL' | 'SFL' | 'Other';
    amount: number;
    fy: string;
}

export interface Contract {
    id: string;
    number: string;
    title: string;
    vendorName: string;
    status: ContractStatus;
    startDate: string;
    endDate: string;
    totalAmount: number;
    encumberedAmount: number;
    fundingSources: FundingSource[];
    burnRate: number; // percentage
    keyActionDates: { label: string; date: string; completed: boolean }[];
}

export type InvoiceStatus = 'draft' | 'submitted' | 'approved' | 'denied' | 'disputed';

export interface InvoiceLineItem {
    id: string;
    description: string;
    amount: number;
    ffp: 50 | 75 | 90 | 100;
}

export interface Invoice {
    id: string;
    contractId: string;
    number: string;
    periodStart: string;
    periodEnd: string;
    submittedDate?: string;
    status: InvoiceStatus;
    totalAmount: number;
    federalShare: number;
    items: InvoiceLineItem[];
    attachedFiles: string[]; // names of files
}
