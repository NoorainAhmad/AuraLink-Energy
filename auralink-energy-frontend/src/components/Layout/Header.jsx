import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
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
                    <Link to="/customers" className="nav-link">Customers</Link>
                    <Link to="/bills" className="nav-link">Bills</Link>
                    <Link to="/complaints" className="nav-link">Complaints</Link>
                </nav>

                <div className="header-user">
                    <span className="user-name">{user.fullName || 'User'}</span>
                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
