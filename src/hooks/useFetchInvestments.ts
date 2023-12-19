import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchInvestments = () => {
  const { accessToken } = useAuthStore();

  const {
    data,
    refetch: fetchInvestments,
    isLoading,
  } = useQuery(
    ['investments'],
    async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/investment`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response?.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, fetchInvestments };
};
