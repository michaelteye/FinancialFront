import { useMemo } from 'react';
import { fetch } from '@/helpers/fetch';
import { useAuthStore } from '@/store/auth';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { NotificationsData } from '@/pages/dashboard/components/helpers/types';
import { client } from '@/helpers/axios';
import axios from 'axios';

// const fetchPokemon = async (pageParam = 0) => {
//   const { data } = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=5`
//   );
//   // console.log(data);
//   return data;
// };

const LIMIT = 20;

export const fetchNotifications = ({ pageParam = 1 }) => {
  const accessToken = useAuthStore.getState().accessToken;
  const userId = useAuthStore.getState().userProfile?.userId;

  return axios.get(
    `${import.meta.env.VITE_API_URL}${`/users/${userId}/notifications?page=${pageParam}&perPage=${LIMIT}`}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const useNotification = () => {
  const { userProfile } = useAuthStore();

  const userId = useMemo(() => userProfile?.user?.id, [userProfile]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    ['notifications', userId],
    fetchNotifications,
    {
      getNextPageParam: (_lastPage, pages) => {
        const lastPage = pages[pages.length - 1];

        if (lastPage?.data?.notifications?.length < LIMIT) {
          return undefined;
        }
        return pages.length + 1;
      },
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // refetchInterval: 10000,
    }
  );

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch };
};
