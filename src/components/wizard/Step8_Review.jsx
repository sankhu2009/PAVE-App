import React from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { CheckSquare } from 'lucide-react';

const Step8_Review = () => {
    const { applicationData } = useApplication();
    const { profile, demographics, professional, business } = applicationData;

    const Section = ({ title, data }) => (
        <div className="mb-6 border-b pb-4">
            <h4 className="font-semibold text-slate-700 mb-2">{title}</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {Object.entries(data).map(([key, value]) => {
                    if (key.includes('Date')) {
                        // Format dates nicel if needed, for strings just pass
                    }
                    if (!value) return null;
                    return (
                        <div key={key}>
                            <span className="block text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium text-slate-800">{String(value)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="animation-fade-in">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CheckSquare className="text-sky-500" /> Review & Attestation
            </h2>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                <Section title="User & Business Profile" data={{
                    ...profile,
                    // exclude sensitive if needed
                }} />
                <Section title="Demographics" data={demographics} />
                <Section title="Professional Info" data={professional} />
                <Section title="Business Info" data={business} />
            </div>

            <div className="bg-sky-50 border border-sky-100 p-6 rounded-lg">
                <h4 className="font-bold text-sky-900 mb-2">Electronic Signature</h4>
                <p className="text-sm text-sky-800 mb-4">
                    By clicking "Submit Application", I certify that the information provided herein is true and correct to the best of my knowledge. I understand that any false claims may result in denial of enrollment or termination.
                </p>

                <div className="flex items-center gap-3">
                    <input type="checkbox" id="attest" className="w-5 h-5 accent-sky-600" />
                    <label htmlFor="attest" className="text-sm font-medium text-sky-900 cursor-pointer">
                        I have read and agree to the above statement.
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Step8_Review;
