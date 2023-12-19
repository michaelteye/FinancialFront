import { fetch } from '@/helpers/fetch';
import { SavingGoalType } from '@/pages/dashboard/savings/helpers/types';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';

export const useGoalTypes = () => {
  const { data, isFetching } = useQuery<SavingGoalType[]>(
    ['goal-types'],
    async () => {
      const response = await fetch('/user/goal-types');
      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return { data, isFetching };
};
