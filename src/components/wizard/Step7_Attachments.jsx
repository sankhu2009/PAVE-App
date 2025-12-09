import React, { useRef } from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { UploadCloud, CheckCircle, File } from 'lucide-react';

const Step7_Attachments = () => {
    const { applicationData, updateData } = useApplication();
    const { attachments } = applicationData;

    // Use refs to handle file inputs hidden
    const fileInputRefs = {
        driverLicense: useRef(null),
        professionalLicense: useRef(null),
        insurance: useRef(null),
        workersComp: useRef(null),
        irsForm: useRef(null),
        fbnStatement: useRef(null)
    };

    const handleFileChange = (key, e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app we upload to server and get URL
            // Here we just store metadata + fake success
            updateData('attachments', {
                [key]: { name: file.name, size: file.size, type: file.type }
            });
        }
    };

    const FileUploadCard = ({ label, description, fileKey, required = true }) => {
        const fileData = attachments[fileKey];

        return (
            <div className="card border-dashed border-2 border-slate-300 hover:border-sky-400 p-6 flex flex-col items-center justify-center text-center transition-all bg-slate-50">
                {fileData ? (
                    <>
                        <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                        <h4 className="font-semibold text-slate-900">{label}</h4>
                        <div className="flex items-center gap-2 mt-2 bg-white px-3 py-1 rounded border">
                            <File className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-600 truncate max-w-[200px]">{fileData.name}</span>
                        </div>
                        <button
                            onClick={() => updateData('attachments', { [fileKey]: null })}
                            className="text-red-500 text-xs mt-3 hover:underline"
                        >
                            Remove
                        </button>
                    </>
                ) : (
                    <>
                        <UploadCloud className="w-12 h-12 text-slate-400 mb-3" />
                        <h4 className="font-semibold text-slate-900">{label} {required && <span className="text-red-500">*</span>}</h4>
                        <p className="text-xs text-slate-500 mt-1 mb-4">{description}</p>
                        <button
                            onClick={() => fileInputRefs[fileKey].current.click()}
                            className="btn btn-primary text-sm py-1"
                        >
                            Select File
                        </button>
                        <input
                            type="file"
                            ref={fileInputRefs[fileKey]}
                            className="hidden"
                            onChange={(e) => handleFileChange(fileKey, e)}
                        />
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="animation-fade-in">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <UploadCloud className="text-sky-500" /> Required Attachments
            </h2>
            <p className="mb-6 text-slate-500 text-sm">Upload clear, color scans of the original documents. Supported formats: PDF, JPG, PNG.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FileUploadCard
                    label="Driver's License"
                    description="Color scan of valid Government ID"
                    fileKey="driverLicense"
                />
                <FileUploadCard
                    label="Professional License"
                    description="Scan of the Wall certificate"
                    fileKey="professionalLicense"
                />
                <FileUploadCard
                    label="Proof of Liability Insurance"
                    description="Certificate of Insurance (COI)"
                    fileKey="insurance"
                />
                <FileUploadCard
                    label="Worker's Compensation"
                    description="Proof of coverage or statement of exemption"
                    fileKey="workersComp"
                    required={false}
                />
                <FileUploadCard
                    label="IRS Form CP-575 or 147C"
                    description="Proof of FEIN (for business entities)"
                    fileKey="irsForm"
                />
                <FileUploadCard
                    label="Fictitious Business Name"
                    description="Stamped copy from the county (if DBA)"
                    fileKey="fbnStatement"
                    required={false}
                />
            </div>
        </div>
    );
};

export default Step7_Attachments;
