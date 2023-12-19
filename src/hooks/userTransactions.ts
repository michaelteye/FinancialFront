import { fetch } from '@/helpers/fetch';
import { NewTransaction } from '@/pages/dashboard/transactions/lib/types';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';

export type transactionCategory = 'ALL' | 'BEZOWALLET' | 'GOAL';

interface OptionsValue {
  pageNumber?: number;
  itemsPerPage?: number;
  category?: transactionCategory;
  savingsId?: string;
  type?: 'all' | 'deposit' | 'withdrawal' | 'credit' | 'debit';
}

function resolveTransactionEndpoint(options: OptionsValue) {
  const { category, itemsPerPage, pageNumber, savingsId, type = 'all' } = options;

  if (category === 'BEZOWALLET') {
    return `/transactions/history?itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`;
  }
  if (category === 'GOAL') {
    return `/transactions/history/savingsgoal/${savingsId}?itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}&type=${type}`;
  }
  return `/transactions/all?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}&type=${type}`;
}

export const useTransactions = (Options?: OptionsValue) => {
  const { pageNumber, itemsPerPage, savingsId, category, type } = Options || {};

  const {
    data,
    isLoading: isFetchingTransactions,
    refetch,
  } = useQuery(
    ['transactions', pageNumber, itemsPerPage, savingsId, category, type],
    async () => {
      const response = await fetch(
        resolveTransactionEndpoint({
          pageNumber,
          itemsPerPage,
          category,
          savingsId,
          type,
        })
      );

      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const transactions: NewTransaction[] = data?.data;
  const count = data?.count || 100;

  return { transactions, count, isFetchingTransactions, refetch };
};
