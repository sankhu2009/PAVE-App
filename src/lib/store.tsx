import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Contract, Invoice, User } from '../types';
import { MOCK_CONTRACTS, MOCK_INVOICES, MOCK_USER } from './mockData';

interface AppState {
    user: User;
    contracts: Contract[];
    invoices: Invoice[];
    addInvoice: (invoice: Invoice) => void;
    updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user] = useState<User>(MOCK_USER);
    const [contracts] = useState<Contract[]>(MOCK_CONTRACTS);
    const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);

    // Load from local storage or fallback to mock
    useEffect(() => {
        // In a real app, we'd load here. For now, we trust the state init.
        // We could add localStorage sync here later.
    }, []);

    const addInvoice = (invoice: Invoice) => {
        setInvoices(prev => [...prev, invoice]);
    };

    const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
        setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
    };

    return (
        <AppContext.Provider value={{ user, contracts, invoices, addInvoice, updateInvoiceStatus }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppStore = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppStore must be used within an AppProvider');
    }
    return context;
};
