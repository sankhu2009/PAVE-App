import { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { Search, Filter, Plus, Download } from 'lucide-react';
import clsx from 'clsx';
import type { InvoiceStatus } from '../../types';
import { Link } from 'react-router-dom';

const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
    const styles = {
        draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        submitted: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        denied: 'bg-red-500/10 text-red-400 border-red-500/20',
        disputed: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };

    return (
        <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize", styles[status])}>
            {status}
        </span>
    );
};

export const InvoiceList = () => {
    const { invoices, contracts } = useAppStore();
    const [filter, setFilter] = useState<string>('all');
    const [search, setSearch] = useState('');

    const filteredInvoices = invoices.filter(inv => {
        const matchesStatus = filter === 'all' || inv.status === filter;
        const matchesSearch = inv.number.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getContractNumber = (id: string) => contracts.find(c => c.id === id)?.number || 'Unknown';

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Invoices</h1>
                    <p className="text-slate-400 mt-2">Create and track your invoice submissions.</p>
                </div>
                <Link to="/invoices/new" className="btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    <span>New Invoice</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search invoices..."
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-slate-400" />
                    <select
                        className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="draft">Draft</option>
                        <option value="submitted">Submitted</option>
                        <option value="approved">Approved</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Invoice #</th>
                                <th className="px-6 py-4 font-medium">Contract</th>
                                <th className="px-6 py-4 font-medium">Period</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Total Amount</th>
                                <th className="px-6 py-4 font-medium text-right">Federal Share</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-white">{inv.number}</td>
                                    <td className="px-6 py-4 text-slate-300">{getContractNumber(inv.contractId)}</td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {new Date(inv.periodStart).toLocaleDateString()} - {new Date(inv.periodEnd).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={inv.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-300 font-medium">
                                        ${inv.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-400">
                                        ${inv.federalShare.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredInvoices.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No invoices found.
                    </div>
                )}
            </div>
        </div>
    );
};
