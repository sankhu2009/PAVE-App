import { useAppStore } from '../../lib/store';
import { DollarSign, FileText, AlertCircle, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

const StatCard = ({ title, value, subtext, icon: Icon, color }: { title: string, value: string, subtext: string, icon: any, color: string }) => (
    <div className="glass-card p-6 relative overflow-hidden group">
        <div className={clsx("absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity", color)}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg", color)}>
                <Icon className="text-white" size={24} />
            </div>
            <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
            <p className="text-slate-500 text-sm mt-2">{subtext}</p>
        </div>
    </div>
);

const BurnChart = ({ data }: { data: any[] }) => (
    <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export const ContractorDashboard = () => {
    const { contracts, invoices } = useAppStore();

    const activeContracts = contracts.filter(c => c.status === 'active');
    const totalValue = activeContracts.reduce((sum, c) => sum + c.totalAmount, 0);
    const pendingInvoices = invoices.filter(i => i.status === 'submitted').length;

    // Create mock burn data based on active contracts
    const burnData = [
        { name: 'Jul', value: 4000 },
        { name: 'Aug', value: 3000 },
        { name: 'Sep', value: 2000 },
        { name: 'Oct', value: 2780 },
        { name: 'Nov', value: 1890 },
        { name: 'Dec', value: 2390 },
        { name: 'Jan', value: 3490 },
    ];

    const upcomingActions = activeContracts
        .flatMap(c => c.keyActionDates.filter(d => !d.completed).map(d => ({ ...d, contract: c.number })))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, Jane</h1>
                <p className="text-slate-400 mt-2">Here's what's happening with your contracts today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Contracts"
                    value={activeContracts.length.toString()}
                    subtext="2 expiring soon"
                    icon={FileText}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Total Value"
                    value={`$${(totalValue / 1000000).toFixed(1)}M`}
                    subtext="across all active contracts"
                    icon={DollarSign}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Pending Invoices"
                    value={pendingInvoices.toString()}
                    subtext="awaiting approval"
                    icon={AlertCircle}
                    color="bg-amber-500"
                />
                <StatCard
                    title="Avg Burn Rate"
                    value="45%"
                    subtext="+5% from last month"
                    icon={TrendingDown}
                    color="bg-purple-500"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Burn Chart Section */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Contract Burn Rate</h3>
                        <select className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500">
                            <option>All Contracts</option>
                            {activeContracts.map(c => <option key={c.id}>{c.number}</option>)}
                        </select>
                    </div>
                    <BurnChart data={burnData} />
                </div>

                {/* Action Items Section */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Action Items</h3>
                    <div className="space-y-4">
                        {upcomingActions.map((action, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                                <div className="w-2 h-2 mt-2 rounded-full bg-red-400 shrink-0 animate-pulse" />
                                <div>
                                    <h4 className="text-sm font-medium text-slate-200">{action.label}</h4>
                                    <p className="text-xs text-slate-500 mt-1">Due {new Date(action.date).toLocaleDateString()}</p>
                                    <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                        {action.contract}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {upcomingActions.length === 0 && (
                            <p className="text-sm text-slate-500">No pending actions.</p>
                        )}

                        <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            View all actions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
