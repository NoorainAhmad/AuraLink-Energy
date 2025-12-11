import api from './api';

const authService = {
    /**
     * Unified login for both admin and customer
     */
    login: async (userId, password, role) => {
        const response = await api.post('/auth/login', {
            userId,
            password,
            role
        });
        return response.data;
    },

    /**
     * Unified registration for both admin and customer
     */
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    /**
     * Logout user
     */
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    },

    /**
     * Get current logged-in user
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    /**
     * Get current user role
     */
    getRole: () => {
        return localStorage.getItem('role');
    },

    /**
     * Check if user is admin
     */
    isAdmin: () => {
        return localStorage.getItem('role') === 'admin';
    },

    /**
     * Check if user is customer
     */
    isCustomer: () => {
        return localStorage.getItem('role') === 'customer';
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        return localStorage.getItem('user') !== null;
    },

    /**
     * Store user data after login
     */
    storeUserData: (userData, role) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', role);
    }
};

export default authService;
