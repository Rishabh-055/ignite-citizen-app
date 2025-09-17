import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Mock API for demo
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic API functions
export const api = {
  // GET request
  get: <T>(url: string): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url);
  },

  // POST request
  post: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data);
  },

  // PUT request
  put: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data);
  },

  // DELETE request
  delete: <T>(url: string): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url);
  },

  // PATCH request
  patch: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return apiClient.patch<T>(url, data);
  },
};

export default apiClient;