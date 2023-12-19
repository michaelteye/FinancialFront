import { fetch } from '@/helpers/fetch';
import { useQuery } from '@tanstack/react-query';
import { SavingGoal } from '@/pages/dashboard/savings/helpers/types';

const useGoals = () => {
  const {
    data,
    isLoading: isFetchingUserSavingsGoals,
    refetch: refetchGoals,
  } = useQuery(
    ['saving-goals'],
    async () => {
      const response = await fetch(`/users/saving-goals`);

      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
    }
  );

  const goals: SavingGoal[] = data;
  return { goals, isFetchingUserSavingsGoals, refetchGoals };
};

export default useGoals;
