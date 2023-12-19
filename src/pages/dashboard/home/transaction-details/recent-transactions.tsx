import format from 'date-fns/format';
import { Spinner } from '@/components/spinner';
import { TransactionDetails } from '../lib/types';
import { useTransactions } from '@/hooks/userTransactions';
import { NoTransactionsCard } from './no-transactions-card';
import { resolveTransactionStatus } from '../../transactions/lib/helpers';
import { TransactionStatus } from '../../transactions/transactions-table/transaction-status';
import { resolveTransactionIcon } from '../../transactions/transactions-table/transaction-row';
import { NewTransaction } from '../../transactions/lib/types';



const RecentTransactionDetails: React.FC<TransactionDetails> = ({ icon: Icon, text, amount }) => {
  return (
    <div className="flex items-start">
      <div className="flex w-1/3 items-center">
        <div className="flex flex-col items-start">
          <p className=" font-semibold font-sans text-[#000] text-sm">{text.title}</p>
          <p className=" font-sans-body text-xs text-[#000]">{text.transactionDate}</p>
        </div>
      </div>

      <div className="flex w-1/3 justify-center">
        <p className=" font-sans-body text-xs text-right font-semibold text-[#000]">
          GHS {amount ? parseFloat(amount).toFixed(2) : ''}
        </p>
      </div>

      <div className="w-1/3">
        <TransactionStatus small state={resolveTransactionStatus(text.status?.toLowerCase())} />
      </div>
    </div>
  );
};

export const RecentTransactions = () => {
  const { transactions, isFetchingTransactions } = useTransactions({
    pageNumber: 1,
    itemsPerPage: 5,
    category: 'ALL',
    type: 'all',
  });

  function resolveTitle(transaction: NewTransaction) {
    if (transaction.narration?.includes('CHARGE')) {
      return 'charges';
    }
    return transaction?.transactionType?.toLowerCase();
  }

  return (
    <div className="bg-[#F3F2F8] rounded-xl w-full bg-opacity-30 py-7 px-2 sm:px-6 h-full">
      {isFetchingTransactions ? (
        <div className="w-full flex justify-center items-center mt-16">
          <Spinner />
        </div>
      ) : (
        <>
          {transactions?.length === 0 ? (
            <NoTransactionsCard />
          ) : (
            <>
              <p className=" font-medium text-[#000] font-sans text-sm leading-5">Recent Transactions</p>
              <div className="flex flex-col space-y-6 mt-6">
                {transactions?.map((transaction, idx) => (
                  <RecentTransactionDetails
                    key={transaction.transactionId + idx}
                    icon={resolveTransactionIcon(transaction?.transactionType.toLowerCase())}
                    text={{
                      title: resolveTitle(transaction),
                      transactionDate: format(new Date(transaction?.createdAt!), 'd MMM, yyyy - hh:mm aaa'),
                      status: transaction.transactionStatus,
                    }}
                    amount={transaction?.amount!}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
