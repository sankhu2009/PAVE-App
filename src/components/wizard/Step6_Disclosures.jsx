import React from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { ShieldAlert } from 'lucide-react';

const Step6_Disclosures = () => {
    const { applicationData, updateData } = useApplication();
    const { disclosures } = applicationData;

    const handleChange = (e) => {
        const { name, checked } = e.target;
        updateData('disclosures', { [name]: checked });
    };

    return (
        <div className="animation-fade-in">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ShieldAlert className="text-sky-500" /> Background & Control
            </h2>
            <p className="mb-6 text-slate-500">Please answer the following questions truthfully. Any false information may result in denial or revocation of enrollment.</p>

            <div className="flex flex-col gap-6">
                <div className="card border p-4 hover:border-sky-200 transition-colors">
                    <label className="flex items-start gap-4 cursor-pointer">
                        <input
                            type="checkbox" name="criminalHistory"
                            checked={disclosures.criminalHistory} onChange={handleChange}
                            className="mt-1 w-5 h-5 accent-sky-500"
                        />
                        <div>
                            <span className="font-semibold block text-slate-800">Criminal History</span>
                            <span className="text-sm text-slate-600">Have you or any managing employee ever been convicted of a criminal offense related to the delivery of an item or service under Medicare or Medicaid?</span>
                        </div>
                    </label>
                </div>

                <div className="card border p-4 hover:border-sky-200 transition-colors">
                    <label className="flex items-start gap-4 cursor-pointer">
                        <input
                            type="checkbox" name="malpracticeClaims"
                            checked={disclosures.malpracticeClaims} onChange={handleChange}
                            className="mt-1 w-5 h-5 accent-sky-500"
                        />
                        <div>
                            <span className="font-semibold block text-slate-800">Malpractice Claims</span>
                            <span className="text-sm text-slate-600">Has there been any final adverse action or malpractice judgment against you within the last 10 years?</span>
                        </div>
                    </label>
                </div>

                <div className="card border p-4 hover:border-sky-200 transition-colors">
                    <label className="flex items-start gap-4 cursor-pointer">
                        <input
                            type="checkbox" name="sanctions"
                            checked={disclosures.sanctions} onChange={handleChange}
                            className="mt-1 w-5 h-5 accent-sky-500"
                        />
                        <div>
                            <span className="font-semibold block text-slate-800">Sanctions</span>
                            <span className="text-sm text-slate-600">Have you ever had a license revoked, suspended, or otherwise sanctioned by any State licensing authority?</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Step6_Disclosures;
