import api from './api';

const customerService = {
    // Login
    login: async (userId, password) => {
        const response = await api.get(`/login/${userId}/${password}`);
        return response.data;
    },

    // Get all customers
    getAllCustomers: async () => {
        const response = await api.get('/customers');
        return response.data;
    },

    // Get customer by ID
    getCustomerById: async (consumerNumber) => {
        const response = await api.get(`/customers/${consumerNumber}`);
        return response.data;
    },

    // Add new customer
    addCustomer: async (customer) => {
        const response = await api.post('/customers', customer);
        return response.data;
    },

    // Update customer
    updateCustomer: async (id, customer) => {
        const response = await api.put(`/customers/${id}`, customer);
        return response.data;
    },

    // Delete customer
    deleteCustomer: async (id) => {
        const response = await api.post('/deleteCustomer', id);
        return response.data;
    },
};

export default customerService;
