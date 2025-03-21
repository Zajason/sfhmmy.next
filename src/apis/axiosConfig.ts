import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// Configure API URL based on environment
const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://127.0.0.1:8000/api'  // Local development server
  : 'https://sfhmmy.gr/api';     // Production server

// Create an axios instance with consistent config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 50000, // 15 seconds timeout
  withCredentials: true // Important: send cookies when making requests across origins
});

// Set up axios interceptor to add auth token to all requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`);
      console.log("Token exists:", !!token);
    }
    
    if (token) {
      // Set the Authorization header with the token
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common error scenarios
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      
      // Handle email verification errors (403)
      if (status === 403 && 
          error.response.data && 
          typeof error.response.data === 'object' &&
          'message' in error.response.data &&
          typeof error.response.data.message === 'string' &&
          error.response.data.message.includes('verify')) {
        
        // Save current location for redirect after verification
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (currentPath && !currentPath.includes('/emailVerification') && !currentPath.includes('/signIn')) {
            sessionStorage.setItem('redirectAfterVerification', currentPath);
          }
          
          // Show toast and redirect to verification page if not already there
          if (!window.location.pathname.includes('/emailVerification')) {
            toast.warning('Please verify your email address before continuing');
            window.location.href = '/emailVerification';
          }
        }
      }
      
      // Handle authentication errors (401)
      else if (status === 401) {
        localStorage.removeItem('authToken');
        
        if (typeof window !== 'undefined' && 
            !window.location.pathname.includes('/signIn') && 
            !window.location.pathname.includes('/register')) {
          toast.error('Your session has expired. Please sign in again.');
          window.location.href = '/signIn';
        }
      }
      
      // Server errors
      else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      }
    }
    // Network errors
    else if (error.message === 'Network Error') {
      toast.error('Network error. Please check your internet connection.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_URL }; 