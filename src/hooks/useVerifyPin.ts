import { client } from '@/helpers/axios';
import { fetch } from '@/helpers/fetch';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useVerifyPin = (pin?: string) => {
  const {
    data,
    refetch: verifyPin,
    isError,
    isFetching: isVerifying,
    isSuccess,
  } = useQuery(
    ['pin-verify'],
    async () => {
      const response = await fetch(`/users/pin/verify/${pin}`);

      return response?.data;
    },
    {
      enabled: false,
    }
  );

  const verificationId = data?.verificationId;
  return { verificationId, isVerifying, verifyPin, isError, isSuccess };
};
