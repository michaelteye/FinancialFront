import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { Flash } from '@/components/flash/flash';
import usePagination from 'headless-pagination-react';
import { Detail } from '../savings/savings-details-row';
import { useTransactions } from '@/hooks/userTransactions';
import { NewTransaction } from '../transactions/lib/types';
import SvgBezoDeposit from '@/components/icons/BezoDeposit';
import SvgBezoWithdraw from '@/components/icons/BezoWithdraw';
import { resolveTransactionStatus } from '../transactions/lib/helpers';
import { Paginator } from '../transactions/transactions-table/paginator';
import { TransactionType } from '../transactions/transactions-table/transaction-type';
import { TransactionStatus } from '../transactions/transactions-table/transaction-status';
import { BezoWalletTransactionDetails } from '../transactions/transactions-table/transaction-details';

const LIMIT = 6;

export const TabHeader: React.FC<{ selected?: boolean }> = ({ selected, children }) => {
  return (
    <div className="relative pb-2 ">
      <p className={selected ? ' text-primary-400 font-medium ' : ' text-neutral-400 font-normal text-opacity-50'}>
        {children}
      </p>

      {selected ? (
        <div
          className="w-full bg-primary-400 absolute bottom-0"
          style={{ height: '3px', borderTopRightRadius: '3px', borderTopLeftRadius: '3px' }}
        />
      ) : null}
    </div>
  );
};

function resolveIcon(transactionType: string) {
  if (transactionType === 'credit') {
    return <SvgBezoDeposit />;
  }
  if (transactionType === 'debit' || transactionType === 'direct debit') {
    return <SvgBezoWithdraw />;
  }
}

export const BezoTransactionRow: React.FC<{ transaction: NewTransaction }> = ({ transaction }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const transactionDay = format(new Date(transaction.createdAt!), 'd MMM, yyyy - hh:mm aaa');

  return (
    <>
      <BezoWalletTransactionDetails
        transaction={{
          ...transaction,
          createdAt: transactionDay,
        }}
        open={openDetails}
        setOpen={setOpenDetails}
      />
      <button
        onClick={() => {
          setOpenDetails(true);
        }}
        className="sm:block hidden w-full py-3 hover:bg-neutral-100 hover:bg-opacity-40"
      >
        <div className="flex items-start">
          <div className="w-full text-left flex space-x-3">
            <div className="">{resolveIcon(transaction?.transactionType!.toLowerCase())}</div>

            <TransactionType TransactionType={transaction?.transactionType} reference={transaction.userRef} />
          </div>

          <div className="w-full flex">
            <Detail label="Date/Time" value={transactionDay!} />
          </div>

          <div className="w-full flex text-left">
            <Detail label="Narration" value={transaction.narration!} />
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail
              label="Amount"
              value={`GHS ${transaction?.amount ? parseFloat(transaction.amount!).toFixed(2) : ''}`}
            />
          </div>

          <div className="w-full flex items-center">
            <TransactionStatus state={resolveTransactionStatus(transaction?.transactionStatus?.toLowerCase())} />
          </div>
        </div>
      </button>

      <button
        onClick={() => {
          setOpenDetails(true);
        }}
        className="sm:hidden flex items-start hover:bg-neutral-100 hover:rounded-xl hover:bg-opacity-40"
      >
        <div className="mr-2">{resolveIcon(transaction?.transactionType!.toLowerCase())}</div>

        <div className="w-full text-left flex flex-col">
          <span className="font-sans font-semibold sm:text-sm text-xs text-[#000] capitalize">
            {transaction?.transactionType}
          </span>
          <span className="sm:text-sm text-xs">{transactionDay.split('-')[0]}</span>
        </div>

        <div className="w-full flex items-center">
          <Detail
            label="Amount"
            value={`GHS ${transaction?.amount ? parseFloat(transaction.amount!).toFixed(2) : ''}`}
          />
        </div>

        <div className="w-full flex items-center">
          <TransactionStatus small state={resolveTransactionStatus(transaction?.transactionStatus?.toLowerCase())} />
        </div>
      </button>
    </>
  );
};

export const BezoTransactions: React.FC = () => {
  const [totalItems, setTotalItems] = useState(100);

  const paginator = usePagination({
    totalItems,
    perPage: LIMIT,
    maxLinks: 5,
    initialPage: 1,
  });

  const { transactions, isFetchingTransactions, count } = useTransactions({
    pageNumber: paginator.page,
    itemsPerPage: LIMIT,
    category: 'BEZOWALLET',
  });

  useEffect(() => {
    setTotalItems(count);
  }, [count]);

  const loader = (
    <div className="w-full flex justify-center my-6 animate-spin">
      <Spinner />
    </div>
  );

  const renderedTransactions = (
    <>
      {isFetchingTransactions
        ? loader
        : transactions?.map((transaction, idx) => {
            return <BezoTransactionRow key={transaction.transactionId + idx} transaction={transaction} />;
          })}

      {isFetchingTransactions ? null : transactions?.length === 0 ? (
        <Flash>No BezoWallet Transactions found.</Flash>
      ) : null}
    </>
  );

  return (
    <>
      <Tab.Group onChange={() => paginator.setPage(1)}>
        <div className="relative flex justify-between">
          <div className="border-b border-neutral-100 overflow-x-hidden w-full">
            <Tab.List className="space-x-8 lg:space-x-16 flex w-full">
              <Tab className=" border-transparent">
                {({ selected }) => <TabHeader selected={selected}>Wallet transactions</TabHeader>}
              </Tab>
            </Tab.List>
          </div>
        </div>

        <Spacer className="sm:h-12" />

        <div className="w-full">
          <Tab.Panels>
            <Tab.Panel className=" flex flex-col sm:space-y-4 space-y-8">{renderedTransactions}</Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>

      <Spacer className="h-4" />

      {isFetchingTransactions || transactions?.length === 0 ? null : (
        <div className="w-full flex justify-end">
          <Paginator
            paginator={{
              ...paginator,
              setPage(page) {
                paginator.setPage(page);
              },
              onNext() {
                paginator.onNext();
              },
              onPrevious() {
                paginator.onPrevious();
              },
            }}
          />
        </div>
      )}

      <Spacer className="sm:h-24 h-8" />
    </>
  );
};
