import React from 'react';
import SvgClose from '@/components/icons/Close';
import { Button } from '@/components/button';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import { useApi } from '@/helpers/api';
import { useMessagesStore } from '@/store/messages';
import { GroupTransactionStatus } from './group-transaction-row';
import { resolveTransactionIcon } from '../../transactions/transactions-table/transaction-row';
import format from 'date-fns/format';
import { GroupTransactionDetailsProps } from '../lib/types';
import { resolveGroupTransactionStatus } from '../lib';

export const Details: React.FC<{ title: string; description?: string | JSX.Element }> = ({ title, description }) => {
  return (
    <div className=" flex flex-col justify-start">
      <p className=" font-sans text-sm text-[#AAB0C6] text-left">{title}</p>
      <p className=" font-sans font-semibold text-[#252525] pt-1 text-left">{description}</p>
    </div>
  );
};

export const GroupTransactionDetails: React.FC<GroupTransactionDetailsProps> = ({ open, setOpen, transaction }) => {
  const { displayMessage } = useMessagesStore();
  const { submit: makeReport, isLoading: isMakingReport } = useApi('/user/transactions/report', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Your report has been made successfully',
        variant: 'success',
      });
    },
    onError() {
      displayMessage({
        title: 'Failed to make report',
        description: 'An error occured, please try again later',
        variant: 'error',
      });
    },
  });

  const handleMakeReport = () => {
    makeReport({
      transactionId: transaction?._id,
    });
  };

  return (
    <Modal className="max-w-[532px] rounded-2xl" open={open} setOpen={setOpen}>
      <div className="rounded-2xl flex flex-col w-full">
        <div className="rounded-t-2xl flex flex-col items-center bg-neutral-100 bg-opacity-60 py-9 relative">
          <div className="rounded-2xl">
            <div className="flex justify-center">{resolveTransactionIcon(transaction?.transaction_type)}</div>
            <button>
              <SvgClose className="absolute top-6 left-[475px]" onClick={() => setOpen?.(false)} />
            </button>
            <p className=" text-green font-semibold text-3xl">+GHS {transaction?.amount}</p>
            <p className=" font-sans font-medium text-sm text-neutral-400 mb-2 capitalize">
              {transaction?.transaction_type}
            </p>
          </div>
          <div>
            <GroupTransactionStatus state={resolveGroupTransactionStatus(transaction?.responseCode)} />
          </div>
        </div>

        <div className="border-b border-neutral-100 flex flex-col  py-6 px-7">
          <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
            <div className=" w-full lg:w-1/2">
              <Details
                title="Date of transactions"
                description={transaction ? format(new Date(transaction?.createdAt!), 'yyyy-MM-dd') : ''}
              />
            </div>

            <div className="  w-full lg:w-1/2">
              <Details title="Reference number" description={transaction?.refNo} />
            </div>
          </div>

          <Spacer className=" lg:h-6 h-3" />

          <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
            <div className=" w-full lg:w-1/2">
              <Details title="Member Name" description={transaction?.userProfile?.fullName} />
            </div>
          </div>
        </div>

        <Spacer className="h-8" />

        <div className=" flex justify-end mx-8">
          <div className=" flex space-x-4">
            <Button
              loading={isMakingReport}
              onClick={() => {
                handleMakeReport();
              }}
              variant="secondary"
            >
              Make a report
            </Button>
            <Button variant="secondary" onClick={() => setOpen?.(false)}>
              Close
            </Button>
          </div>
        </div>

        <Spacer className="h-8" />
      </div>
    </Modal>
  );
};
