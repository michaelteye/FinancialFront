import { useState } from 'react';
import format from 'date-fns/format';
import { NewTransaction, Transaction } from '../lib/types';
import SvgDeposit from '@/components/icons/Deposit';
import { TransactionType } from './transaction-type';
import { TransactionStatus } from './transaction-status';
import SvgWithdrawal from '@/components/icons/Withdrawal';
import { TransactionDetails } from './transaction-details';
import { resolveTransactionStatus } from '../lib/helpers';
import { ArrowDown } from '@/components/icons';

// details Component

export const Detail: React.FunctionComponent<{ label: string; value?: string | JSX.Element }> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-start">
      <p className=" flex items-start font-sans-body text-sm text-[#AAB0C6]">{label}</p>
      <p className=" font-sans-body text-sm font-semibold text-[#252525] ">{value}</p>
    </div>
  );
};

// Each transaaction row;

export const resolveTransactionIcon = (transactionType?: string) => {
  if (transactionType === 'deposit') {
    return <SvgDeposit />;
  }

  if (transactionType === 'transfer') {
    return (
      <div className="bg-primary-100 bg-opacity-10 rotate-[225deg] w-9 h-9 flex items-center justify-center rounded-full">
        <ArrowDown />
      </div>
    );
  }

  return <SvgWithdrawal />;
};

export const TransactionRow: React.FC<{ transaction: NewTransaction }> = ({ transaction }) => {
  const [open, setOpen] = useState(false);

  const transactionDay = format(new Date(transaction.createdAt!), 'd MMM, yyyy - hh:mm aaa');
  const message = transaction.transactionType + ' ' + transaction.transactionStatus;

  return (
    <>
      <TransactionDetails
        transaction={{
          ...transaction,
          createdAt: transactionDay,
        }}
        open={open}
        setOpen={setOpen}
      />

      <button onClick={() => setOpen(true)} className="w-full py-3 hover:bg-neutral-100 hover:bg-opacity-40">
        <div className="flex items-start justify-between">
          <div className="w-2/5">{resolveTransactionIcon(transaction?.transactionType.toLowerCase())}</div>

          <div className="w-3/5 text-left">
            <TransactionType
              TransactionType={transaction.transactionType.toLowerCase()}
              reference={
                transaction.userRef?.length! > 6
                  ? transaction.userRef?.substring(0, 6) + '...'
                  : transaction.userRef || '-'
              }
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail label="Date/Time" value={transactionDay} />
          </div>
          <div className="w-full flex text-left pl-2">
            <Detail
              label="Description"
              value={
                transaction.narration
                  ? transaction.narration
                  : message
                  ? `${message?.toLowerCase()?.substring(0, 20)}...`
                  : transaction?.transactionStatus.toLowerCase()
              }
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail
              label="Amount"
              value={`GHS ${transaction?.amount ? parseFloat(transaction.amount!).toFixed(2) : ''}`}
            />
          </div>

          <div className=" w-full flex items-center">
            <TransactionStatus state={resolveTransactionStatus(transaction?.transactionStatus?.toLowerCase())} />
          </div>
        </div>
      </button>
    </>
  );
};
