import { fetch } from '@/helpers/fetch';
import { UserKYC } from '@/pages/dashboard/settings/lib/types';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUserVerifyRequest = () => {
  const {
    data,
    isLoading: isCheckingVerifyStatus,
    refetch: checkStatus,
    isSuccess,
  } = useQuery<UserKYC[]>(
    ['user-kyc'],
    async () => {
      const response = await fetch(`/users/upload`);

      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { data, isCheckingVerifyStatus, checkStatus, isSuccess };
};
