import type { Contract, Invoice, User } from '../types';

export const MOCK_USER: User = {
    id: 'u1',
    name: 'Jane Doe',
    email: 'jane@acme-consulting.com',
    role: 'contractor',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=3b82f6&color=fff',
};

export const MOCK_CONTRACTS: Contract[] = [
    {
        id: 'c1',
        number: '23-10045',
        title: 'Modernization Phase 1',
        vendorName: 'Acme Consulting',
        status: 'active',
        startDate: '2023-07-01',
        endDate: '2025-06-30',
        totalAmount: 5000000,
        encumberedAmount: 2500000,
        burnRate: 45,
        fundingSources: [
            { type: 'APD', amount: 4000000, fy: '23/24' },
            { type: 'BCP', amount: 1000000, fy: '23/24' }
        ],
        keyActionDates: [
            { label: 'Project Kickoff', date: '2023-07-15', completed: true },
            { label: 'Requirements Sign-off', date: '2023-09-30', completed: true },
            { label: 'Prototype Demo', date: '2024-01-15', completed: false },
        ]
    },
    {
        id: 'c2',
        number: '22-09988',
        title: 'Legacy System Maintenance',
        vendorName: 'Acme Consulting',
        status: 'expired',
        startDate: '2022-01-01',
        endDate: '2023-12-31',
        totalAmount: 1500000,
        encumberedAmount: 1500000,
        burnRate: 100,
        fundingSources: [
            { type: 'SFL', amount: 1500000, fy: '22/23' }
        ],
        keyActionDates: []
    }
];

export const MOCK_INVOICES: Invoice[] = [
    {
        id: 'inv1',
        contractId: 'c1',
        number: 'INV-101',
        periodStart: '2023-11-01',
        periodEnd: '2023-11-30',
        submittedDate: '2023-12-05',
        status: 'approved',
        totalAmount: 125000,
        federalShare: 112500, // 90%
        items: [
            { id: 'li1', description: 'Senior Dev Hours', amount: 100000, ffp: 90 },
            { id: 'li2', description: 'PM Hours', amount: 25000, ffp: 50 }
        ],
        attachedFiles: ['Timesheets_Nov.pdf', 'Expense_Report.pdf']
    },
    {
        id: 'inv2',
        contractId: 'c1',
        number: 'INV-102',
        periodStart: '2023-12-01',
        periodEnd: '2023-12-31',
        status: 'draft',
        totalAmount: 0,
        federalShare: 0,
        items: [],
        attachedFiles: []
    }
];
