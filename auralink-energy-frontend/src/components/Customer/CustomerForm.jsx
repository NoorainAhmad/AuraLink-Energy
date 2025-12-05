import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customerService from '../../services/customerService';

function CustomerForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        consumerNumber: '',
        fullName: '',
        address: '',
        email: '',
        mobileNumber: '',
        customerType: 'Residential',
        userId: '',
        password: '',
        status: 'Active'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            fetchCustomer();
        }
    }, [id]);

    const fetchCustomer = async () => {
        try {
            const data = await customerService.getCustomerById(id);
            setFormData(data);
        } catch (err) {
            setError('Failed to load customer');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await customerService.updateCustomer(id, formData);
            } else {
                await customerService.addCustomer(formData);
            }
            navigate('/customers');
        } catch (err) {
            setError(isEdit ? 'Failed to update customer' : 'Failed to add customer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>{isEdit ? 'Edit Customer' : 'Add New Customer'}</h1>
            </div>

            <div className="card">
                <div className="card-body">
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-2">
                            <div className="form-group">
                                <label className="form-label">Consumer Number *</label>
                                <input
                                    type="number"
                                    name="consumerNumber"
                                    className="form-input"
                                    value={formData.consumerNumber}
                                    onChange={handleChange}
                                    required
                                    disabled={isEdit}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-input"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    className="form-input"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    maxLength="10"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Customer Type *</label>
                                <select
                                    name="customerType"
                                    className="form-select"
                                    value={formData.customerType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status *</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">User ID *</label>
                                <input
                                    type="text"
                                    name="userId"
                                    className="form-input"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    required
                                    disabled={isEdit}
                                />
                            </div>

                            {!isEdit && (
                                <div className="form-group">
                                    <label className="form-label">Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-input"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <textarea
                                name="address"
                                className="form-textarea"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <div className="flex-gap-md" style={{ marginTop: 'var(--spacing-xl)' }}>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : (isEdit ? 'Update Customer' : 'Add Customer')}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/customers')}
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

export default CustomerForm;
