import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        const currentRole = authService.getRole();
        setUser(currentUser);
        setRole(currentRole);
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const getUserDisplayName = () => {
        if (role === 'admin') {
            return user?.userId || 'Admin';
        } else {
            return user?.fullName || user?.userId || 'Customer';
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/dashboard" className="header-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">AuraLink Energy</span>
                </Link>

                <nav className="header-nav">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>

                    {/* Admin-only navigation */}
                    {role === 'admin' && (
                        <>
                            <Link to="/customers" className="nav-link">Customers</Link>
                            <Link to="/bills" className="nav-link">All Bills</Link>
                            <Link to="/complaints" className="nav-link">All Complaints</Link>
                        </>
                    )}

                    {/* Customer navigation */}
                    {role === 'customer' && (
                        <>
                            <Link to="/bills" className="nav-link">My Bills</Link>
                            <Link to="/complaints" className="nav-link">My Complaints</Link>
                        </>
                    )}
                </nav>

                <div className="header-user">
                    <div className="user-info">
                        <span className="user-name">{getUserDisplayName()}</span>
                        <span className="user-role">{role === 'admin' ? 'Administrator' : 'Customer'}</span>
                    </div>
                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
