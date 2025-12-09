import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, DollarSign, Settings, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useAppStore } from '../lib/store';
import clsx from 'clsx';

const SidebarItem = ({ icon: Icon, label, to, active }: { icon: any, label: string, to: string, active: boolean }) => (
    <Link
        to={to}
        className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            active
                ? "bg-accent text-white shadow-lg shadow-blue-500/30"
                : "text-gray-400 hover:bg-slate-800 hover:text-white"
        )}
    >
        <Icon size={20} className={clsx("transition-transform group-hover:scale-110", active && "scale-110")} />
        <span className="font-medium tracking-wide">{label}</span>
        {active && <ChevronRight size={16} className="ml-auto opacity-70" />}
    </Link>
);

export const AppLayout = () => {
    const { user } = useAppStore();
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
        { icon: FileText, label: 'Contracts', to: '/contracts' },
        { icon: DollarSign, label: 'Invoices', to: '/invoices' },
        { icon: Settings, label: 'Settings', to: '/settings' },
    ];

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col relative z-20">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-white text-lg">i</span>
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Smart CLM
                        </h1>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <SidebarItem
                                key={item.to}
                                {...item}
                                active={location.pathname === item.to}
                            />
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/50">
                        <img
                            src={user.avatar}
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-slate-700"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-slate-200">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{user.role}</p>
                        </div>
                        <LogOut size={16} className="text-slate-500 hover:text-red-400 transition-colors" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-full h-96 bg-indigo-900/10 blur-[100px] pointer-events-none" />

                {/* Topbar */}
                <header className="h-16 px-8 flex items-center justify-between border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="text-lg font-semibold text-slate-200">
                        {navItems.find(i => i.to === location.pathname)?.label || 'Overview'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-8 relative z-0">
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};
