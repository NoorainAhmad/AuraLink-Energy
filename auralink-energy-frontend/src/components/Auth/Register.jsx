import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Register.css';

function Register() {
    const [role, setRole] = useState('customer');
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        // Customer-specific fields
        fullName: '',
        email: '',
        mobileNumber: '',
        address: '',
        customerType: 'Residential'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (role === 'customer') {
            if (!formData.fullName || !formData.email || !formData.mobileNumber) {
                setError('Please fill in all required fields');
                return false;
            }

            if (formData.mobileNumber.length !== 10) {
                setError('Mobile number must be 10 digits');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError('Please enter a valid email address');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const registrationData = {
                userId: formData.userId,
                password: formData.password,
                role: role,
                ...(role === 'customer' && {
                    fullName: formData.fullName,
                    email: formData.email,
                    mobileNumber: formData.mobileNumber,
                    address: formData.address,
                    customerType: formData.customerType
                })
            };

            const response = await authService.register(registrationData);

            if (response && response.success) {
                console.log(`${role} registration successful:`, response);

                // Auto-login after registration
                authService.storeUserData(response, role);

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError(response.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <div className="logo-container">
                        <div className="logo-icon">⚡</div>
                        <h1 className="logo-text">AuraLink Energy</h1>
                    </div>
                    <p className="register-subtitle">Create Your Account</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {error && <div className="error-message">{error}</div>}

                    {/* Role Selection */}
                    <div className="form-group">
                        <label className="form-label">Register As</label>
                        <div className="role-selector">
                            <button
                                type="button"
                                className={`role-btn ${role === 'customer' ? 'active' : ''}`}
                                onClick={() => setRole('customer')}
                            >
                                <span className="role-icon">👤</span>
                                <span>Customer</span>
                            </button>
                            <button
                                type="button"
                                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                                onClick={() => setRole('admin')}
                            >
                                <span className="role-icon">👨‍💼</span>
                                <span>Admin</span>
                            </button>
                        </div>
                    </div>

                    {/* Common Fields */}
                    <div className="form-group">
                        <label htmlFor="userId" className="form-label">
                            {role === 'admin' ? 'Username' : 'User ID'} *
                        </label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            className="form-input"
                            value={formData.userId}
                            onChange={handleChange}
                            placeholder={role === 'admin' ? 'Choose a username' : 'Choose a user ID'}
                            required
                        />
                    </div>

                    {/* Customer-specific fields */}
                    {role === 'customer' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="fullName" className="form-label">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className="form-input"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobileNumber" className="form-label">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    className="form-input"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number"
                                    maxLength="10"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    className="form-input"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your address"
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="customerType" className="form-label">
                                    Customer Type *
                                </label>
                                <select
                                    id="customerType"
                                    name="customerType"
                                    className="form-input"
                                    value={formData.customerType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* Password Fields */}
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password *
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password (min 6 characters)"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password *
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-input"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg register-btn"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div className="register-footer">
                    <p className="text-muted text-center">
                        Already have an account? <a href="/login" className="login-link">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
