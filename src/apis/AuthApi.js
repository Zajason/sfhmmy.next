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
    // You can store the token or perform additional actions here
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
  }
};