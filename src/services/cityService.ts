import axios from 'axios';

const API_URL = 'http://localhost:5144/api';

export const getCities = async () => {
  try {
    const response = await axios.get(`${API_URL}/Cities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const getCityById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/Cities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error;
  }
};
