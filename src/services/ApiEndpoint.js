import axios from 'axios';

// Axios instance with base configuration
const instance = axios.create({
  baseURL: 'https://rbac-backend-1rti.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // To handle cookies/session
});

// Generic API methods
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteUser = (url) => instance.delete(url);

// Specific API endpoints
export const updateUserRole = (id, role) => 
  post('/api/admin/update-role', { id, role }); // Update user role endpoint

export const fetchUsers = () => 
  get('/api/admin/getuser'); // Fetch all users

export const removeUser = (id) => 
  deleteUser(`/api/admin/delete/${id}`); // Delete a user

export const logout = () => 
  post('/api/auth/logout'); // Admin logout

// Request interceptor
instance.interceptors.request.use(
  function (config) {
    // Uncomment for debugging requests
    // console.log('Request:', config.method, config.url);
    return config;
  },
  function (error) {
    // Uncomment for debugging request errors
    // console.error('Request Error:', error);
    //return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    // Uncomment for debugging responses
    // console.log('Response:', response.status, response.config.url, response.data);
    return response;
  },
  function (error) {
    // Uncomment for debugging response errors
    // console.error('Response Error:', error.response?.status, error.config?.url);
    //return Promise.reject(error);
  }
);
