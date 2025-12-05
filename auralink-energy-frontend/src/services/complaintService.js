import api from './api';

const complaintService = {
    // Get all complaints
    getAllComplaints: async () => {
        const response = await api.get('/complaints');
        return response.data;
    },

    // Get complaint by ID
    getComplaintById: async (id) => {
        const response = await api.get(`/complaints/${id}`);
        return response.data;
    },

    // Get complaints by customer ID
    getComplaintsByCustomerId: async (customerId) => {
        const response = await api.get(`/complaintsById/${customerId}`);
        return response.data;
    },

    // Register new complaint
    registerComplaint: async (complaint) => {
        const response = await api.post('/complaints', complaint);
        return response.data;
    },

    // Update complaint
    updateComplaint: async (id, complaint) => {
        const response = await api.put(`/complaints/${id}`, complaint);
        return response.data;
    },

    // Delete complaint
    deleteComplaint: async (id) => {
        const response = await api.delete(`/complaints/${id}`);
        return response.data;
    },
};

export default complaintService;
