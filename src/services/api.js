import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  login: async (type, credentials) => {
    const response = await api.post(`/${type}/login`, credentials);
    if (response.data.userData.token) {
      localStorage.setItem('token', response.data.userData.token);
    }
    return response.data;
  },

  register: async (type, userData) => {
    const response = await api.post(`/${type}/register`, userData);
    return response.data;
  },
  fetchProducts: async () => {
    const response = await api.get('/products');
    return response.data.products;
  },

  createProduct: async (productData) => {
    const formData = new FormData();
    
    Object.keys(productData).forEach(key => {
      if (key !== 'image' && key !== 'productFile') {
        formData.append(key, productData[key]);
      }
    });
    
    if (productData.image) {
      formData.append('image', productData.image);
    }
    if (productData.productFile) {
      formData.append('pdf', productData.productFile);
    }

    const response = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getUserProfile: async (type) => {
    const response = await api.get(`/${type}/me`);
    return response.data.result;
  },
  addToCart: async (productId, quantity) => {
    const response = await api.post('/buyer/cart/add', { productId, quantity });
    return response.data;
  },

  getCart: async (buyerId) => {
    const response = await api.get(`/buyer/cart/${buyerId}`);
    return response.data;
  },

  checkout: async (buyerId) => {
    const response = await api.post('/buyer/checkout', { buyerId });
    return response.data;
  }
};