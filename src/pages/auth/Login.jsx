import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Forgot Password State
    const [view, setView] = useState('login'); // 'login' | 'forgot'
    const [resetSent, setResetSent] = useState(false);

    const handleForgotSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setResetSent(true);
        }, 800);
    };

    const toggleAdmin = () => {
        setIsAdmin(!isAdmin);
        setError('');
        if (!isAdmin) {
            setEmail('admin@pave.gov');
            setPassword('admin');
        } else {
            setEmail('');
            setPassword('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                // Determine redirect based on apparent role/context
                // The protected route will double check, but we can guide them
                if (isAdmin || email.includes('admin')) {
                    navigate('/admin');
                } else {
                    navigate('/provider');
                }
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card">

                {/* Decorative Side (Left) */}
                <div className={`auth-decor ${isAdmin ? 'bg-slate-800' : ''}`}>
                    <div className="decor-circle decor-circle-1"></div>
                    <div className="decor-circle decor-circle-2"></div>

                    <div className="auth-content">

                        <h2 className="text-3xl font-bold mb-4" style={{ color: 'white' }}>PAVE Application</h2>

                        <p className="text-slate-300 leading-relaxed mb-8 opacity-90">
                            {isAdmin
                                ? 'Admin: Sign in to review the Provider Enrollment Applications'
                                : 'Provider: Sign in to access dashboard, manage applications, and track enrollment status'
                            }
                        </p>

                    </div>
                </div>

                {/* Form Side (Right) */}
                <div className="auth-form-side">
                    {/* View: Login */}
                    {view === 'login' && (
                        <>
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={toggleAdmin}
                                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors"
                                >
                                    {isAdmin ? '← Back to Provider Login' : 'Login as Administrator →'}
                                </button>
                            </div>

                            <div className="text-center md:text-left mb-8">
                                <h1 className="text-2xl font-bold text-slate-800">
                                    {isAdmin ? 'Admin Login' : 'Sign In'}
                                </h1>
                                <p className="text-slate-500 mt-1">
                                    {isAdmin ? 'Enter your credentials to access the console.' : 'Access your Provider Portal account.'}
                                </p>
                            </div>

                            {error && (
                                <div className="alert-error">
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder={isAdmin ? "admin@pave.gov" : "name@company.com"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <div className="flex justify-between w-full">
                                        <label>Password</label>
                                        <button type="button" onClick={() => setView('forgot')} className="text-sm text-sky-600 hover:text-sky-700 font-medium">Forgot?</button>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`btn ${isAdmin ? 'bg-slate-800 hover:bg-slate-900 text-white' : 'btn-primary'} auth-btn`}
                                >
                                    {isLoading ? 'Signing in...' : (
                                        <>
                                            {isAdmin ? 'Access Console' : 'Sign In'} <ArrowRight className="h-5 w-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {!isAdmin && (
                                <div className="mt-8 text-center pt-6 border-t border-slate-100">
                                    <p className="text-slate-500 text-sm">
                                        Don't have an account?{' '}
                                        <Link to="/register" className="text-sky-600 font-bold hover:text-sky-700">
                                            Register now
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* View: Forgot Password */}
                    {view === 'forgot' && (
                        <div className="fade-in">
                            <div className="mb-8">
                                <button onClick={() => { setView('login'); setResetSent(false); }} className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4">
                                    ← Back to Login
                                </button>
                                <h1 className="text-2xl font-bold text-slate-800">Reset Password</h1>
                                <p className="text-slate-500 mt-1">
                                    Enter your email address to receive a password reset link.
                                </p>
                            </div>

                            {resetSent ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <ShieldCheck className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-green-800 font-bold mb-2">Check your inbox</h3>
                                    <p className="text-green-700 text-sm mb-4">
                                        We have sent a password reset link to <strong>{email}</strong>.
                                    </p>
                                    <button onClick={() => { setView('login'); setResetSent(false); }} className="btn btn-outline w-full text-sm">
                                        Return to Sign In
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleForgotSubmit}>
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary auth-btn">
                                        Send Reset Link
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
