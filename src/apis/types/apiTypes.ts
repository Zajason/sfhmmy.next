// Common API response and error types
export interface ApiResponse {
  message: string;
  success?: boolean;
  [key: string]: any;
}

export interface ApiError {
  message: string;
  originalError?: any;
  validationErrors?: Record<string, string[]>;
} 