import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  // Get current user info
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      const response = await api.get('/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const apiService = {
  // Get dashboard data (protected route example)
  getDashboardData: async () => {
    try {
      const response = await api.get('/dashboard-data');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;