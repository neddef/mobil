import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for API calls
const API_URL = 'http://192.168.1.19:5000/api'; // For Android emulator
// const API_URL = 'http://localhost:5000/api'; // For iOS simulator
// const API_URL = 'http://10.23.2.102:5000/api'; // Gerçek IP adresi (Metro çıktısındaki IP ile aynı)

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // Updated to match new backend's Authorization header format
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} from ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
    }
    return Promise.reject(error);
  }
);

// API endpoints for cars
export const carAPI = {
  getAllCars: () => api.get('/cars'),
  getCarById: (id) => api.get(`/cars/${id}`),
  searchCars: (params) => api.get('/cars/search', { params }),
  createCar: (carData) => api.post('/cars', carData),
  updateCar: (id, carData) => api.put(`/cars/${id}`, carData),
  deleteCar: (id) => api.delete(`/cars/${id}`),
};

// API endpoints for parts
export const partAPI = {
  getAllParts: () => api.get('/parts'),
  getPartById: (id) => api.get(`/parts/${id}`),
  searchParts: (params) => api.get('/parts/search', { params }),
  createPart: (partData) => api.post('/parts', partData),
  updatePart: (id, partData) => api.put(`/parts/${id}`, partData),
  deletePart: (id) => api.delete(`/parts/${id}`),
};

// API endpoints for rentals
export const rentalAPI = {
  getAllRentals: () => api.get('/rentals'),
  getRentalById: (id) => api.get(`/rentals/${id}`),
  searchRentals: (params) => api.get('/rentals/search', { params }),
  createRental: (rentalData) => api.post('/rentals', rentalData),
  updateRental: (id, rentalData) => api.put(`/rentals/${id}`, rentalData),
  deleteRental: (id) => api.delete(`/rentals/${id}`),
  bookRental: (id, bookingData) => api.post(`/rentals/${id}/book`, bookingData),
};

// API endpoints for users - updated for new backend
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  addToFavorites: (favoriteData) => api.post('/users/favorites', favoriteData),
  removeFromFavorites: (favoriteData) => api.delete('/users/favorites', { data: favoriteData }),
};

// Helper to handle authentication - updated to match new backend response format
export const authService = {
  login: async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      // Store token and user info
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      // Store token and user info
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },
  
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  },
  
  getCurrentUser: async () => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default {
  carAPI,
  partAPI,
  rentalAPI,
  authAPI,
  authService,
}; 