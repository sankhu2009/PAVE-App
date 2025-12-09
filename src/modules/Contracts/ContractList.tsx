import { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { Search, Filter, Calendar, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import type { ContractStatus } from '../../types';

const StatusBadge = ({ status }: { status: ContractStatus }) => {
    const styles = {
        active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        expired: 'bg-red-500/10 text-red-400 border-red-500/20',
        terminated: 'bg-red-500/10 text-red-400 border-red-500/20',
        on_hold: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };

    return (
        <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize", styles[status])}>
            {status.replace('_', ' ')}
        </span>
    );
};

export const ContractList = () => {
    const { contracts } = useAppStore();
    const [filter, setFilter] = useState<string>('all');
    const [search, setSearch] = useState('');

    const filteredContracts = contracts.filter(c => {
        const matchesStatus = filter === 'all' || c.status === filter;
        const matchesSearch = c.number.toLowerCase().includes(search.toLowerCase()) ||
            c.title.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Contracts</h1>
                    <p className="text-slate-400 mt-2">Manage your active and past contracts.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                        <ExternalLink size={18} />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search contracts..."
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
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Contract Number</th>
                                <th className="px-6 py-4 font-medium">Title</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Duration</th>
                                <th className="px-6 py-4 font-medium text-right">Total Amount</th>
                                <th className="px-6 py-4 font-medium text-right">Burn Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredContracts.map((contract) => (
                                <tr key={contract.id} className="hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                    <td className="px-6 py-4 font-medium text-white group-hover:text-blue-400 transition-colors">{contract.number}</td>
                                    <td className="px-6 py-4 text-slate-300">{contract.title}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={contract.status} />
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-300">
                                        ${(contract.totalAmount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={clsx("h-full rounded-full", contract.burnRate > 80 ? 'bg-red-500' : 'bg-blue-500')}
                                                    style={{ width: `${contract.burnRate}%` }}
                                                />
                                            </div>
                                            <span className="text-slate-400 w-8">{contract.burnRate}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredContracts.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No contracts found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
};
