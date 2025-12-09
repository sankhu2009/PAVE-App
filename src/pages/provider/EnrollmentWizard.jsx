import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApplicationProvider, useApplication } from '../../context/ApplicationContext';
import { getApplication } from '../../utils/mockBackend';
import Step1_Profile from '../../components/wizard/Step1_Profile';
import Step2_Demographics from '../../components/wizard/Step2_Demographics';
import Step3_Professional from '../../components/wizard/Step3_Professional';
import Step4_ServiceAddress from '../../components/wizard/Step4_ServiceAddress';
import Step5_BusinessInfo from '../../components/wizard/Step5_BusinessInfo';
import Step6_Disclosures from '../../components/wizard/Step6_Disclosures';
import Step7_Attachments from '../../components/wizard/Step7_Attachments';
import Step8_Review from '../../components/wizard/Step8_Review';
import { CheckCircle, AlertCircle, ChevronRight, Menu, Check } from 'lucide-react';

const steps = [
    { id: 1, label: 'Profile', desc: 'User & Business' },
    { id: 2, label: 'Identity', desc: 'Demographics' },
    { id: 3, label: 'Professional', desc: 'NPI & License' },
    { id: 4, label: 'Service Loc', desc: 'Address & Hours' },
    { id: 5, label: 'Business', desc: 'Corporate Info' },
    { id: 6, label: 'Disclosures', desc: 'Background' },
    { id: 7, label: 'Attachments', desc: 'Files' },
    { id: 8, label: 'Review', desc: 'Sign & Submit' }
];

const WizardContainer = () => {
    const { applicationData, updateStandalone, saveDraft, isSaving, updateData } = useApplication();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode'); // 'edit', 'view', or null (new)
    const npiParam = searchParams.get('npi');

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Load existing data if edit/view mode
    useEffect(() => {
        if (npiParam) {
            loadExistingApplication(npiParam);
        }
    }, [npiParam]);

    const loadExistingApplication = async (npi) => {
        setIsLoading(true);
        const data = await getApplication(npi);
        if (data) {
            // Need to populate context. We only have updateData (partial) or updateStandalone (key).
            // This is a limitation of my context design, I should have a 'setFullData'.
            // I'll hack it by updating each key.
            Object.keys(data).forEach(key => {
                updateStandalone(key, data[key]);
            });
        }
        setIsLoading(false);
    };

    // Navigation state
    const currentStep = applicationData.currentStep || 1;
    const isReadOnly = mode === 'view' || applicationData.status === 'Enrollment Approved';
    const isResubmitting = mode === 'edit' && applicationData.status === 'Enrollment Rejected';

    const Components = {
        1: Step1_Profile,
        2: Step2_Demographics,
        3: Step3_Professional,
        4: Step4_ServiceAddress,
        5: Step5_BusinessInfo,
        6: Step6_Disclosures,
        7: Step7_Attachments,
        8: Step8_Review
    };

    const CurrentComponent = Components[currentStep] || (() => <div>Step {currentStep}</div>);

    const handleNext = async () => {
        if (isReadOnly) {
            if (currentStep < steps.length) updateStandalone('currentStep', currentStep + 1);
            return;
        }

        await saveDraft();
        if (currentStep < steps.length) {
            updateStandalone('currentStep', currentStep + 1);
            window.scrollTo(0, 0);
        } else {
            // Submit
            await saveDraft({ status: 'In Validation' });
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            updateStandalone('currentStep', currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const jumpToStep = async (stepId) => {
        if (!isReadOnly) await saveDraft();
        updateStandalone('currentStep', stepId);
        window.scrollTo(0, 0);
    };

    if (isLoading) return <div className="p-12 text-center text-slate-500">Loading Application...</div>;

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
                <div className="card max-w-lg w-full text-center p-8 fade-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        {isResubmitting ? 'Application Resubmitted!' : 'Application Submitted!'}
                    </h2>
                    <p className="text-slate-600 mb-8">
                        Your application is now being validated. You will be notified of any updates.
                    </p>
                    <button onClick={() => navigate('/provider')} className="btn btn-primary w-full">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="wizard-layout fade-in">
            {/* Sidebar Navigation */}
            <aside className="wizard-sidebar">
                <div className="wizard-sidebar-header">
                    <h1 className="text-xl font-bold text-slate-800">PAVE Enrollment</h1>
                    <p className="text-xs text-slate-500 mt-1">Application Wizard</p>

                    {/* Status Badge */}
                    {applicationData.status && applicationData.status !== 'Draft' && (
                        <div className={`mt-3 px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-2 border
                            ${applicationData.status === 'Enrollment Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                applicationData.status === 'Enrollment Approved' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}
                        `}>
                            {applicationData.status === 'Enrollment Rejected' ? <AlertCircle className="w-4 h-4" /> :
                                applicationData.status === 'Enrollment Approved' ? <CheckCircle className="w-4 h-4" /> : null}
                            {applicationData.status}
                        </div>
                    )}
                </div>

                <nav className="wizard-nav">
                    {steps.map((step) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <button
                                key={step.id}
                                onClick={() => jumpToStep(step.id)}
                                disabled={isSaving} // Prevent jump while saving
                                className={`wizard-step-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                            >
                                <div className="step-indicator">
                                    {isCompleted ? <Check className="w-3 h-3" /> : step.id}
                                </div>
                                <div>
                                    <span className="step-label">{step.label}</span>
                                    <span className="step-desc">{step.desc}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50 text-sky-600" />}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="wizard-main">
                <div className="wizard-content">
                    {/* Header for Step */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Step {currentStep}: {steps[currentStep - 1].label}
                            </h2>
                            <p className="text-slate-500">{steps[currentStep - 1].desc}</p>
                        </div>
                        {isReadOnly && (
                            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                                VIEW ONLY
                            </span>
                        )}
                    </div>

                    {/* Rejection Notification at top of content if relevant */}
                    {isResubmitting && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex gap-3 text-red-800">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Action Required: Application Rejected</h4>
                                <p className="text-sm mt-1">{applicationData.adminNotes}</p>
                            </div>
                        </div>
                    )}

                    {/* Form Content */}
                    <div className={`card ${isReadOnly ? 'pointer-events-none opacity-80 bg-slate-50' : ''}`}>
                        <CurrentComponent />
                    </div>
                </div>

                {/* Footer Actions Sticky */}
                <div className="wizard-footer">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`btn btn-outline px-6 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        Back
                    </button>

                    <div className="text-xs text-slate-400 font-medium hidden sm:block">
                        {isReadOnly ? 'Viewing Application' : (isSaving ? 'Saving changes...' : 'Draft saved')}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={isSaving}
                        className="btn btn-primary px-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
                    >
                        {isSaving ? 'Processing...' : (
                            currentStep === steps.length ? (isReadOnly ? 'Close' : 'Submit Application') : 'Save & Continue'
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
};

// Wrap content in Provider
const EnrollmentWizard = () => (
    <ApplicationProvider>
        <WizardContainer />
    </ApplicationProvider>
);

export default EnrollmentWizard;
