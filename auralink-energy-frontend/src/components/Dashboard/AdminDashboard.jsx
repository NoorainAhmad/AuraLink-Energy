import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';
import billService from '../../services/billService';
import complaintService from '../../services/complaintService';
import './Dashboard.css';

function AdminDashboard({ user }) {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalBills: 0,
        pendingComplaints: 0,
        activeCustomers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [customers, bills, complaints] = await Promise.all([
                customerService.getAllCustomers(),
                billService.getAllBills(),
                complaintService.getAllComplaints()
            ]);

            const activeCustomers = customers.filter(c => c.status === 'Active').length;
            const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;

            setStats({
                totalCustomers: customers.length,
                totalBills: bills.length,
                pendingComplaints: pendingComplaints,
                activeCustomers: activeCustomers
            });
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p className="welcome-text">Welcome back, {user.userId}!</p>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-primary">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.totalCustomers}</h3>
                        <p className="stat-label">Total Customers</p>
                    </div>
                </div>

                <div className="stat-card stat-success">
                    <div className="stat-icon">✓</div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.activeCustomers}</h3>
                        <p className="stat-label">Active Customers</p>
                    </div>
                </div>

                <div className="stat-card stat-info">
                    <div className="stat-icon">📄</div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.totalBills}</h3>
                        <p className="stat-label">Total Bills</p>
                    </div>
                </div>

                <div className="stat-card stat-warning">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.pendingComplaints}</h3>
                        <p className="stat-label">Pending Complaints</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-grid">
                    <button
                        className="action-card"
                        onClick={() => navigate('/customers/add')}
                    >
                        <div className="action-icon">➕</div>
                        <h3>Add Customer</h3>
                        <p>Register a new customer</p>
                    </button>

                    <button
                        className="action-card"
                        onClick={() => navigate('/customers')}
                    >
                        <div className="action-icon">📋</div>
                        <h3>View Customers</h3>
                        <p>Manage all customers</p>
                    </button>

                    <button
                        className="action-card"
                        onClick={() => navigate('/bills')}
                    >
                        <div className="action-icon">💰</div>
                        <h3>View Bills</h3>
                        <p>Manage billing records</p>
                    </button>

                    <button
                        className="action-card"
                        onClick={() => navigate('/complaints')}
                    >
                        <div className="action-icon">📞</div>
                        <h3>View Complaints</h3>
                        <p>Handle customer issues</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
