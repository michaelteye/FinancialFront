import React from 'react';
import { useApi } from '@/helpers/api';
import { Button } from '@/components/button';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import SvgClose from '@/components/icons/Close';
import { useMessagesStore } from '@/store/messages';
import { TransactionStatus } from './transaction-status';
import { resolveTransactionIcon } from './transaction-row';
import { resolveTransactionStatus, resolveTransactionType } from '../lib/helpers';
import { BezoTransactionDetailsProps, TransactionDetailsProps } from '../lib/types';

const Details: React.FC<{ title: string; description?: string }> = ({ title, description }) => {
  return (
    <div className=" flex flex-col justify-start">
      <p className=" font-sans text-sm text-[#AAB0C6] text-left">{title}</p>
      <p className=" font-sans font-semibold text-[#252525] pt-1 text-left capitalize">{description}</p>
    </div>
  );
};

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ open, setOpen, transaction }) => {
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
      transactionId: transaction?.id,
    });
  };

  const message = transaction.transactionType + ' ' + transaction.transactionStatus;

  return (
    <Modal className="lg:w-[33.3rem] max-w-[33.3rem] w-[90vw] rounded-2xl" open={open} setOpen={setOpen}>
      <div className="rounded-2xl flex flex-col w-full">
        <div className="rounded-t-2xl flex flex-col items-center bg-neutral-100 bg-opacity-60 py-9 relative">
          <div className="rounded-2xl">
            <div className="flex justify-center">{resolveTransactionIcon(transaction.transactionType)}</div>
            <button>
              <SvgClose className="absolute top-6 right-6" onClick={() => setOpen?.(false)} />
            </button>
            <p className=" text-green font-semibold text-3xl">+GHS {transaction.amount}</p>
            <p className=" font-sans font-medium text-sm text-neutral-400 mb-2">
              Momo {resolveTransactionType(transaction?.transactionType)?.toLowerCase()}
            </p>
          </div>
          <div>
            <TransactionStatus state={resolveTransactionStatus(transaction.transactionStatus.toLowerCase())} />
          </div>
        </div>

        <div className="border-b border-neutral-100 flex flex-col  py-6 px-7">
          <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
            <div className=" w-full lg:w-1/2">
              <Details title="Date of transactions" description={transaction.createdAt} />
            </div>

            <div className="  w-full lg:w-1/2">
              <Details title="Reference number" description={transaction.userRef} />
            </div>
          </div>

          <Spacer className=" lg:h-6 h-3" />

          <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
            <div className=" w-full lg:w-1/2">
              <Details title="Description" description={`${message.toLowerCase()}`} />
            </div>
            <div className=" w-full lg:w-1/2">
              <Details title="Account" description={transaction.transactionId || '-'} />
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
              className=""
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

export const BezoWalletTransactionDetails: React.FC<BezoTransactionDetailsProps> = ({ open, setOpen, transaction }) => {
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
      transactionId: transaction?.id,
    });
  };

  return (
    <Modal className="lg:w-[33.25rem] max-w-[33.25rem] w-[90vw] rounded-2xl" open={open} setOpen={setOpen}>
      <div className="rounded-2xl flex flex-col w-full">
        <div className="rounded-t-2xl flex flex-col items-center bg-neutral-100 bg-opacity-60 py-9 relative">
          <div className="rounded-2xl">
            <div className="flex justify-center">{resolveTransactionIcon(transaction?.transactionType)}</div>
            <button>
              <SvgClose className="absolute top-6 right-6" onClick={() => setOpen?.(false)} />
            </button>
            <p className=" text-green font-semibold text-3xl">+GHS {parseFloat(transaction?.amount!).toFixed(2)}</p>
            <p className=" font-sans font-medium text-sm text-neutral-400 mb-2">
              {resolveTransactionType(transaction?.transactionType)?.toLowerCase()}
            </p>
          </div>
          <div>
            <TransactionStatus state={resolveTransactionStatus(transaction?.transactionStatus?.toLowerCase())} />
          </div>
        </div>

        <div className="border-b border-neutral-100 flex flex-col  py-6 px-7">
          <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
            <div className=" w-full lg:w-1/2">
              <Details title="Date of transactions" description={transaction?.createdAt} />
            </div>

            <div className="  w-full lg:w-1/2">
              <Details title="Reference number" description={transaction?.userRef} />
            </div>
          </div>

          <Spacer className=" lg:h-6 h-3" />

          <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
            <div className=" w-full lg:w-1/2">
              <Details title="Narration" description={transaction?.narration!} />
            </div>
            {/* <div className=" w-full lg:w-1/2">
              <Details title="Medium" description={transaction.} />
            </div> */}
          </div>
        </div>

        <Spacer className="h-8" />

        <div className=" flex justify-end mx-8">
          <div className=" flex space-x-4">
            {/* <Button
              loading={isMakingReport}
              onClick={() => {
                handleMakeReport();
              }}
              className=""
              variant="secondary"
            >
              Make a report
            </Button> */}
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
