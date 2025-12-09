import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApplicationsList } from '../../utils/mockBackend';
import { PlusCircle, Search, Eye, Edit2, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const ProviderDashboard = () => {
    const { logout, user } = useAuth();
    const [myApps, setMyApps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [user]);

    const loadData = async () => {
        setIsLoading(true);
        // In real app, backend filters. Here we filter mock data.
        const allApps = await getApplicationsList();
        const providersApps = allApps.filter(a => a.providerId === user?.id);
        setMyApps(providersApps);
        setIsLoading(false);
    };

    const getStatusBadge = (status) => {
        let styles = 'bg-slate-100 text-slate-700';
        let icon = null;

        if (status === 'Enrollment Approved') {
            styles = 'bg-green-100 text-green-700 border border-green-200';
            icon = <CheckCircle className="w-3 h-3" />;
        } else if (status === 'Enrollment Rejected') {
            styles = 'bg-red-100 text-red-700 border border-red-200';
            icon = <AlertCircle className="w-3 h-3" />;
        } else if (status === 'In Validation') {
            styles = 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            icon = <Search className="w-3 h-3" />;
        }

        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${styles}`}>
                {icon}
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">My Applications</h1>
                        <p className="text-sm text-slate-500">Manage your enrollment applications</p>
                    </div>
                    <button onClick={logout} className="text-slate-600 hover:text-slate-900 text-sm font-medium">
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="container py-8">
                <div className="flex flex-col gap-6">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 text-white shadow-lg flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold mb-2" style={{ color: 'white' }}>Welcome, {user?.email}</h2>
                            <p className="text-slate-300" style={{ color: 'white' }}>Track the status of your enrollment applications here.</p>
                        </div>
                        <Link to="/provider/enrollment" className="btn bg-sky-500 hover:bg-sky-600 text-white border-0 shadow-lg flex items-center gap-2">
                            <PlusCircle className="w-5 h-5" /> Start New Application
                        </Link>
                    </div>

                    {/* Application List */}
                    <div className="card p-0 overflow-hidden border-0 shadow-md">
                        <div className="p-4 border-b bg-white flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">My Enrollments</h3>
                        </div>

                        {isLoading ? (
                            <div className="p-8 text-center text-slate-500">Loading your applications...</div>
                        ) : myApps.length === 0 ? (
                            <div className="p-12 text-center">
                                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <h4 className="text-lg font-medium text-slate-700">No applications yet</h4>
                                <p className="text-slate-500 mb-6">Get started by creating your first enrollment application.</p>
                                <Link to="/provider/enrollment" className="btn btn-outline">
                                    Start Application
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500 font-medium">
                                        <tr>
                                            <th className="px-6 py-4">NPI / ID</th>
                                            <th className="px-6 py-4">Business Name</th>
                                            <th className="px-6 py-4">Submission Date</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {myApps.map(app => (
                                            <tr key={app.npi} className="hover:bg-slate-50/50">
                                                <td className="px-6 py-4 font-mono text-slate-600">{app.npi}</td>
                                                <td className="px-6 py-4 font-medium text-slate-900">{app.profile?.businessName || 'N/A'}</td>
                                                <td className="px-6 py-4 text-slate-500">{new Date(app.updatedAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(app.status)}
                                                    {app.status === 'Enrollment Rejected' && app.adminNotes && (
                                                        <p className="text-xs text-red-600 mt-1 max-w-[200px] truncate" title={app.adminNotes}>
                                                            Reason: {app.adminNotes}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {app.status === 'Draft' ? (
                                                        <Link
                                                            to={`/provider/enrollment?mode=edit&npi=${app.npi}`}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-indigo-200 text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors text-xs font-medium"
                                                        >
                                                            <Edit2 className="w-3 h-3" /> Edit
                                                        </Link>
                                                    ) : app.status === 'Enrollment Rejected' ? (
                                                        <Link
                                                            to={`/provider/enrollment?mode=edit&npi=${app.npi}`}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-sky-200 text-sky-700 bg-sky-50 rounded-md hover:bg-sky-100 transition-colors text-xs font-medium"
                                                        >
                                                            <Edit2 className="w-3 h-3" /> Resubmit
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            to={`/provider/enrollment?mode=view&npi=${app.npi}`}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 transition-colors text-xs font-medium"
                                                        >
                                                            <Eye className="w-3 h-3" /> View
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProviderDashboard;
