import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../lib/store';
import type { InvoiceLineItem } from '../../types';
import { ArrowLeft, Upload, Plus, Trash2, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InvoiceEntry = () => {
    const navigate = useNavigate();
    const { contracts, addInvoice, invoices } = useAppStore();
    const activeContracts = contracts.filter(c => c.status === 'active');

    const [selectedContractId, setSelectedContractId] = useState(activeContracts[0]?.id || '');
    const [periodStart, setPeriodStart] = useState('');
    const [periodEnd, setPeriodEnd] = useState('');
    const [items, setItems] = useState<InvoiceLineItem[]>([
        { id: '1', description: '', amount: 0, ffp: 50 }
    ]);
    const [files, setFiles] = useState<File[]>([]);

    // Mock file handler
    const handleFileChange = () => {
        // In a real app, we'd handle the event here
        const mockFile = new File(["dummy"], "invoice.pdf", { type: "application/pdf" });
        setFiles(prev => [...prev, mockFile]);
    };

    const handleAddItem = () => {
        setItems([...items, { id: Date.now().toString(), description: '', amount: 0, ffp: 50 }]);
    };

    const handleRemoveItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const handleItemChange = (id: string, field: keyof InvoiceLineItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const calculateTotals = () => {
        const totalAmount = items.reduce((sum, item) => sum + Number(item.amount), 0);
        const federalShare = items.reduce((sum, item) => sum + (Number(item.amount) * (item.ffp / 100)), 0);
        return { totalAmount, federalShare };
    };

    const { totalAmount, federalShare } = calculateTotals();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newInvoice = {
            id: `inv-${Date.now()}`,
            contractId: selectedContractId,
            number: `INV-${1000 + invoices.length + 1}`,
            periodStart,
            periodEnd,
            status: 'submitted' as const,
            totalAmount,
            federalShare,
            items,
            attachedFiles: files.map(f => f.name),
            submittedDate: new Date().toISOString(),
        };

        addInvoice(newInvoice);
        navigate('/invoices');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/invoices" className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">New Invoice</h1>
                    <p className="text-slate-400 mt-2">Submit a new invoice for payment processing.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contract Selection */}
                <div className="glass-panel p-6 rounded-xl space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-4">Contract Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Select Contract</label>
                            <select
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-500 outline-none transition-colors"
                                value={selectedContractId}
                                onChange={(e) => setSelectedContractId(e.target.value)}
                                required
                            >
                                {activeContracts.map(c => (
                                    <option key={c.id} value={c.id}>{c.number} - {c.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Period Start</label>
                                <input
                                    type="date"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-500 outline-none transition-colors"
                                    value={periodStart}
                                    onChange={(e) => setPeriodStart(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Period End</label>
                                <input
                                    type="date"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-500 outline-none transition-colors"
                                    value={periodEnd}
                                    onChange={(e) => setPeriodEnd(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Line Items */}
                <div className="glass-panel p-6 rounded-xl space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <h3 className="text-lg font-semibold text-white">Line Items</h3>
                        <button type="button" onClick={handleAddItem} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                            <Plus size={16} /> Add Item
                        </button>
                    </div>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 items-start animate-in fade-in slide-in-from-left-4 duration-300">
                                <div className="col-span-6 space-y-2">
                                    <label className="text-xs text-slate-500">Description</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior Developer Hours"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 outline-none"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-span-3 space-y-2">
                                    <label className="text-xs text-slate-500">Amount ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 outline-none"
                                        value={item.amount}
                                        onChange={(e) => handleItemChange(item.id, 'amount', parseFloat(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs text-slate-500">FFP (%)</label>
                                    <select
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-slate-200 focus:border-blue-500 outline-none"
                                        value={item.ffp}
                                        onChange={(e) => handleItemChange(item.id, 'ffp', parseInt(e.target.value))}
                                    >
                                        <option value="50">50%</option>
                                        <option value="75">75%</option>
                                        <option value="90">90%</option>
                                        <option value="100">100%</option>
                                    </select>
                                </div>
                                <div className="col-span-1 pt-8 text-center">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-slate-500 hover:text-red-400 p-1"
                                        disabled={items.length === 1}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex justify-end gap-12 text-sm">
                        <div className="text-right">
                            <p className="text-slate-500 mb-1">Total Amount</p>
                            <p className="text-2xl font-bold text-white">${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-500 mb-1">Federal Share (Est.)</p>
                            <p className="text-2xl font-bold text-emerald-400">${federalShare.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                </div>

                {/* Attachments */}
                <div className="glass-panel p-6 rounded-xl space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-4">Attachments</h3>
                    <div
                        className="border-2 border-dashed border-slate-700 rounded-xl p-8 hover:border-slate-500 hover:bg-slate-900/30 transition-all cursor-pointer text-center group"
                        onClick={handleFileChange}
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="text-slate-400 group-hover:text-blue-400" size={24} />
                        </div>
                        <p className="text-slate-300 font-medium">Click to upload files</p>
                        <p className="text-slate-500 text-sm mt-1">PDF, Excel, Word (max 10MB)</p>
                    </div>
                    {/* Mock file list */}
                    {files.length === 0 && (
                        <p className="text-sm text-slate-500 italic text-center">No files selected</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link to="/invoices" className="btn-secondary">Cancel</Link>
                    <button type="submit" className="btn-primary flex items-center gap-2 px-8">
                        <Save size={18} />
                        <span>Submit Invoice</span>
                    </button>
                </div>
            </form>
        </div>
    );
};
