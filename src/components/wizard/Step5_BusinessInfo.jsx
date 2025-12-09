import React from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { Briefcase, Landmark } from 'lucide-react';

const Step5_BusinessInfo = () => {
    const { applicationData, updateData } = useApplication();
    const { business } = applicationData;

    const handleChange = (e) => {
        updateData('business', { [e.target.name]: e.target.value });
    };

    return (
        <div className="animation-fade-in">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Landmark className="text-sky-500" /> Official Business Information
            </h2>

            <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="input-group">
                    <label>Legal Entity Name</label>
                    <input type="text" name="legalEntityName" value={business.legalEntityName} onChange={handleChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="input-group">
                    <label>Fictitious Business Name (DBA)</label>
                    <input type="text" name="dba" value={business.dba} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>FBN Filing Number / County</label>
                    <input type="text" name="fbnFiling" value={business.fbnFiling} onChange={handleChange} />
                </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase className="text-sky-500" /> Incorporation Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group">
                    <label>Secretary of State (SOS) Corporate Number</label>
                    <input type="text" name="sosNumber" value={business.sosNumber} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Date of Incorporation</label>
                    <input type="date" name="incorporationDate" value={business.incorporationDate} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default Step5_BusinessInfo;
