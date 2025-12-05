import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import complaintService from '../../services/complaintService';

function ComplaintForm() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [formData, setFormData] = useState({
        complaintId: `CMP${Date.now()}`,
        complaintType: '',
        category: '',
        description: '',
        preferredContactMethod: 'Email',
        contactDetails: user.email || '',
        resolutionTime: '24 hours',
        customerNumber: user.consumerNumber?.toString() || '',
        complaintStatus: 'Pending',
        assignedStaff: 'Not Assigned'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
            await complaintService.registerComplaint(formData);
            navigate('/complaints');
        } catch (err) {
            setError('Failed to register complaint');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Register New Complaint</h1>
            </div>

            <div className="card">
                <div className="card-body">
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-2">
                            <div className="form-group">
                                <label className="form-label">Complaint ID</label>
                                <input
                                    type="text"
                                    name="complaintId"
                                    className="form-input"
                                    value={formData.complaintId}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Customer Number *</label>
                                <input
                                    type="text"
                                    name="customerNumber"
                                    className="form-input"
                                    value={formData.customerNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Complaint Type *</label>
                                <select
                                    name="complaintType"
                                    className="form-select"
                                    value={formData.complaintType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Billing">Billing</option>
                                    <option value="Power Outage">Power Outage</option>
                                    <option value="Meter Issue">Meter Issue</option>
                                    <option value="Connection">Connection</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category *</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Service">Service</option>
                                    <option value="Billing">Billing</option>
                                    <option value="General">General</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Preferred Contact Method *</label>
                                <select
                                    name="preferredContactMethod"
                                    className="form-select"
                                    value={formData.preferredContactMethod}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Email">Email</option>
                                    <option value="Phone">Phone</option>
                                    <option value="SMS">SMS</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contact Details *</label>
                                <input
                                    type="text"
                                    name="contactDetails"
                                    className="form-input"
                                    value={formData.contactDetails}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description *</label>
                            <textarea
                                name="description"
                                className="form-textarea"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className="flex-gap-md" style={{ marginTop: 'var(--spacing-xl)' }}>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Submitting...' : 'Register Complaint'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/complaints')}
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

export default ComplaintForm;
