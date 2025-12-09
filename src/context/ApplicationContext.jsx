import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveApplication, getApplication } from '../utils/mockBackend';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext(null);

export const ApplicationProvider = ({ children }) => {
    const { user } = useAuth();
    // Allow partial data saving
    const [applicationData, setApplicationData] = useState({
        // Step 1: User & Business Profile
        profile: {
            firstName: '', lastName: '', email: '', phone: '',
            businessName: '', taxScope: 'Sole Proprietor',
            ssn: '', fein: ''
        },
        // Step 2: Demographics
        demographics: {
            providerType: '', enrollmentType: '',
            legalName: '', dob: '', gender: '',
            driverLicense: '', idState: '', idExpiration: '',
            ssn: '' // Repeated if necessary or synced
        },
        // Step 3: Professional Info
        professional: {
            npi: '', npiDate: '',
            licenseType: '', licenseNumber: '', issueDate: '', expirationDate: '',
            speciality: '',
            deaNumber: '', deaExpiration: '',
            cliaNumber: ''
        },
        // Step 4: Service Address
        serviceAddress: {
            street: '', phone: '',
            adaCompliant: 'No', wheelchairAccessible: 'No',
            hours: ''
        },
        // Step 5: Business Info
        business: {
            legalEntityName: '', dba: '', fbnFiling: '',
            sosNumber: '', incorporationDate: ''
        },
        // Step 6: Disclosures
        disclosures: {
            criminalHistory: false,
            malpracticeClaims: false,
            sanctions: false
        },
        // Step 7: Attachments
        attachments: {
            driverLicense: null,
            professionalLicense: null,
            insurance: null
        },
        // Meta
        status: 'Draft',
        currentStep: 1
    });

    const [isSaving, setIsSaving] = useState(false);

    // Load existing draft on mount if available
    useEffect(() => {
        // In a real app, we'd fetch by user ID or similar
        // For this mock, we'd need to know the NPI or ID to fetch. 
        // For simplicity, we just init empty or load from a specific key if we wanted persistence per user session logic.
    }, []);

    const updateData = (section, data) => {
        setApplicationData(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    const updateStandalone = (key, value) => {
        setApplicationData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const saveDraft = async (overrides = {}) => {
        setIsSaving(true);
        try {
            // Use NPI or a Temp ID as key
            const id = applicationData.professional.npi || overrides.professional?.npi || 'temp-' + user?.email;
            const dataToSave = { ...applicationData, ...overrides, npi: id, providerId: user?.id };
            await saveApplication(dataToSave);

            // If overrides included status, update local state too
            if (overrides.status) {
                updateStandalone('status', overrides.status);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ApplicationContext.Provider value={{ applicationData, updateData, updateStandalone, saveDraft, isSaving }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplication = () => useContext(ApplicationContext);
