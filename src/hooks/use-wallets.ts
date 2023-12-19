import { fetch } from '@/helpers/fetch';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const useWallets = () => {
  const { data: wallets, refetch: fetchWallets } = useQuery(
    ['wallets'],
    async () => {
      const response = await fetch('/user/wallets');

      return response?.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return { wallets, fetchWallets };
};
