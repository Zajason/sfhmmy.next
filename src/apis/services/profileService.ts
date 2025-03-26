import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';
import { UserData } from '../types/authTypes';
import { ApiResponse, ApiError } from '../types/apiTypes';

export interface ProfileUpdateData {
  name: string;
  email: string;
  university?: string;
  year?: number;
  school?: string;
  city?: string;
}

/**
 * Get user profile data
 */
export const getUserProfile = async (): Promise<{ user: UserData }> => {
  try {
    const response = await axiosInstance.get<{ user: UserData }>('/profile');
    console.log('Profile fetched:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    
    // Don't display toast for verification errors (handled by interceptor)
    if (!(error.response?.status === 403 && 
          error.response.data?.message?.includes('verify'))) {
      toast.error('Failed to fetch profile. Please try again.');
    }
    
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (profileData: ProfileUpdateData): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.put<ApiResponse>('/profile', profileData);
    console.log('Profile updated:', response.data);
    toast.success('Profile updated successfully!');
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile:', error.response?.data || error.message);
    
    // Handle validation errors
    if (error.response?.status === 422 && error.response.data?.errors) {
      const validationErrors = error.response.data.errors;
      const firstErrorField = Object.keys(validationErrors)[0];
      const firstErrorMessage = validationErrors[firstErrorField][0];
      toast.error(`Validation error: ${firstErrorMessage}`);
    } else {
      toast.error('Failed to update profile. Please try again.');
    }
    
    throw error;
  }
};

/**
 * Get user QR code
 */
export const getUserQrCode = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/user/qrcode', { 
      responseType: 'blob' // Important: set responseType to blob for image data
    });
    return URL.createObjectURL(response.data);
  } catch (error: any) {
    console.error('Error fetching QR code:', error);
    toast.error('Failed to load QR code');
    throw error;
  }
}; 