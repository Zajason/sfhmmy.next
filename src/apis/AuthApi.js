import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', userData);
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', loginData);
    console.log('Login successful:', response.data);
    const token = response.data.token; // Assuming the token is in response.data.token
    localStorage.setItem('authToken', token); // Store the token in local storage
    return token;
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};