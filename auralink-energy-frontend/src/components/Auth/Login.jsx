import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Login.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default to customer
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authService.login(userId, password, role);

            if (response && response.success) {
                // Store user data and role in localStorage
                authService.storeUserData(response, role);

                console.log(`${role} login successful:`, response);

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError(response.message || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid credentials. Please check your username and password.');
            } else {
                setError('Login failed. Please try again.');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-container">
                        <div className="logo-icon">⚡</div>
                        <h1 className="logo-text">AuraLink Energy</h1>
                    </div>
                    <p className="login-subtitle">Powering Your Future</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}

                    {/* Role Selection */}
                    <div className="form-group">
                        <label className="form-label">Login As</label>
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

                    <div className="form-group">
                        <label htmlFor="userId" className="form-label">
                            {role === 'admin' ? 'Username' : 'User ID'}
                        </label>
                        <input
                            type="text"
                            id="userId"
                            className="form-input"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder={role === 'admin' ? 'Enter your username' : 'Enter your user ID'}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="text-muted text-center">
                        Don't have an account? <a href="/register" className="register-link">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
