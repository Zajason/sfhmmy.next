// Re-export types
import * as ApiTypes from './types/apiTypes';
import * as AuthTypes from './types/authTypes';

// Re-export services
export * from './services/authService';
export * from './services/profileService';
export * from './services/fileService';

// Re-export axios config
export { default as axiosInstance, API_URL } from './axiosConfig';

// Export types as namespaces to avoid naming conflicts
export { ApiTypes, AuthTypes }; 