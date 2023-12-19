import React, { useState } from 'react';

import { format } from 'date-fns';
import classnames from 'classnames';
import { RequestWallet } from '@/components/icons';
import { Detail } from '../../savings/savings-details-row';
import { GroupTransactionDetails } from './group-transaction-details';
import SvgWithdrawReceipt3 from '@/components/icons/WithdrawReceipt3';
import { GroupTransactions, Members, WithdrawalRequests } from './types';
import { WithdrawalRequestDetails } from './modals/withdrawal-request-details';
import { TransactionType } from '../../transactions/transactions-table/transaction-type';
import { resolveGroupTransactionStatus } from '../lib';
import { TransactionButtonProps, WithdrawalRequestRowProps } from '../lib/types';

export const GroupTransactionStatus: React.FC<TransactionButtonProps> = ({ state, isSignatory }) => {
  const isPending = state === 'pending';
  const isSuccess = state?.toLowerCase() === 'approved' || state?.toLowerCase() === 'success';
  const isFailure = state === 'canceled' || 'failed';

  return (
    <div
      className={classnames(
        'w-full flex items-center justify-center rounded-[50px] bg-opacity-20 px-12 py-3 font-sans font-medium text-xs capitalize',
        {
          ' bg-yellow text-yellow': isPending,
          ' bg-[#6FCF97] text-[#219653] bg-opacity-40': isSuccess,
          ' bg-secondary-200 text-secondary-200': isFailure,
        }
      )}
    >
      {isPending ? (isSignatory ? 'Please Approve' : 'Awaiting Approval') : state}
    </div>
  );
};

export const GroupTransactionRow: React.FC<{ transaction?: GroupTransactions }> = ({ transaction }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GroupTransactionDetails open={open} setOpen={setOpen} transaction={transaction} />
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 pl-4 pr-7 hover:bg-neutral-100 hover:rounded-xl hover:bg-opacity-40"
      >
        <div className=" flex justify-between items-start">
          <div className="flex space-x-6 justify-center w-full">
            <div>
              <SvgWithdrawReceipt3 />
            </div>

            <div className="flex text-left w-full">
              <TransactionType
                TransactionType={transaction?.transaction_type}
                reference={transaction?.refNo?.substring(0, 10)}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail label="Member Name" value={transaction?.userProfile?.fullName} />
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail
              label="Date/Time"
              value={transaction ? format(new Date(transaction?.createdAt!), 'yyyy-MM-dd') : ''}
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail label="Amount" value={`GHS ${transaction?.amount}`} />
          </div>

          <div className=" w-full flex items-center">
            <GroupTransactionStatus state={resolveGroupTransactionStatus(transaction?.responseCode)} />
          </div>
        </div>
      </button>
    </>
  );
};

export const WithdrawalRequestRow: React.FC<WithdrawalRequestRowProps> = ({
  request,
  signatories,
  memberList,
  isSignatory,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WithdrawalRequestDetails
        open={open}
        setOpen={setOpen}
        requestDetails={request}
        signatories={signatories}
        memberList={memberList}
      />

      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 pl-4 pr-7 hover:bg-neutral-100 hover:rounded-xl hover:bg-opacity-40"
      >
        <div className=" flex justify-between items-start">
          <div className="flex space-x-6 justify-center w-full">
            <div>
              <RequestWallet />
            </div>

            <div className="flex text-left w-full">
              <TransactionType TransactionType="Withdrawal Request" reference={'3030300'.substring(0, 10)} />
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail label="Member Name" value={request?.receiverProfile?.fullName} />
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail label="Date/Time" value={request ? format(new Date(request?.createdAt!), 'dd/MMM/yyyy') : ''} />
          </div>

          <div className="w-full flex items-center justify-center">
            <Detail label="Amount" value={request?.amount} />
          </div>

          <div className=" w-full flex items-center">
            <GroupTransactionStatus state={request?.status!} isSignatory={isSignatory} />
          </div>
        </div>
      </button>
    </>
  );
};
