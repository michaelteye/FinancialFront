import { useAuthStore } from '@/store/auth';
import { client } from './axios';

export async function fetch(url: string) {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    try {
      return await client.get(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        useAuthStore.getState().logout();
        useAuthStore.setState({
          loading: false,
        });
      }
    }
  }
}
