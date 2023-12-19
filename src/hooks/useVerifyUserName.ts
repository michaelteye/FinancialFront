import { fetch } from '@/helpers/fetch';
import { NewUserProfile } from '@/store/types';
import { useQuery } from '@tanstack/react-query';

export const useVerifyUserName = (userName?: string) => {
  const {
    data,
    refetch: verifyUsername,
    isError,
    isFetching: IsSearchingUser,
    isSuccess,
  } = useQuery<NewUserProfile[]>(
    ['username-verify', userName],
    async () => {
      const response = await fetch(`/users/verify/${userName}`);

      return response?.data;
    },
    {
      enabled: false,
    }
  );

  return { data, IsSearchingUser, verifyUsername, isError, isSuccess };
};
