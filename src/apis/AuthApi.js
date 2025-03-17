import axios from 'axios';

const API_URL = 'https://sfhmmy.gr/api';

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
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    // For debugging - log token presence
    console.log("Token exists:", !!token);
    
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

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    console.log('Login successful:', response.data);
    
    // Extract token from response
    const token = response.data.token || response.data.access_token;
    
    if (!token) {
      throw new Error('No token received from server');
    }
    
    // Store token in localStorage
    localStorage.setItem('authToken', token);
    console.log('Token stored in localStorage');
    
    return { token };
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    // Use our api instance with interceptors
    const response = await api.get('/profile');
    console.log('Profile fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get user QR code
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
    const response = await api.get('/get-cv', {
      responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching CV:', error);
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