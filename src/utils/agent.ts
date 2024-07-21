import axios from 'axios';
import store from '../store/store'; // Đảm bảo đường dẫn đúng
import { refreshAuthToken } from '../slices/authSlice';

const apiClient = axios.create({
  baseURL: 'http://localhost:5144/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseBody = (response: any) => response.data;

const requests = {
  get: (url: string) => apiClient.get(url).then(responseBody),
  post: (url: string, body: any) => apiClient.post(url, body).then(responseBody),
  put: (url: string, body: any) => apiClient.put(url, body).then(responseBody),
  delete: (url: string) => apiClient.delete(url).then(responseBody),
  postForm: (url: string, formData: FormData) =>
    apiClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(responseBody),
};

const Cities = {
  getCities: () => requests.get('/Cities'),
  getCityById: (id: number) => requests.get(`/Cities/${id}`),
  createCity: (city: any) => requests.post('/Cities', city),
  updateCity: (city: any) => requests.put('/Cities', city),
  deleteCity: (id: number) => requests.delete(`/Cities/${id}`),
  uploadCityBanner: (cityId: number, files: File[]) => {
    const formData = new FormData();
    formData.append('CityId', cityId.toString());
    files.forEach(file => formData.append('files', file));
    return requests.postForm('/Cities/uploadcitybanner', formData);
  },
  uploadCityThumbnail: (cityId: number, files: File[]) => {
    const formData = new FormData();
    formData.append('CityId', cityId.toString());
    files.forEach(file => formData.append('files', file));
    return requests.postForm('/Cities/uploadcitythumbnail', formData);
  },
};

const Auth = {
  login: (credentials: { email: string; password: string }) => requests.post('/Authenticate/auth', credentials),
  verifyOtp: (credentials: { email: string; code: string }) => requests.post('/Authenticate/auth/verify', credentials),
  refreshToken: (token: { refreshToken: string }) => requests.post('/Authenticate/auth/refresh', token),
};

// Thêm interceptor để tự động refresh token
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const { dispatch } = store;
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        const resultAction = await dispatch(refreshAuthToken({ refreshToken: storedRefreshToken }));
        if (refreshAuthToken.fulfilled.match(resultAction)) {
          const newAccessToken = localStorage.getItem('accessToken');
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default {
  Cities,
  Auth,
};
