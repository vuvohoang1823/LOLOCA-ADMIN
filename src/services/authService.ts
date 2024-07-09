import axios from 'axios';

const API_URL = 'http://localhost:5144/api/Authenticate';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { email, password });
    // Lưu accessToken và refreshToken vào localStorage
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const verifyOtp = async (email: string, code: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify`, { email, code });
    // Lưu accessToken vào localStorage sau khi xác thực OTP
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Error during OTP verification:', error);
    throw error;
  }
};

export const refresh = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
    // Cập nhật accessToken trong localStorage
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error('Error during token refresh:', error);
    throw error;
  }
};
