import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 30000, // 30 seconds timeout
})


// Request Interceptor: Add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request for debugging
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.params)

    return config
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error)
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data)
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })

    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      toast.error('Session expired. Please login again.')
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else if (error.message === 'Network Error') {
      toast.error('Network error. Please check your connection.')
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please try again.')
    } else {
      toast.error('Something went wrong!')
    }

    return Promise.reject(error)
  }
)

export const apiCalls = {
  // ============ AUTHENTICATION ============
  signup: (data) => api.post('/admin/users', data),
  login: (data) => api.post('/admin/login', data),

  // ============ USERS ============
  // getUsers: (params) => api.get('/api/admin/users', { params }),
  // updateUser: (id, data) => api.put(`/api/admin/users/${id}`, data),
  // deleteUser: (id) => api.delete(`/api/admin/users/${id}`),


getUsers: (params) => api.get('/api/admin/users', { params }),
createUser: (data) => api.post('/api/admin/users', data),
updateUser: (id, data) => api.put(`/api/admin/users/${id}`, data),
deleteUser: (id) => api.delete(`/api/admin/users/${id}`),

  // ============ SUPPLIERS ============
  createSupplier: (data) => api.post('/api/admin/suppliers', data),
  uploadSupplier: (formData) => api.post('/api/admin/suppliers/suppliers', formData),
  getSuppliers: (params) => api.get('/api/admin/suppliers', { params }),
  getSupplierById: (id) => api.get(`/api/admin/suppliers/${id}`),
  updateSupplier: (id, data) => api.put(`/api/admin/suppliers/${id}`, data),
  deleteSupplier: (id) => api.delete(`/api/admin/suppliers/${id}`),
  searchSuppliersByName: (params) => api.get('/api/admin/suppliers/search/name', { params }),
  getSuppliersWithLogo: (params) => api.get('/api/admin/suppliers/name/logo', { params }),
  searchSuppliersByQuery: (params) => api.get('/api/admin/suppliers/search/q', { params }),

  // ============ CATEGORIES ============
  // addCategory: (data) => api.post('/api/admin/cat/categories', data),
  // createCategoryWithImage: (formData) => api.post('/api/admin/cat/category', formData),
  // getCategories: () => api.get('/api/admin/cat/categories'),
  // getCategoryById: (id) => api.get(`/api/admin/cat/categories/${id}`),
  // updateCategory: (id, data) => api.put(`/api/admin/cat/categories/${id}`, data),
  // deleteCategory: (id) => api.delete(`/api/admin/cat/categories/${id}`),
  // getAllCategoriesPaginated: (params) => api.get('/api/admin/cat/category', { params }),
  // searchCategories: (params) => api.get('/api/admin/cat/search', { params }),
  // publicSearchCategories: (params) => api.get('/api/category/search', { params }),


  // ============ CATEGORIES ============
  addCategory: (data) => api.post('/api/admin/cat/categories', data),
  createCategoryWithImage: (formData) => api.post('/api/admin/cat/category', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getCategories: () => api.get('/api/admin/cat/categories'),
  getCategoryById: (id) => api.get(`/api/admin/cat/categories/${id}`),
  updateCategory: (id, data) => api.put(`/api/admin/cat/categories/${id}`, data),
  updateCategoryWithImage: (id, formData) => api.put(`/api/admin/cat/categories/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteCategory: (id) => api.delete(`/api/admin/cat/categories/${id}`),
  getAllCategoriesPaginated: (params) => api.get('/api/admin/cat/category', { params }),
  searchCategories: (params) => api.get('/api/admin/cat/search', { params }),
  publicSearchCategories: (params) => api.get('/api/category/search', { params }),




  // ============ SUBCATEGORIES ============
  addSubcategory: (categoryId, data) => api.post(`/api/admin/sub/categories/${categoryId}/subcategories`, data),
  getSubcategoriesByCategory: (categoryId) => api.get(`/api/admin/sub/categories/${categoryId}/subcategories`),
  updateSubcategory: (id, data) => api.put(`/api/admin/sub/subcategories/${id}`, data),
  deleteSubcategory: (id) => api.delete(`/api/admin/sub/subcategories/${id}`),
  getAllSubcategories: (params) => api.get('/api/admin/sub/subcategories', { params }),

  // // ============ PRODUCTS ============
  // bulkUploadProducts: (supplierId, formData) => api.post(`/api/admin/products/bulk-upload/${supplierId}`, formData),
  // createProduct: (data) => api.post('/api/admin/products', data),
  // getProducts: (params) => api.get('/api/admin/products', { params }),
  // getProductById: (id) => api.get(`/api/admin/products/${id}`),
  // updateProduct: (id, data) => api.put(`/api/admin/products/${id}`, data),
  // deleteProduct: (id) => api.delete(`/api/admin/products/${id}`),
  // searchProductsByQuery: (params) => api.get('/api/admin/products/search/q', { params }),
  // getProductsByCategory: (categoryName, params) => api.get(`/api/admin/products/category/${categoryName}`, { params }),
  // getProductsBySubcategory: (subcategoryName, params) => api.get(`/api/admin/products/subcategory/${subcategoryName}`, { params }),
  // getAllCategoriesFromProducts: () => api.get('/api/admin/products/cat/categories'),
  // getAllSubcategoriesFromProducts: () => api.get('/api/admin/products/sub/subcategories'),










  // ============ CATEGORIES & SUBCATEGORIES ============
  getAllCategories: () => api.get('/api/admin/cat/category'),
  getSubcategoriesByCategory: (categoryId) => api.get(`/api/admin/subcategories/${categoryId}`),

  // ============ PRODUCTS ============
  // bulkUploadProducts: (supplierId, formData) => api.post(`/api/admin/products/bulk-upload/${supplierId}`, formData),
  // createProduct: (data) => api.post('/api/admin/products', data),
  // getProducts: (params) => api.get('/api/admin/products', { params }),
  // getProductById: (id) => api.get(`/api/admin/products/${id}`),
  // updateProduct: (id, data) => api.put(`/api/admin/products/${id}`, data),
  // deleteProduct: (id) => api.delete(`/api/admin/products/${id}`),
  // searchProductsByQuery: (params) => api.get('/api/admin/products/search/q', { params }),
  // getProductsByCategory: (categoryName, params) => api.get(`/api/admin/products/category/${categoryName}`, { params }),
  // getProductsBySubcategory: (subcategoryName, params) => api.get(`/api/admin/products/subcategory/${subcategoryName}`, { params }),
  // getAllCategoriesFromProducts: () => api.get('/api/admin/products/cat/categories'),
  // getAllSubcategoriesFromProducts: () => api.get('/api/admin/products/sub/subcategories'),


// ============ PRODUCTS ============
bulkUploadProducts: (supplierId, formData) => api.post(`/api/admin/products/bulk-upload/${supplierId}`, formData),
createProduct: (data) => api.post('/api/admin/products', data),
getProducts: (params) => api.get('/api/admin/products', { params }),
getProductById: (id) => api.get(`/api/admin/products/${id}`),
updateProduct: (id, data) => api.put(`/api/admin/products/${id}`, data),
deleteProduct: (id) => api.delete(`/api/admin/products/${id}`),
searchProductsByQuery: (params) => api.get('/api/admin/products/search/q', { params }),
getProductsByCategory: (categoryName, params) => api.get(`/api/admin/products/category/${categoryName}`, { params }),
getProductsBySubcategory: (subcategoryName, params) => api.get(`/api/admin/products/subcategory/${subcategoryName}`, { params }),

// FIXED: Use clean paths
getAllCategories: () => api.get('/api/admin/products/categories'),  // Updated from /cat/categories
getAllSubcategories: () => api.get('/api/admin/products/subcategories'),  // Updated from /sub/subcategories

// NEW: Add this method (matches new route)
getSubcategoriesByCategory: (categoryId) => api.get(`/api/admin/products/subcategories/by/${categoryId}`),









  // ============ CLIENTS ============
  // createClient: (data) => api.post('/api/admin/clients', data),
  // getClients: (params) => api.get('/api/admin/clients', { params }),
  // getClientById: (id) => api.get(`/api/admin/clients/${id}`),
  // updateClient: (id, data) => api.put(`/api/admin/clients/${id}`, data),
  // deleteClient: (id) => api.delete(`/api/admin/clients/${id}`),


  // ============ CLIENTS ============
  getClients: (params) => api.get('/api/admin/clients', { params }),
  getClientById: (id) => api.get(`/api/admin/clients/${id}`),
  createClient: (data) => api.post('/api/admin/clients', data),
  updateClient: (id, data) => api.put(`/api/admin/clients/${id}`, data),
  deleteClient: (id) => api.delete(`/api/admin/clients/${id}`),


  // ============ CLIENT HISTORY ============
  addClientHistory: (data) => api.post('/api/admin/clientHistory/add', data),
  getClientHistory: (clientId) => api.get(`/api/admin/clientHistory/${clientId}`),

  // ============ BANNERS ============

  getBanners: (params) => api.get('/api/home', { params }),
  getBannersAdmin: (params) => api.get('/api/home/admin/banner', { params }),
  createBanner: (formData) => api.post('/api/home/banner', formData, { headers: { 'Content-Type': 'multipart/form-data' }}),
  updateBanner: (id, formData) => api.put(`/api/home/admin/banner/${id}`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}),
  deleteBanner: (id) => api.delete(`/api/home/admin/banner/${id}`),

  // ============ SEARCH ============
  globalSearch: (params) => api.get('/api/search', { params }),
  searchProductsByName: (params) => api.get('/api/products/search', { params }),
  // searchProductsByItemCode: (params) => api.get('/api/admin/products/search/q', { params }), // Using existing endpoint
  searchProductsByItemCode: (params) => api.get('/api/itemcode/search', { params }), // Corrected endpoint
  searchProductsByCategoryName: (params) => api.get('/api/admin/products/category/search', { params }),
  // searchProductsBySubcategoryName: (params) => api.get('/api/admin/products/subcategory/search', { params }),
  searchProductsBySubcategoryName: (params) => api.get('/api/subcategory/search', { params }), // Corrected endpoint
  searchProductsBySupplierName: (params) => api.get('/api/supplier/search', { params }),

  // ============ DASHBOARD STATS ============
  getDashboardStats: () => Promise.all([
    api.get('/api/admin/suppliers?page=1&limit=1'),
    api.get('/api/admin/cat/categories'),
    api.get('/api/admin/products?page=1&limit=1'),
    api.get('/api/admin/clients?page=1&limit=1'),
    api.get('/api/admin/banner'),
    api.get('/api/admin/users?page=1&perPage=1')
  ])
}

// Utility function for file uploads
export const handleFileUpload = async (file, uploadFunction, onProgress = null) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await uploadFunction(formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

// Utility function for API health check
export const checkAPIHealth = async () => {
  try {
    const response = await api.get('/api/home')
    return {
      status: 'healthy',
      data: response.data
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message
    }
  }
}

// Export api instance for direct use if needed
export default api