import { client } from '@/helpers/axios';
import { useAuthStore } from '@/store/auth';

export const useRefreshToken = () => {
  const { accessToken: token } = useAuthStore();

  const refresh = async () => {
    const response = client.post(
      '/users/refresh_token',
      {
        token,
      },
      {
        withCredentials: true,
      }
    );
    // console.log('REFRESH TOKEN: ', response);
  };
  return refresh;
};
