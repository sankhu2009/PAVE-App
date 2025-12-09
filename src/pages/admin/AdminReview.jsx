import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplication, updateApplicationStatus } from '../../utils/mockBackend';
import { ArrowLeft, CheckCircle, XCircle, File, Download } from 'lucide-react';

const AdminReview = () => {
    const { npi } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [actionNote, setActionNote] = useState('');

    useEffect(() => {
        const load = async () => {
            const data = await getApplication(npi);
            setApp(data);
            setIsLoading(false);
        };
        load();
    }, [npi]);

    const handleAction = async (status) => {
        if (!window.confirm(`Are you sure you want to ${status} this application?`)) return;

        await updateApplicationStatus(npi, status, actionNote);
        alert(`Application ${status} successfully.`);
        navigate('/admin');
    };

    if (isLoading) return <div className="p-8 text-center">Loading application details...</div>;
    if (!app) return <div className="p-8 text-center">Application not found.</div>;

    const Section = ({ title, data }) => (
        <div className="card mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">{title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {Object.entries(data || {}).map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) return null; // Skip nested if any
                    return (
                        <div key={key}>
                            <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium text-slate-900 break-words">{String(value)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <header className="bg-white border-b shadow-sm sticky top-0 z-10 px-6 py-4 flex items-center gap-4">
                <button onClick={() => navigate('/admin')} className="p-2 hover:bg-slate-100 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Application Review</h1>
                    <p className="text-sm text-slate-500">NPI: {app.npi} | Status: <span className="font-semibold text-blue-600">{app.status}</span></p>
                </div>
            </header>

            <main className="container max-w-5xl mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Info */}
                    <div className="lg:col-span-2">
                        <Section title="User & Business Profile" data={{
                            ...app.profile,
                            submittedAt: new Date(app.createdAt).toLocaleString()
                        }} />

                        <Section title="Demographics" data={app.demographics} />
                        <Section title="Professional Info" data={app.professional} />
                        <Section title="Service Address" data={app.serviceAddress} />
                        <Section title="Business Info" data={app.business} />
                        <Section title="Disclosures" data={app.disclosures} />
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        {/* Attachments */}
                        <div className="card">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Attachments</h3>
                            <div className="space-y-3">
                                {Object.entries(app.attachments || {}).map(([key, file]) => {
                                    if (!file) return null;
                                    return (
                                        <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded border">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="bg-white p-2 rounded border">
                                                    <File className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-700 truncate">{key}</p>
                                                    <p className="text-xs text-slate-400 truncate">{file.name}</p>
                                                </div>
                                            </div>
                                            <button className="text-sky-600 hover:text-sky-800" title="Download (Mock)">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="card sticky top-24 border-t-4 border-t-slate-800">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Validation Actions</h3>

                            {app.status === 'Enrollment Approved' ? (
                                <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6" />
                                    <span>This application has been <strong>Approved</strong>.</span>
                                </div>
                            ) : app.status === 'Enrollment Rejected' ? (
                                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                                    <div className="flex items-center gap-2 mb-2">
                                        <XCircle className="w-6 h-6" />
                                        <span>This application was <strong>Rejected</strong>.</span>
                                    </div>
                                    <p className="text-sm border-t border-red-200 pt-2 mt-2"><strong>Reason:</strong> {app.adminNotes}</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <label className="text-sm font-medium text-slate-700 mb-2 block">Review Notes / Rejection Reason</label>
                                        <textarea
                                            className="w-full border rounded-md p-2 text-sm h-24 resize-none focus:ring-2 ring-sky-500 outline-none"
                                            placeholder="Required for rejection..."
                                            value={actionNote}
                                            onChange={(e) => setActionNote(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => {
                                                if (!actionNote) return alert('Please provide a reason for rejection.');
                                                handleAction('Enrollment Rejected');
                                            }}
                                            className="btn bg-white border border-red-200 text-red-600 hover:bg-red-50 flex flex-col items-center py-4 gap-2"
                                        >
                                            <XCircle className="w-6 h-6" />
                                            Reject Enrollment
                                        </button>
                                        <button
                                            onClick={() => handleAction('Enrollment Approved')}
                                            className="btn bg-green-600 text-white hover:bg-green-700 flex flex-col items-center py-4 gap-2 shadow-md hover:shadow-lg"
                                        >
                                            <CheckCircle className="w-6 h-6" />
                                            Approve Enrollment
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminReview;
