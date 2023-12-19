import { fetch } from '@/helpers/fetch';
import { LockTypes } from '@/pages/dashboard/tools/types';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';

export interface AccountTypesValues {
  id?: string;
  createdAt?: string;
  name?: LockTypes;
  alias?: string;
  // withdrawalPeriod: number;
  // dailyLimit: number;
  // monthlyLimit: number;
  // withdrawalStartingCost: number;
  // withdrawalEndingCost: number;
  description?: string;
}

export const useAccountTypes = () => {
  const { data, isLoading } = useQuery<AccountTypesValues[]>(
    ['account-types'],
    async () => {
      const response = await fetch('/user/account-types');

      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return { data, isLoading };
};
