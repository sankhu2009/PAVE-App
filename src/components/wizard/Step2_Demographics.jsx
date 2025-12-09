import React from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { BadgeCheck, Fingerprint } from 'lucide-react';

const Step2_Demographics = () => {
    const { applicationData, updateData } = useApplication();
    const { demographics } = applicationData;

    const handleChange = (e) => {
        updateData('demographics', { [e.target.name]: e.target.value });
    };

    return (
        <div className="animation-fade-in">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BadgeCheck className="text-sky-500" /> Provider Identity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="input-group">
                    <label>Provider Type</label>
                    <select name="providerType" value={demographics.providerType} onChange={handleChange}>
                        <option value="">Select Type...</option>
                        <option value="Individual">Individual Providers</option>
                        <option value="Group">Group Providers</option>
                        <option value="Other">Other Healthcare Business</option>
                        <option value="NMP">Non-Physician Medical Practitioner (NMP)</option>
                        <option value="SUDMD">Substance Use Disorder Medical Director</option>
                        <option value="ORP">Order-Refer-Prescribe only (ORP)</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Enrollment Type</label>
                    <select name="enrollmentType" value={demographics.enrollmentType} onChange={handleChange}>
                        <option value="">Select Enrollment...</option>
                        <option value="ORP">Ordering/Rendering/Prescribing Only</option>
                        <option value="Billing">Billing Provider</option>
                        <option value="Rendering">Rendering Provider</option>
                    </select>
                </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Fingerprint className="text-sky-500" /> Personal Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group">
                    <label>Legal Name</label>
                    <input type="text" name="legalName" value={demographics.legalName} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={demographics.dob} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Gender</label>
                    <select name="gender" value={demographics.gender} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>SSN</label>
                    <input type="text" name="ssn" value={demographics.ssn} onChange={handleChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="input-group">
                    <label>Driver's License / State ID</label>
                    <input type="text" name="driverLicense" value={demographics.driverLicense} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Issuing State</label>
                    <input type="text" name="idState" value={demographics.idState} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Expiration Date</label>
                    <input type="date" name="idExpiration" value={demographics.idExpiration} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default Step2_Demographics;
