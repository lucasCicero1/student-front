import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth-store';

const setup = (http) => {
  http.interceptors.request.use((request) => {
    const authStore = useAuthStore();
    const { getToken } = storeToRefs(authStore);
    const token = getToken.value;
    request.headers.Authorization = `Bearer: ${token}`;
    return request;
  }, (error) => Promise.reject(error));

  http.interceptors.response.use((response) => {
    response.body = response.data;
    return response;
  }, async (error) => Promise.reject(error.response));
};

export default setup;
