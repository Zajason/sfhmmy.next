import axios from 'axios';
import { toast } from 'react-toastify'; // Make sure this is imported at the top

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://127.0.0.1:8000/api'  // Local development server
  : 'https://sfhmmy.gr/api';     // Production server

// Create an axios instance with consistent config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  },
  withCredentials: true // Important: send cookies when making requests across origins
});

// Set up axios interceptor to add auth token to all requests
api.interceptors.request.use(
  config => {
    // First try to get token from localStorage (for verified users)
    let token = localStorage.getItem('authToken');
    
    // For verification-related endpoints, try to use the pendingAuthToken
    // Check if window is defined (client-side only) before accessing location
    const isVerificationRelatedEndpoint = config.url && 
      (config.url.includes('email/verification') || 
       config.url.includes('verification-notification'));
    
    const isVerificationPage = typeof window !== 'undefined' && 
      window.location && 
      window.location.pathname && 
      window.location.pathname.includes('emailVerification');
    
    if (!token && (isVerificationRelatedEndpoint || isVerificationPage)) {
      token = sessionStorage.getItem('pendingAuthToken');
    }
    
    if (token) {
      // Set the Authorization header with the token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error:', error);
    
    const isCheckingVerification = error.config.url.includes('/email/verification-status');
    const isResendingVerification = error.config.url.includes('/email/verification-notification');
    const isLoginRequest = error.config.url.includes('/login');
    
    // Handle email verification required (403)
    if (error.response && 
        error.response.status === 403 && 
        error.response.data?.message?.toLowerCase().includes('not verified') &&
        !isCheckingVerification &&
        !isResendingVerification &&
        !isLoginRequest) { // Skip for login requests - we handle this separately
      
      console.log('Email verification required. Redirecting to verification page.');
      
      if (typeof window !== 'undefined' && 
          !window.location.pathname.includes('emailVerification') &&
          !window.location.pathname.includes('signIn')) {
        
        sessionStorage.setItem('redirectAfterVerification', window.location.pathname);
        
        
        window.location.href = '/emailVerification';
      }
      
      return Promise.reject({
        message: 'Email verification required.',
        originalError: error,
        isVerificationError: true
      });
    }
    
    // Rest of the interceptor remains the same
    if (error.response && error.response.status === 401) {
      console.log('Authentication error. Token may be invalid or expired.');
      
      if (typeof window !== 'undefined' && 
          !window.location.pathname.includes('signIn')) {
        
        localStorage.removeItem('authToken');
        
        if (typeof toast !== 'undefined') {
          toast.error('Your session has expired. Please sign in again.');
        }
        
        setTimeout(() => {
          window.location.href = '/signIn';
        }, 1500);
      }
    }
    
    if (error.message === 'Network Error') {
      console.error('Network error detected:', error);
    }
    
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    console.log('Attempting registration to:', API_URL + '/register');
    const response = await api.post('/register', userData);
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      response: error.response,
      request: error.request ? 'Request was made but no response received' : 'No request was made'
    });
    
    // Provide more meaningful error message
    if (error.message === 'Network Error') {
      throw new Error('Cannot connect to the server. Please check your internet connection or the server might be down.');
    }
    
    if (error.response) {
      // The server responded with an error status code
      const errorMessage = error.response.data?.message || 'Registration failed with status: ' + error.response.status;
      throw new Error(errorMessage);
    }
    
    throw error; // For other errors
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    console.log("response", response)
    console.log('Login successful:', response.data);
    
    // Extract token from response
    const token = response.data.token || response.data.access_token;
    
    if (!token) {
      throw new Error('No token received from server');
    }
    
    // Instead of always storing in localStorage, return token and user info
    return { 
      token
    };
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const loginWithVerificationCheck = async (loginData) => {
  try {
    // First try to login
    const loginResult = await loginUser(loginData);
    
    try {
      // Pass the token directly to the verification check
      const verificationStatus = await checkEmailVerificationStatus(loginResult.token);
      
      if (!verificationStatus.verified) {
        console.log('Email not verified, redirecting to verification page');
        
        // Store token temporarily in sessionStorage for verification page
        sessionStorage.setItem('pendingAuthToken', loginResult.token);
        
        // Store the email for verification page
        sessionStorage.setItem('pendingVerificationEmail', loginData.email);
        
        // Redirect to verification page
        if (typeof window !== 'undefined') {
          window.location.href = '/emailVerification';
        }
        
        return {
          success: false,
          requiresVerification: true,
          message: 'Please verify your email before continuing',
          email: loginData.email
        };
      }
      
      // If verified, login is complete - store token in localStorage
      localStorage.setItem('authToken', loginResult.token);
      
      return {
        success: true,
        token: loginResult.token,
        message: 'Login successful'
      };
    } catch (verificationError) {
      // For verification errors, assume email not verified
      console.error('Error checking email verification:', verificationError);
      
      // Store token temporarily in sessionStorage
      sessionStorage.setItem('pendingAuthToken', loginResult.token);
      sessionStorage.setItem('pendingVerificationEmail', loginData.email);
      
      return {
        success: false,
        requiresVerification: true,
        message: 'Please verify your email before continuing',
        error: verificationError.message
      };
    }
  } catch (loginError) {
    console.error('Login with verification check failed:', loginError);
    throw loginError;
  }
};

// Resent verification email
// Update to accept email parameter
export const resendVerificationEmail = async (email = null) => {
  try {
    // If email is provided, include it in the request payload
    const payload = email ? { email } : {};
    
    // Pass payload as request body
    const response = await api.post('/email/verification-notification', payload);
    console.log('Verification email resent:', response.data);
    return {
      success: true,
      message: response.data?.message || 'Verification email sent!'
    };
  } catch (error) {
    console.error('Error resending verification email:', error);
    
    // Handle 404 - Email not found errors
    if (error.response && error.response.status === 404) {
      return {
        success: false,
        emailNotFound: true,
        message: 'The email address you entered is not registered in our system.'
      };
    }
    
    // Handle validation errors (422)
    if (error.response && error.response.status === 422) {
      return {
        success: false,
        validationError: true,
        message: error.response.data?.message || 'Invalid email format or parameters.'
      };
    }
    
    // The rest of your error handling stays the same
    if (error.message === 'Network Error') {
      return {
        success: false,
        networkError: true,
        message: 'Could not connect to the server. Please check your internet connection.'
      };
    }
    
    if (error.response && error.response.status === 429) {
      return {
        success: false,
        tooManyRequests: true,
        message: 'Please wait before requesting another email.'
      };
    }
    
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send verification email.'
    };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    // Use our api instance with interceptors
    const response = await api.get('/profile');
    console.log('Profile fetched:', response.data);
    console.log('Profile fetched:', response);
    return {
      user: response.data.user
    };
  } catch (error) {
    console.error('Error fetching profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get user QR code (Not Needed for now as the src of the image of the qr code gets the path /api/user/qrcode)
export const getUserQrCode = async () => {
  try {
    const response = await api.get('/user/qrcode', { 
      responseType: 'blob' // Important: set responseType to blob for image data
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching QR code:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/profile', profileData);
    console.log('Profile updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/change-password', passwordData);
    console.log('Password changed:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/forgot-password', { email });
    console.log('Password reset email sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending password reset email:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const resetpassword = async (token, password) => {
  try {
    const response = await api.post(`/reset-password/`, { password, token});
    console.log('Password reset:', response.data);
    return response.data;
  }
  catch (error) {
    console.error('Error resetting password:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const uploadCV = async (file) => {
  try {
    const formData = new FormData();
    formData.append('cv', file);
    const response = await api.post('/upload-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('CV uploaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading CV:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const getCV = async () => {
  try {
    // First, get the user profile to extract the CV filename
    const profileResponse = await api.get('/profile');
    const cvFilename = profileResponse.data?.user?.cv;
    
    if (!cvFilename) {
      console.log('No CV has been uploaded yet (no filename in profile)');
      return { url: null, filename: null };
    }

    // Now get the actual CV file
    const response = await api.get('/get-cv', {
      responseType: 'blob'
    });

    console.log("CV response received", response.status);

    if (response && response.status === 204) {
      console.log('No CV has been uploaded yet');
      return { url: null, filename: null }; // Return null to indicate no CV available
    }
    
    // Successfully got CV file
    return { 
      url: URL.createObjectURL(response.data), 
      filename: cvFilename 
    };
  } catch (error) {
    // Handle 404 - CV file not found (database entry exists but file missing)
    if (error.response && error.response.status === 404) {
      console.log('CV file not found on server');
      return { url: null, filename: null }; // Return null to indicate no CV available
    }
    
    // Only log and throw for unexpected errors
    console.error('Unexpected error fetching CV:', error);
    throw error;
  }
}

export const deleteCV = async () => {
  try {
    const response = await api.delete('/delete-cv');
    console.log('CV deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting CV:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const verifyEmail = async (id, hash) => {
  try {
    const response = await api.get(`/email/verify/${id}/${hash}`);
    console.log('Email verified:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const checkEmailVerificationStatus = async (token = null) => {
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
    
    const response = await api.get('/email/verification-status', config);
    console.log('Email verification status checked:', response.data);
    return {
      verified: response.data.verified === true,
      email: response.data.email
    };
  } catch (error) {
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
      console.error('Network error when checking verification status');
      return { 
        verified: false, 
        email: null,
        networkError: true
      };
    }
    
    // For any other unexpected errors
    throw error;
  }
};