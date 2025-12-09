import React from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { User, Building, FileText } from 'lucide-react';

const Step1_Profile = () => {
    const { applicationData, updateData } = useApplication();
    const { profile } = applicationData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData('profile', { [name]: value });
    };

    return (
        <div className="animation-fade-in">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="text-sky-500" /> User & Business Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group">
                    <label>First Name</label>
                    <input
                        type="text" name="firstName"
                        value={profile.firstName} onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Last Name</label>
                    <input
                        type="text" name="lastName"
                        value={profile.lastName} onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email" name="email"
                        value={profile.email} onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number</label>
                    <input
                        type="tel" name="phone"
                        value={profile.phone} onChange={handleChange}
                    />
                </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Building className="text-sky-500" /> Business Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group col-span-2">
                    <label>Business Profile Name</label>
                    <input
                        type="text" name="businessName"
                        value={profile.businessName} onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Tax Scope</label>
                    <select name="taxScope" value={profile.taxScope} onChange={handleChange}>
                        <option value="Sole Proprietor">Sole Proprietor</option>
                        <option value="Group/Corp">Group / Corporation</option>
                    </select>
                </div>

                <div className="input-group">
                    {profile.taxScope === 'Sole Proprietor' ? (
                        <>
                            <label>Social Security Number (SSN)</label>
                            <input
                                type="text" name="ssn" placeholder="XXX-XX-XXXX"
                                value={profile.ssn} onChange={handleChange}
                            />
                        </>
                    ) : (
                        <>
                            <label>Federal Employer ID (FEIN)</label>
                            <input
                                type="text" name="fein" placeholder="XX-XXXXXXX"
                                value={profile.fein} onChange={handleChange}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step1_Profile;
