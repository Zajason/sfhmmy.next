import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';
import { ApiResponse } from '../types/apiTypes';
import { CVResponse } from '../types/authTypes';

/**
 * Upload CV file
 */
export const uploadCV = async (file: File): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('cv', file);
    const response = await axiosInstance.post<ApiResponse>('/upload-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('CV uploaded:', response.data);
    toast.success('CV uploaded successfully!');
    return response.data;
  } catch (error: any) {
    console.error('Error uploading CV:', error.response?.data || error.message);
    toast.error('Failed to upload CV. Please try again.');
    throw error;
  }
};

/**
 * Get CV download URL
 */
export const getCV = async (): Promise<CVResponse> => {
  try {
    // First, get the user profile to extract the CV filename
      const profileResponse = await axiosInstance.get('/profile');
      const cvFilename = profileResponse.data?.user?.cv;
      
      if (!cvFilename) {
        console.log('No CV has been uploaded yet (no filename in profile)');
        return { url: null, filename: null, exists: false };
      }
  
      // Now get the actual CV file
      const response = await axiosInstance.get('/get-cv', {
        responseType: 'blob'
      });
  
      console.log("CV response received", response.status);
  
      if (response && response.status === 204) {
        console.log('No CV has been uploaded yet');
        return { url: null, filename: null, exists:false }; // Return null to indicate no CV available
      }
      
      // Successfully got CV file
      return { 
        url: URL.createObjectURL(response.data), 
        filename: cvFilename,
        exists: true
      };
  } catch (error) {
    console.error("Error checking CV:", error);
    throw error;
  }
};

/**
 * Delete uploaded CV
 */
export const deleteCV = async (): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.delete<ApiResponse>('/delete-cv');
    console.log('CV deleted:', response.data);
    toast.success('CV deleted successfully!');
    return response.data;
  } catch (error: any) {
    console.error('Error deleting CV:', error.response?.data || error.message);
    toast.error('Failed to delete CV. Please try again.');
    throw error;
  }
};

/**
 * Upload avatar image
 */
export const uploadAvatar = async (file: File): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosInstance.post<ApiResponse>('/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Avatar uploaded:', response.data);
    toast.success('Avatar uploaded successfully!');
    return response.data;
  } catch (error: any) {
    console.error('Error uploading avatar:', error.response?.data || error.message);
    toast.error('Failed to upload avatar. Please try again.');
    throw error;
  }
}; 