import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';
import { 
  LoginCredentials, 
  RegistrationData, 
  LoginResponse, 
  UserData, 
  PasswordChangeData,
  VerificationStatus
} from '../types/authTypes';
import { ApiResponse, ApiError } from '../types/apiTypes';

/**
 * Stores the authentication token in localStorage
 */
export const storeAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
  console.log('Token stored in localStorage');
};

/**
 * Retrieves the authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Removes the authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('pendingAuthToken');
  sessionStorage.removeItem('pendingVerificationEmail');
  console.log('Token removed from localStorage');
};

/**
 * Checks if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Login user
 * @param credentials User login credentials
 * @returns Login response containing token and user data
 */
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('Attempting login with:', credentials.email);
    
    const response = await axiosInstance.post<LoginResponse>('/login', credentials);
    
    // Extract token from response
    const token = response.data.token || response.data.access_token;
    
    if (!token) {
      throw new Error('No token received from server');
    }
    
    // Don't store token yet if we need to verify email first
    // Check if the user's email is verified
    const verificationStatus = await checkEmailVerificationStatus(token);
    
    if (verificationStatus.verified) {
      // Email is verified - store token and complete login
      storeAuthToken(token);
    } else {
      // Store the token in session storage for verification
      sessionStorage.setItem('pendingAuthToken', token);
      sessionStorage.setItem('pendingVerificationEmail', credentials.email);
      
      // Show message and let calling code handle redirection
      toast.info('Please verify your email before signing in');
    }
    
    return { token, user: response.data.user };
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    
    // Provide user-friendly error message
    const errorMessage = error.response?.data?.message || 
                         error.response?.status === 401 ? 'Invalid email or password' : 
                         error.message === 'Network Error' ? 'Cannot connect to the server' :
                         'An error occurred during login';
    
    throw new Error(errorMessage);
  }
};

/**
 * Register a new user
 * @param userData User registration data
 * @returns Registration response
 */
export const registerUser = async (userData: RegistrationData): Promise<LoginResponse> => {
  try {
    console.log('Attempting registration with:', userData.email);
    
    // Ensure password confirmation exists
    const registrationData = {
      ...userData
    };
    
    const response = await axiosInstance.post<LoginResponse>('/register', registrationData);
    
    // Don't store token immediately after registration
    // The user needs to verify their email first
    const token = response.data.token || response.data.access_token;
    
    if (token) {
      // Store token in session storage temporarily
      sessionStorage.setItem('pendingAuthToken', token);
      sessionStorage.setItem('pendingVerificationEmail', userData.email);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    
    // Handle validation errors from the server
    if (error.response?.status === 422 && error.response.data?.errors) {
      const validationErrors = error.response.data.errors;
      const firstErrorField = Object.keys(validationErrors)[0];
      const firstErrorMessage = validationErrors[firstErrorField][0];
      throw new Error(`Validation error: ${firstErrorMessage}`);
    }
    
    // Provide user-friendly error message
    const errorMessage = error.response?.data?.message || 
                         error.message === 'Network Error' ? 'Cannot connect to the server' :
                         'An error occurred during registration';
    
    throw new Error(errorMessage);
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    // Call logout endpoint if API supports it
    await axiosInstance.post('/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always remove tokens, even if API call fails
    removeAuthToken();
  }
};

/**
 * Check if email is verified
 * @param token Optional auth token to use instead of stored token
 * @returns Promise with verification status
 */
export const checkEmailVerificationStatus = async (token?: string | null): Promise<VerificationStatus> => {
  try {
    // Create a custom config if token is provided directly
    let config = {};
    if (token) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
    
    const response = await axiosInstance.get('/email/verification-status', config);
    console.log('Email verification status checked:', response.data);
    return {
      verified: response.data.verified === true,
      email: response.data.email
    };
  } catch (error: any) {
    console.error('Error checking email verification status:', error);
    
    // If it's a 403 error with "not verified" message, this is EXPECTED behavior
    if (error.response && error.response.status === 403) {
      console.info('User email is not verified - returning verified:false');
      return { 
        verified: false, 
        email: error.response.data?.email || null 
      };
    }
    
    // For auth errors (401), assume not verified
    if (error.response && error.response.status === 401) {
      console.info('Authentication error checking verification - assuming not verified');
      return { 
        verified: false,
        email: null,
        authError: true
      };
    }
    
    // For network errors
    if (error.message === 'Network Error') {
      console.info('Network error checking verification - unable to determine status');
      return {
        verified: false,
        email: null,
        networkError: true
      };
    }
    
    // For other errors
    return {
      verified: false,
      email: null
    };
  }
};

/**
 * Resend verification email
 */
/**
 * Resend verification email
 * @param email Optional email address for users who aren't authenticated
 */
export const resendVerificationEmail = async (email?: string): Promise<ApiResponse> => {
  try {
    // Get token from session storage or local storage
    const token = sessionStorage.getItem('pendingAuthToken') || localStorage.getItem('authToken');
    
    // Set up request configuration
    let config = {};
    if (token) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
    
    // Create payload with email if provided
    const payload = email ? { email } : {};
    
    // Make API request with the payload
    const response = await axiosInstance.post('/email/verification-notification', payload, config);
    
    console.log('Verification email resent:', response.data);
    return {
      success: true,
      message: response.data?.message || 'Verification email sent!'
    };
  } catch (error: any) {
    console.error('Error resending verification email:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      return {
        success: false,
        emailNotFound: true,
        message: 'Email address not found. Please register first.'
      };
    }
    
    if (error.response?.status === 429) {
      return {
        success: false,
        tooManyRequests: true,
        message: 'Please wait before requesting another email.'
      };
    }
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      return {
        success: false,
        authError: true,
        message: 'Authentication error. Please try again.'
      };
    }
    
    if (error.message === 'Network Error') {
      return {
        success: false,
        networkError: true,
        message: 'Could not connect to the server. Please check your internet connection.'
      };
    }
    
    // For other errors
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send verification email.'
    };
  }
};

/**
 * Verify email with provided ID and hash
 * @param id User ID
 * @param hash Verification hash
 * @returns API response
 */
export const verifyEmail = async (id: string, hash: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get<ApiResponse>(`/email/verify/${id}/${hash}`);
    console.log('Email verified:', response.data);
    
    // If verification is successful and we have a pending token, move it to localStorage
    const pendingToken = sessionStorage.getItem('pendingAuthToken');
    if (pendingToken) {
      storeAuthToken(pendingToken);
      sessionStorage.removeItem('pendingAuthToken');
      sessionStorage.removeItem('pendingVerificationEmail');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error verifying email:', error.response?.data || error.message);
    
    const errorMessage = error.response?.data?.message || 
                         'Email verification failed. Link may be invalid or expired.';
    
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Change user password
 * @param passwordData Password change data
 * @returns API response
 */
export const changePassword = async (passwordData: PasswordChangeData): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.put<ApiResponse>('/change-password', {
      current_password: passwordData.currentPassword,
      password: passwordData.newPassword,
      password_confirmation: passwordData.newPassword
    });
    
    toast.success('Password changed successfully');
    return response.data;
  } catch (error: any) {
    console.error('Error changing password:', error.response?.data || error.message);
    
    const errorMessage = error.response?.data?.message || 
                         'Failed to change password. Please ensure your current password is correct.';
    
    throw new Error(errorMessage);
  }
};

/**
 * Request password reset
 * @param email User email
 * @returns API response
 */
export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post<ApiResponse>('/forgot-password', { email });
    console.log('Password reset email sent:', response.data);
    toast.success('Password reset email sent! Please check your inbox.');
    return response.data;
  } catch (error: any) {
    console.error('Error sending password reset email:', error.response?.data || error.message);
    
    const errorMessage = error.response?.data?.message || 
                         'Failed to send password reset email. Please try again later.';
    
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Reset password with token
 * @param token Reset token
 * @param password New password
 * @returns API response
 */
export const resetPassword = async (token: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post<ApiResponse>('/reset-password', { token, password });
    console.log('Password reset successful:', response.data);
    toast.success('Password reset successfully! You can now log in with your new password.');
    return response.data;
  } catch (error: any) {
    console.error('Error resetting password:', error.response?.data || error.message);
    
    const errorMessage = error.response?.data?.message || 
                         'Failed to reset password. Token may be invalid or expired.';
    
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}; 