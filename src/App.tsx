import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './lib/store';
import { AppLayout } from './layouts/AppLayout';
import { ContractorDashboard } from './modules/Dashboard/ContractorDashboard';
import { ContractList } from './modules/Contracts/ContractList';
import { InvoiceList } from './modules/Invoices/InvoiceList';
import { InvoiceEntry } from './modules/Invoices/InvoiceEntry';

// Placeholder for Settings
const Settings = () => (
  <div className="text-center p-20">
    <h2 className="text-2xl font-bold text-white">Settings</h2>
    <p className="text-slate-400 mt-2">Configuration options coming soon.</p>
  </div>
);

function App() {
  return (
    <React.StrictMode>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<ContractorDashboard />} />
              <Route path="contracts" element={<ContractList />} />
              <Route path="invoices" element={<InvoiceList />} />
              <Route path="invoices/new" element={<InvoiceEntry />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </React.StrictMode>
  );
}

export default App;
