import { client } from '@/helpers/axios';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const baseURL = import.meta.env.VITE_API_URL;
const token = useAuthStore.getState().refreshToken;

export async function getNewToken() {
  const response = await client.post(`${baseURL}/users/refresh_token`, {
    token: token,
  });

  return response?.data;
}

export const useAxiosInstance = () => {
  const accessToken = useAuthStore.getState().accessToken;

  const client = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  client.interceptors.request.use(
    (config: any) => {
      if (accessToken) {
        // console.log('CONFIG: ', config);
      }
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    },
    (error: any) => {
      Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error?.config;

      if (error.response) {
        if (error.response.status === 401 && !originalConfig?.sent) {
          originalConfig.sent === true;

          const data = await getNewToken();

          useAuthStore.setState({
            accessToken: data.accessToken,
          });

          client.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

          return client(originalConfig);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};
