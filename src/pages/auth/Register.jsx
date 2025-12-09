import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const result = await register(formData.email, formData.password, 'provider');
            if (result.success) {
                navigate('/provider');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card">

                {/* Decorative Side (Left) */}
                <div className="auth-decor">
                    <div className="decor-circle decor-circle-1"></div>
                    <div className="decor-circle decor-circle-2"></div>

                    <div className="auth-content">
                        <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-white/20">
                            <span className="font-bold text-2xl text-white">P</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white">Join PAVE Network</h2>
                        <p className="text-slate-300 leading-relaxed mb-8 opacity-90">
                            Streamline your provider enrollment process with our secure and efficient portal.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-white opacity-90">
                                <CheckCircle className="w-5 h-5 text-sky-400" />
                                <span>Fast Application Processing</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white opacity-90">
                                <CheckCircle className="w-5 h-5 text-sky-400" />
                                <span>Secure Document Management</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white opacity-90">
                                <CheckCircle className="w-5 h-5 text-sky-400" />
                                <span>Real-time Status Tracking</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side (Right) */}
                <div className="auth-form-side">
                    <div className="text-center md:text-left mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
                        <p className="text-slate-500 mt-1">Enter your details to register as a provider.</p>
                    </div>

                    {error && (
                        <div className="alert-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Min 8 characters"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary auth-btn"
                        >
                            {isLoading ? 'Creating Account...' : (
                                <>
                                    Register <ArrowRight className="h-5 w-5 ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-slate-100">
                        <p className="text-slate-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-sky-600 font-bold hover:text-sky-700">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
