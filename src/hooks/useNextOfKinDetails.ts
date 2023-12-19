import { fetch } from '@/helpers/fetch';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';

export const useNextOfKinDetails = () => {
  const { userProfile } = useAuthStore();

  const { data, isLoading: isFetchingNextOfkinDetails } = useQuery(
    ['next-of-kin'],
    async () => {
      const response = await fetch(`/users/nextofkin/${userProfile?.userId}`);

      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return { data, isFetchingNextOfkinDetails };
};
