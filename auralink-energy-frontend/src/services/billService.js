import api from './api';

const billService = {
    // Get all bills
    getAllBills: async () => {
        const response = await api.get('/bills');
        return response.data;
    },

    // Get bills by consumer number
    getBillsByConsumerNumber: async (consumerNumber) => {
        const response = await api.get(`/bills/${consumerNumber}`);
        return response.data;
    },

    // Add new bill
    addBill: async (bill) => {
        const response = await api.post('/bills', bill);
        return response.data;
    },

    // Update bill
    updateBill: async (consumerNumber, bill) => {
        const response = await api.put(`/bills/${consumerNumber}`, bill);
        return response.data;
    },

    // Delete bill
    deleteBill: async (consumerNumber) => {
        const response = await api.delete(`/bills/${consumerNumber}`);
        return response.data;
    },
};

export default billService;
