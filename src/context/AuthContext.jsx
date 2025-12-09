import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../utils/mockBackend';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (persisted in session for demo purposes, 
        // or just check localStorage for a 'session' key if we wanted to be more robust)
        const storedUser = localStorage.getItem('pave_current_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const loggedUser = await loginUser(email, password);
            setUser(loggedUser);
            localStorage.setItem('pave_current_user', JSON.stringify(loggedUser));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (email, password, role, firstName, lastName) => {
        try {
            const newUser = await registerUser(email, password, role, firstName, lastName);
            // Auto login after register
            setUser(newUser);
            localStorage.setItem('pave_current_user', JSON.stringify(newUser));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pave_current_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
