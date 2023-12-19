import { fetch } from '@/helpers/fetch';
import { PaymentMethod } from '@/store/types';
import { useQuery } from '@tanstack/react-query';

export const usePaymentMethods = () => {
  const {
    data,
    isLoading: isFetchingUserPaymentMethods,
    refetch: refetchMethods,
  } = useQuery<PaymentMethod[]>(
    ['payment-methods'],
    async () => {
      const response = await fetch(`/users/payment-methods`);

      return response?.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  // const paymentMethods = data?.data?.paymentMethod;
  return { data, isFetchingUserPaymentMethods, refetchMethods };
};
