import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import complaintService from '../../services/complaintService';

function ComplaintList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const data = await complaintService.getAllComplaints();
            setComplaints(data);
        } catch (err) {
            setError('Failed to load complaints');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this complaint?')) {
            try {
                await complaintService.deleteComplaint(id);
                fetchComplaints();
            } catch (err) {
                alert('Failed to delete complaint');
            }
        }
    };

    const handleStatusUpdate = async (complaint, newStatus) => {
        try {
            const updated = { ...complaint, complaintStatus: newStatus };
            await complaintService.updateComplaint(complaint.complaintId, updated);
            fetchComplaints();
        } catch (err) {
            alert('Failed to update complaint status');
        }
    };

    if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Complaint Management</h1>
                <Link to="/complaints/add" className="btn btn-primary">+ Register Complaint</Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <div className="card-body">
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Complaint ID</th>
                                    <th>Customer Number</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No complaints found</td>
                                    </tr>
                                ) : (
                                    complaints.map(complaint => (
                                        <tr key={complaint.complaintId}>
                                            <td>{complaint.complaintId}</td>
                                            <td>{complaint.customerNumber}</td>
                                            <td>{complaint.complaintType}</td>
                                            <td>{complaint.category}</td>
                                            <td>{complaint.description?.substring(0, 50)}...</td>
                                            <td>
                                                <span className={`badge ${complaint.complaintStatus === 'Resolved' ? 'badge-success' :
                                                        complaint.complaintStatus === 'In Progress' ? 'badge-info' :
                                                            'badge-warning'
                                                    }`}>
                                                    {complaint.complaintStatus}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {complaint.complaintStatus === 'Pending' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(complaint, 'In Progress')}
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            Start
                                                        </button>
                                                    )}
                                                    {complaint.complaintStatus === 'In Progress' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(complaint, 'Resolved')}
                                                            className="btn btn-sm btn-success"
                                                        >
                                                            Resolve
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(complaint.complaintId)}
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

export default ComplaintList;
