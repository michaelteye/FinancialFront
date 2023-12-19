import { useAuthStore } from '@/store/auth';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

export const refreshTokens = async () => {
  const { refreshToken } = useAuthStore();

  const baseURL = import.meta.env.VITE_API_URL;
  await axios.post(`${baseURL}/refresh-token`, { token: refreshToken });
};

export const handleRequest = async (request: () => Promise<AxiosResponse>): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error) {
    //@ts-ignore
    if (error?.response?.status === 401) {
      await refreshTokens();
      return await request();
    }

    throw error;
  }
};

export const fetcher = async (url: string) => {
  const { accessToken } = useAuthStore();
  try {
    const request = () =>
      axios.get(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    //@ts-ignore
    const { data } = await handleRequest(request);

    return data;
  } catch (error) {
    // return error;
  }
};
