/**
 * Mock Backend Service
 * 
 * Simulates a backend API using localStorage.
 * Handles Users (Provider, Admin) and Applications (Drafts, Submitted).
 */

const DELAY = 500; // Simulate network latency

const getStore = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const setStore = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// --- Users ---

export const registerUser = async (email, password, role = 'provider', firstName = '', lastName = '') => {
    await new Promise(r => setTimeout(r, DELAY));
    const users = getStore('pave_users');

    if (users.find(u => u.email === email)) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: crypto.randomUUID(),
        email,
        password, // In real app, hash this!
        role,
        firstName,
        lastName,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    setStore('pave_users', users);

    const { password: _, ...userWithoutPass } = newUser;
    return userWithoutPass;
};

export const loginUser = async (email, password) => {
    await new Promise(r => setTimeout(r, DELAY));
    const users = getStore('pave_users');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPass } = user;
    return userWithoutPass;
};

// --- Applications ---

export const getApplication = async (npi) => {
    await new Promise(r => setTimeout(r, DELAY));
    const apps = getStore('pave_applications');
    return apps.find(a => a.npi === npi) || null;
};

export const saveApplication = async (applicationData) => {
    await new Promise(r => setTimeout(r, DELAY));
    const apps = getStore('pave_applications');

    const existingIndex = apps.findIndex(a => a.npi === applicationData.npi);
    const timestamp = new Date().toISOString();

    if (existingIndex >= 0) {
        // If re-submitting a rejected app, we might want to update status to Validation, but let the caller handle that control?
        // Actually, for simplicity, if we save, we probably want to keep it as draft until explicitly submitted, 
        // OR the caller sets the status.
        apps[existingIndex] = { ...apps[existingIndex], ...applicationData, updatedAt: timestamp };
    } else {
        apps.push({ ...applicationData, createdAt: timestamp, updatedAt: timestamp, status: 'Draft' });
    }

    setStore('pave_applications', apps);
    return { success: true };
};

export const getApplicationsList = async () => {
    await new Promise(r => setTimeout(r, DELAY));
    return getStore('pave_applications');
};

export const updateApplicationStatus = async (npi, status, adminNotes = '') => {
    await new Promise(r => setTimeout(r, DELAY));
    const apps = getStore('pave_applications');
    const appIndex = apps.findIndex(a => a.npi === npi);

    if (appIndex === -1) throw new Error('Application not found');

    apps[appIndex].status = status;
    apps[appIndex].adminNotes = adminNotes;
    apps[appIndex].reviewedAt = new Date().toISOString();

    setStore('pave_applications', apps);
    return apps[appIndex];
};

// Initialize Admin on load if not exists
const initAdmin = () => {
    const users = getStore('pave_users');
    if (!users.find(u => u.email === 'admin@pave.gov')) {
        users.push({
            id: 'admin-001',
            email: 'admin@pave.gov',
            password: 'admin',
            role: 'admin',
            createdAt: new Date().toISOString()
        });
        setStore('pave_users', users);
    }
};

initAdmin();
