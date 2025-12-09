import React from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { Stethoscope, Award, FlaskConical, Pill } from 'lucide-react';

const Step3_Professional = () => {
    const { applicationData, updateData } = useApplication();
    const { professional } = applicationData;

    const handleChange = (e) => {
        updateData('professional', { [e.target.name]: e.target.value });
    };

    return (
        <div className="animation-fade-in">
            {/* NPI Section */}
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Stethoscope className="text-sky-500" /> NPI Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="input-group">
                    <label>National Provider Identifier (NPI)</label>
                    <input type="text" name="npi" value={professional.npi} onChange={handleChange} placeholder="10-digit NPI" />
                </div>
                <div className="input-group">
                    <label>NPI Enumeration Date</label>
                    <input type="date" name="npiDate" value={professional.npiDate} onChange={handleChange} />
                </div>
            </div>

            <hr className="my-8 border-slate-200" />

            {/* Licensure & Certification */}
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award className="text-sky-500" /> Licensure & Certification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="input-group">
                    <label>License Type</label>
                    <select name="licenseType" value={professional.licenseType} onChange={handleChange}>
                        <option value="">Select Type...</option>
                        <option value="Medical Board of California">Medical Board of California</option>
                        <option value="Physician">Physician</option>
                        <option value="Surgeon">Surgeon</option>
                        <option value="Osteopathic">Osteopathic Medical Board</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>License Number</label>
                    <input type="text" name="licenseNumber" value={professional.licenseNumber} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Original Issue Date</label>
                    <input type="date" name="issueDate" value={professional.issueDate} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Expiration Date</label>
                    <input type="date" name="expirationDate" value={professional.expirationDate} onChange={handleChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="input-group">
                    <label>Primary Speciality</label>
                    <select name="speciality" value={professional.speciality} onChange={handleChange}>
                        <option value="">Select Speciality...</option>
                        <option value="Family Medicine">Family Medicine</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Internal Medicine">Internal Medicine</option>
                        <option value="OB-GYN">OB-GYN</option>
                        <option value="Physical Therapy">Physical Therapy</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Board Certification Status (Optional)</label>
                    <select name="boardCertification" value={professional.boardCertification} onChange={handleChange}>
                        <option value="">Select status...</option>
                        <option value="Certified">Certified</option>
                        <option value="Eligible">Eligible</option>
                        <option value="None">None</option>
                    </select>
                </div>
            </div>

            <hr className="my-8 border-slate-200" />

            {/* DEA & CLIA */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Pill className="text-sky-500" /> DEA Information
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div className="input-group">
                            <label>DEA Number (If Applicable)</label>
                            <input type="text" name="deaNumber" value={professional.deaNumber} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Expiration Date</label>
                            <input type="date" name="deaExpiration" value={professional.deaExpiration} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <FlaskConical className="text-sky-500" /> CLIA Information
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div className="input-group">
                            <label>CLIA Certificate Number (If Applicable)</label>
                            <input type="text" name="cliaNumber" value={professional.cliaNumber} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3_Professional;
