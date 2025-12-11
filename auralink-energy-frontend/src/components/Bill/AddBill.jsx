import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import billService from '../../services/billService';

function AddBill() {
    const navigate = useNavigate();

    const [bill, setBill] = useState({
        billNumber: `BILL${Date.now()}`,
        consumerNumber: '',
        billingPeriod: '',
        billAmount: '',
        dueDate: '',
        billStatus: 'Pending',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await billService.addBill(bill);
            setSuccess('Bill added successfully!');
            setTimeout(() => {
                navigate('/bills');
            }, 1500);
        } catch (err) {
            setError('Failed to add bill. Please try again.');
            console.error('Error adding bill:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Add New Bill</h1>
                <Link to="/bills" className="btn btn-secondary">Back to Bills</Link>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-2">
                            <div className="form-group">
                                <label className="form-label">Bill Number *</label>
                                <input
                                    type="text"
                                    name="billNumber"
                                    className="form-input"
                                    value={bill.billNumber}
                                    onChange={(e) => setBill({ ...bill, billNumber: e.target.value })}
                                    required
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Consumer Number *</label>
                                <input
                                    type="text"
                                    name="consumerNumber"
                                    className="form-input"
                                    value={bill.consumerNumber}
                                    onChange={(e) => setBill({ ...bill, consumerNumber: e.target.value })}
                                    placeholder="Enter consumer number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Billing Period *</label>
                                <input
                                    type="text"
                                    name="billingPeriod"
                                    className="form-input"
                                    value={bill.billingPeriod}
                                    onChange={(e) => setBill({ ...bill, billingPeriod: e.target.value })}
                                    placeholder="e.g., January 2025"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bill Amount (₹) *</label>
                                <input
                                    type="number"
                                    name="billAmount"
                                    className="form-input"
                                    value={bill.billAmount}
                                    onChange={(e) => setBill({ ...bill, billAmount: e.target.value })}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Due Date *</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    className="form-input"
                                    value={bill.dueDate}
                                    onChange={(e) => setBill({ ...bill, dueDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bill Status *</label>
                                <select
                                    name="billStatus"
                                    className="form-select"
                                    value={bill.billStatus}
                                    onChange={(e) => setBill({ ...bill, billStatus: e.target.value })}
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex-gap-md" style={{ marginTop: 'var(--spacing-xl)' }}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Adding Bill...' : 'Add Bill'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/bills')}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBill;
