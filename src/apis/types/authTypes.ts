import { ApiResponse } from './apiTypes';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  university?: string;
  year?: number;
  school?: string;
  city?: string;
}

export interface LoginResponse {
  token: string;
  access_token?: string;
  user?: UserData;
}

export interface UserData {
  created_at?: string; 
  name: string;
  email: string;
  username?: string;
  city?: string;
  university?: string;
  year?: number;
  school?: string;
  days_present?: number[] | string;
  registered_workshops?: string[] | string;
  email_verified_at?: string | null;
  avatar?: string;
  presence?: number;
  user_id?: string;
  cv?: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

export interface VerificationStatus {
  verified: boolean;
  email?: string | null;
  authError?: boolean;
  networkError?: boolean;
} 
export interface CVResponse {
  url: string | null;
  filename: string | null;
  exists: boolean;
}