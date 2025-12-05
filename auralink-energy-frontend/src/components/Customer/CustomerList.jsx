import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customerService from '../../services/customerService';
import './CustomerList.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await customerService.getAllCustomers();
            setCustomers(data);
        } catch (err) {
            setError('Failed to load customers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await customerService.deleteCustomer(id);
                fetchCustomers();
            } catch (err) {
                alert('Failed to delete customer');
            }
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.consumerNumber?.toString().includes(searchTerm) ||
        customer.userId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Customer Management</h1>
                <Link to="/customers/add" className="btn btn-primary">+ Add Customer</Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <div className="card-body">
                    <div className="search-bar">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search by name, consumer number, or user ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Consumer Number</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No customers found</td>
                                    </tr>
                                ) : (
                                    filteredCustomers.map(customer => (
                                        <tr key={customer.consumerNumber}>
                                            <td>{customer.consumerNumber}</td>
                                            <td>{customer.fullName}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.mobileNumber}</td>
                                            <td><span className="badge badge-info">{customer.customerType}</span></td>
                                            <td>
                                                <span className={`badge ${customer.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link to={`/customers/${customer.consumerNumber}`} className="btn btn-sm btn-secondary">
                                                        View
                                                    </Link>
                                                    <Link to={`/customers/edit/${customer.consumerNumber}`} className="btn btn-sm btn-primary">
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(customer.consumerNumber)}
                                                        className="btn btn-sm btn-danger"
                                                    >
                                                        Delete
                                                    </button>
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

export default CustomerList;
