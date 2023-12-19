import { getNewToken } from '@/hooks/useAxiosInstance';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

const accessToken = useAuthStore.getState().accessToken;

export const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// client.interceptors.request.use(
//   (config: any) => {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//     return config;
//   },
//   (error: any) => {
//     Promise.reject(error);
//   }
// );

// client.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalConfig = error?.config;

//     if (error.response) {
//       if (error.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         const data = await getNewToken();

//         console.log('ERR-TOKEN: ', data);

//         useAuthStore.setState({
//           accessToken: data.token,
//         });

//         client.defaults.headers.common['Authorization'] = `Bearer `;

//         return client(originalConfig);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
