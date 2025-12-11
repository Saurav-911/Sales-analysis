import axios from './axios';

export const productsAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await axios.get('/products');
    return response.data;
  },

  // Create new product
  createProduct: async (productData) => {
    const response = await axios.post('/products', productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await axios.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  },

  // Upload Excel file
  uploadExcel: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get analytics data for charts
  getAnalytics: async () => {
    const response = await axios.get('/products/analytics/summary');
    return response.data;
  },
};