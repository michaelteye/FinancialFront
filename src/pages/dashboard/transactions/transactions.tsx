import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { Title } from '../components/title';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { Flash } from '@/components/flash/flash';
import usePagination from 'headless-pagination-react';
import { Paginator } from './transactions-table/paginator';
import { useTransactions } from '@/hooks/userTransactions';
import { TransactionRow } from './transactions-table/transaction-row';

const LIMIT = 6;

export const TabHeader: React.FC<{ selected?: boolean; onClick?: () => void }> = ({ selected, children, onClick }) => {
  return (
    <div onClick={onClick}>
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
    </div>
  );
};

export const Transactions: React.FC<{ savingsId?: string }> = ({ savingsId }) => {
  const [totalItems, setTotalItems] = useState(100);
  const [type, setType] = useState<'all' | 'deposit' | 'withdrawal' | 'credit' | 'debit'>('all');
  const transactionsPage = location.pathname.split('/')[2] === 'transactions';

  const paginator = usePagination({
    totalItems,
    perPage: LIMIT,
    maxLinks: 4,
    initialPage: 1,
  });

  const { transactions, isFetchingTransactions, count } = useTransactions({
    pageNumber: paginator.page,
    itemsPerPage: LIMIT,
    category: (() => {
      if (savingsId) {
        return 'GOAL';
      }
      if (transactionsPage) {
        return 'ALL';
      }
    })(),
    savingsId,
    type,
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
            return <TransactionRow key={transaction.transactionId + idx} transaction={transaction} />;
          })}
      {isFetchingTransactions ? null : transactions?.length === 0 ? (
        <Flash>No {type === 'all' ? 'transactions' : type} found.</Flash>
      ) : null}
    </>
  );

  return (
    <>
      <Tab.Group
        onChange={(idx) => {
          switch (idx) {
            case 0:
              setType('all');
              paginator.setPage(1);
              break;
            case 1:
              setType(savingsId ? 'credit' : 'deposit');
              paginator.setPage(1);
              break;
            case 2:
              setType(savingsId ? 'debit' : 'withdrawal');
              paginator.setPage(1);
              break;
            default:
              break;
          }
        }}
      >
        <div className="relative flex justify-between">
          <div className="border-b border-neutral-100 overflow-x-scroll lg:overflow-x-hidden w-[800px] lg:w-full">
            <Tab.List className="space-x-8 lg:space-x-16 flex w-[800px] lg:w-full">
              <Tab className=" border-transparent">
                {({ selected }) => <TabHeader selected={selected}>All transactions</TabHeader>}
              </Tab>
              <Tab>{({ selected }) => <TabHeader selected={selected}>Deposits</TabHeader>}</Tab>
              <Tab>{({ selected }) => <TabHeader selected={selected}>Withdrawals</TabHeader>}</Tab>
            </Tab.List>
          </div>
        </div>

        <Spacer className="h-12" />

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="overflow-x-scroll lg:overflow-x-auto w-[1100px] lg:w-full">
            <Tab.Panels>
              <Tab.Panel className=" flex flex-col space-y-4">{renderedTransactions}</Tab.Panel>
              <Tab.Panel className=" flex flex-col space-y-4">{renderedTransactions}</Tab.Panel>
              <Tab.Panel className=" flex flex-col space-y-4">{renderedTransactions}</Tab.Panel>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>

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

      <Spacer className="sm:hidden h-24" />
    </>
  );
};

export const TransactionsPage = () => {
  return (
    <>
      <Title title="Transactions" />

      <Spacer className="h-12" />

      <Transactions />

      <Spacer className="sm:hidden h-24" />
      <Spacer className="sm:hidden h-10" />
    </>
  );
};
