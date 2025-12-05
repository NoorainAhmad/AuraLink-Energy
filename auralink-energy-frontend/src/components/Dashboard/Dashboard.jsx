import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import billService from '../../services/billService';
import complaintService from '../../services/complaintService';
import './Dashboard.css';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [bills, setBills] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (user.consumerNumber) {
                const billData = await billService.getBillsByConsumerNumber(user.consumerNumber);
                setBills(billData);
                const complaintData = await complaintService.getComplaintsByCustomerId(user.consumerNumber.toString());
                setComplaints(complaintData);
            }
        } catch (err) {
            console.error('Failed to load dashboard data', err);
        } finally {
            setLoading(false);
        }
    };

    const unpaidBills = bills.filter(b => b.billStatus !== 'Paid');
    const pendingComplaints = complaints.filter(c => c.complaintStatus === 'Pending');

    if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="dashboard-header">
                <h1>Welcome, {user.fullName}!</h1>
                <p className="text-secondary">Consumer Number: {user.consumerNumber}</p>
            </div>

            <div className="grid grid-3 dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>{bills.length}</h3>
                        <p>Total Bills</p>
                    </div>
                </div>

                <div className="stat-card warning">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-content">
                        <h3>{unpaidBills.length}</h3>
                        <p>Unpaid Bills</p>
                    </div>
                </div>

                <div className="stat-card info">
                    <div className="stat-icon">📝</div>
                    <div className="stat-content">
                        <h3>{complaints.length}</h3>
                        <p>Complaints</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Bills</h3>
                        <Link to="/bills" className="btn btn-sm btn-primary">View All</Link>
                    </div>
                    <div className="card-body">
                        {unpaidBills.length === 0 ? (
                            <p className="text-muted">No unpaid bills</p>
                        ) : (
                            <div className="bill-list">
                                {unpaidBills.slice(0, 3).map(bill => (
                                    <div key={bill.billNumber} className="bill-item">
                                        <div>
                                            <strong>{bill.billNumber}</strong>
                                            <p className="text-sm text-muted">{bill.billingPeriod}</p>
                                        </div>
                                        <div className="text-right">
                                            <strong>₹{bill.billAmount?.toFixed(2)}</strong>
                                            <p className="text-sm text-muted">
                                                Due: {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Complaints</h3>
                        <Link to="/complaints" className="btn btn-sm btn-primary">View All</Link>
                    </div>
                    <div className="card-body">
                        {complaints.length === 0 ? (
                            <p className="text-muted">No complaints</p>
                        ) : (
                            <div className="complaint-list">
                                {complaints.slice(0, 3).map(complaint => (
                                    <div key={complaint.complaintId} className="complaint-item">
                                        <div>
                                            <strong>{complaint.complaintType}</strong>
                                            <p className="text-sm text-muted">{complaint.description?.substring(0, 50)}...</p>
                                        </div>
                                        <span className={`badge ${complaint.complaintStatus === 'Resolved' ? 'badge-success' :
                                                complaint.complaintStatus === 'In Progress' ? 'badge-info' :
                                                    'badge-warning'
                                            }`}>
                                            {complaint.complaintStatus}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <Link to="/bills" className="action-card">
                    <span className="action-icon">💳</span>
                    <h4>Pay Bills</h4>
                    <p>View and pay your electricity bills</p>
                </Link>
                <Link to="/complaints/add" className="action-card">
                    <span className="action-icon">📞</span>
                    <h4>Register Complaint</h4>
                    <p>Report an issue or concern</p>
                </Link>
                <Link to="/customers" className="action-card">
                    <span className="action-icon">👤</span>
                    <h4>My Profile</h4>
                    <p>View and update your information</p>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
