import { fetch } from '@/helpers/fetch';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useUser = () => {
  const { saveUserData, setUpdateProfile, userProfile } = useAuthStore();

  const {
    data: userData,
    refetch,
    isError,
    isFetched,
  } = useQuery(
    ['user'],
    async () => {
      const response = await fetch('/users/me');

      return response?.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const fetchUserData = useCallback(() => refetch(), []);

  return { userData, fetchUserData, isError, isFetched };
};
