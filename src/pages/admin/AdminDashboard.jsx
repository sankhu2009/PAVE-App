import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getApplicationsList } from '../../utils/mockBackend';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter } from 'lucide-react';

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const data = await getApplicationsList();
        setApplications(data);
        setIsLoading(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'In Validation': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                            A
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Admin Portal</h1>
                            <p className="text-xs text-slate-500">PAVE Enrollment Validation</p>
                        </div>
                    </div>
                    <button onClick={logout} className="text-slate-600 hover:text-slate-900 font-medium">
                        Logout
                    </button>
                </div>
            </header>

            <main className="container py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Enrollment Applications</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input type="text" placeholder="Search NPI or Name..." className="pl-10 py-2 border rounded-md text-sm" />
                        </div>
                        <button className="btn btn-outline flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="card overflow-hidden p-0 border-0 shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">NPI</th>
                                    <th className="px-6 py-4">Provider Name</th>
                                    <th className="px-6 py-4">Tax ID (FEIN/SSN)</th>
                                    <th className="px-6 py-4">Submission Date</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading applications...</td></tr>
                                ) : applications.length === 0 ? (
                                    <tr><td colSpan="6" className="p-8 text-center text-slate-500">No applications found.</td></tr>
                                ) : (
                                    applications.map((app) => (
                                        <tr key={app.npi} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-slate-600">{app.npi}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {app.profile?.firstName} {app.profile?.lastName}
                                                {app.profile?.businessName && <div className="text-xs text-slate-500">{app.profile.businessName}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {app.profile?.taxScope === 'Sole Proprietor' ? `SSN: ${app.profile?.ssn}` : `FEIN: ${app.profile?.fein}`}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(app.updatedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/admin/review/${app.npi}`} className="text-sky-600 hover:text-sky-800 font-medium hover:underline">
                                                    Review
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
