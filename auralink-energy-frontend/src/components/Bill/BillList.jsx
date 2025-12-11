import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import billService from '../../services/billService';
import authService from '../../services/authService';

function BillList() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentRole = authService.getRole();
        const currentUser = authService.getCurrentUser();
        setRole(currentRole);
        setUser(currentUser);
        fetchBills();
    }, []);

    const fetchBills = async () => {
        try {
            const data = await billService.getAllBills();
            setBills(data);
        } catch (err) {
            setError('Failed to load bills');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (consumerNumber) => {
        if (window.confirm('Are you sure you want to delete this bill?')) {
            try {
                await billService.deleteBill(consumerNumber);
                fetchBills();
            } catch (err) {
                alert('Failed to delete bill');
            }
        }
    };

    const handlePayBill = async (bill) => {
        try {
            const updatedBill = { ...bill, billStatus: 'Paid' };
            await billService.updateBill(bill.consumerNumber, updatedBill);
            fetchBills();
        } catch (err) {
            alert('Failed to update bill status');
        }
    };

    const filteredBills = bills
        .filter(bill => {
            // If customer, only show their bills
            if (role === 'customer' && user) {
                // Convert both to strings to handle type mismatch (API returns string, localStorage may have number)
                return String(bill.consumerNumber).trim() === String(user.consumerNumber).trim();
            }
            // Admin sees all bills
            return true;
        })
        .filter(bill =>
            bill.consumerNumber?.toString().includes(searchTerm) ||
            bill.billNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        );

    if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>{role === 'admin' ? 'All Bills' : 'My Bills'}</h1>
                {role === 'admin' && (
                    <Link to="/bills/add" className="btn btn-primary">+ Add Bill</Link>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <div className="card-body">
                    <div className="search-bar">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search by consumer number or bill number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Bill Number</th>
                                    <th>Consumer Number</th>
                                    <th>Billing Period</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBills.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No bills found</td>
                                    </tr>
                                ) : (
                                    filteredBills.map(bill => (
                                        <tr key={bill.billNumber}>
                                            <td>{bill.billNumber}</td>
                                            <td>{bill.consumerNumber}</td>
                                            <td>{bill.billingPeriod}</td>
                                            <td>₹{bill.billAmount?.toFixed(2)}</td>
                                            <td>{bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : 'N/A'}</td>
                                            <td>
                                                <span className={`badge ${bill.billStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                                                    {bill.billStatus}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {bill.billStatus !== 'Paid' && (
                                                        <button
                                                            onClick={() => handlePayBill(bill)}
                                                            className="btn btn-sm btn-success"
                                                        >
                                                            Pay
                                                        </button>
                                                    )}
                                                    {role === 'admin' && (
                                                        <button
                                                            onClick={() => handleDelete(bill.consumerNumber)}
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillList;
