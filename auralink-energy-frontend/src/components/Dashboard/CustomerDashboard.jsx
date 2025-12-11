import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import billService from '../../services/billService';
import complaintService from '../../services/complaintService';
import './Dashboard.css';

function CustomerDashboard({ user }) {
    const navigate = useNavigate();
    const [recentBills, setRecentBills] = useState([]);
    const [myComplaints, setMyComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomerData();
    }, [user]);

    const loadCustomerData = async () => {
        try {
            // Get all bills and filter by consumer number
            const allBills = await billService.getAllBills();
            const customerBills = allBills
                .filter(bill => bill.consumerNumber === user.consumerNumber)
                .slice(0, 3); // Get last 3 bills

            // Get all complaints and filter by consumer number
            const allComplaints = await complaintService.getAllComplaints();
            const customerComplaints = allComplaints
                .filter(complaint => complaint.consumerNumber === user.consumerNumber)
                .slice(0, 3); // Get last 3 complaints

            setRecentBills(customerBills);
            setMyComplaints(customerComplaints);
        } catch (error) {
            console.error('Error loading customer data:', error);
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
                <h1>Customer Dashboard</h1>
                <p className="welcome-text">Welcome, {user.fullName}!</p>
            </div>

            {/* Customer Info Card */}
            <div className="customer-info-card">
                <h2>Your Account Information</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Consumer Number:</span>
                        <span className="info-value">{user.consumerNumber}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">User ID:</span>
                        <span className="info-value">{user.userId}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Customer Type:</span>
                        <span className="info-value">{user.customerType || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-grid">
                    <button
                        className="action-card"
                        onClick={() => navigate('/bills')}
                    >
                        <div className="action-icon">💰</div>
                        <h3>View My Bills</h3>
                        <p>Check your billing history</p>
                    </button>

                    <button
                        className="action-card"
                        onClick={() => navigate('/complaints/add')}
                    >
                        <div className="action-icon">📝</div>
                        <h3>Submit Complaint</h3>
                        <p>Report an issue</p>
                    </button>

                    <button
                        className="action-card"
                        onClick={() => navigate('/complaints')}
                    >
                        <div className="action-icon">📞</div>
                        <h3>My Complaints</h3>
                        <p>Track your complaints</p>
                    </button>
                </div>
            </div>

            {/* Recent Bills */}
            <div className="recent-section">
                <div className="section-header">
                    <h2>Recent Bills</h2>
                    <button className="btn btn-link" onClick={() => navigate('/bills')}>
                        View All →
                    </button>
                </div>
                {recentBills.length > 0 ? (
                    <div className="bills-list">
                        {recentBills.map((bill) => (
                            <div key={bill.billId} className="bill-item">
                                <div className="bill-info">
                                    <span className="bill-month">{bill.billingMonth}</span>
                                    <span className="bill-amount">₹{bill.totalAmount}</span>
                                </div>
                                <span className={`bill-status status-${bill.paymentStatus?.toLowerCase()}`}>
                                    {bill.paymentStatus}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data">No bills found</p>
                )}
            </div>

            {/* Recent Complaints */}
            <div className="recent-section">
                <div className="section-header">
                    <h2>Recent Complaints</h2>
                    <button className="btn btn-link" onClick={() => navigate('/complaints')}>
                        View All →
                    </button>
                </div>
                {myComplaints.length > 0 ? (
                    <div className="complaints-list">
                        {myComplaints.map((complaint) => (
                            <div key={complaint.complaintId} className="complaint-item">
                                <div className="complaint-info">
                                    <span className="complaint-type">{complaint.complaintType}</span>
                                    <span className="complaint-date">
                                        {new Date(complaint.complaintDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <span className={`complaint-status status-${complaint.status?.toLowerCase()}`}>
                                    {complaint.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data">No complaints found</p>
                )}
            </div>
        </div>
    );
}

export default CustomerDashboard;
