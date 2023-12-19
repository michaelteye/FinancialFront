import { Spacer } from '@/components/spacer';
import { RequestMethod, useApi } from '@/helpers/api';
import { useAuthStore } from '@/store/auth';
import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CreateSavingsGoalLayout } from '../savings/components/create-savings-goal-layout';
import { maskedDisplayPhoneNum } from '../savings/helpers';

import { InvestTransactionRow } from './transaction-row';
import { InvestmentDetailValues, InvestTransactionValues } from './types';

const TransactionDetail: React.FunctionComponent<{ label?: string; value?: string }> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-start">
      <p className=" flex items-start sm:text-lg text-sm font-sans text-[#AAB0C6]">{label}</p>
      <p className=" font-sans font-medium  sm:text-lg text-sm text-[#252525] mt-1">{value}</p>
    </div>
  );
};

export const InvestTransactionDetails: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details?: InvestmentDetailValues;
}> = ({ open, setOpen, details }) => {
  const { userProfile } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [investmentDetails, setInvestmentDetails] = useState<InvestTransactionValues[]>([]);

  const detailsId = searchParams.get('details');

  const { submit: fetchInvestmentDetails } = useApi(`/investment/transactions?investment=${detailsId}`, {
    onSuccess(response) {
      setInvestmentDetails(response.data.data.transactions);
    },
    method: RequestMethod.GET,
  });

  useEffect(() => {
    if (detailsId) {
      fetchInvestmentDetails();
    }
  }, [detailsId]);

  const profit = (Number(details?.amount) / 100) * parseFloat(details?.package?.rate!);

  return (
    <CreateSavingsGoalLayout
      title={details?.package?.name || 'Investment Package'}
      open={open}
      closeModal={() => {
        setOpen(false);
        setSearchParams({});
      }}
      width="md:w-[50%]"
    >
      <Spacer className="h-10" />

      <div>
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col text-left">
            <h5 className=" font-sans text-lg text-neutral-400 ">Amount Invested</h5>

            <p className=" font-sans font-medium text-3xl text-lightgreen mt-1">{`GHS ${details?.amount || ''}`}</p>
          </div>

          <p
            className={classNames(
              `text-white font-sans text-xs px-5 py-2 rounded-full flex items-center justify-center`,
              {
                'bg-secondary-200': details?.status !== 'active',
                'bg-[#00AA77]': details?.status === 'active',
              }
            )}
          >
            {details?.status === 'active' ? 'Active' : 'Matured'}
          </p>
        </div>

        <Spacer className="h-8" />

        <div className="review w-full sm:px-12 px-4 py-4 sm:py-10 bg-[#EBF3F5] rounded-lg">
          <TransactionDetail label="Expected Interest Amount " value={`GHS ${profit.toFixed(2)}/year`} />

          <Spacer className="h-4" />

          <div className="grid grid-cols-2 gap-5 gap-y-8">
            <TransactionDetail label="Interest rate" value={`${details?.package?.rate || ''}% each year`} />

            <TransactionDetail
              label="Payment Schedule"
              value={`Every ${details?.package?.paymentSchedule || ''} months`}
            />

            <TransactionDetail
              label="Start date"
              value={format(new Date(details ? details.startDate! : ''), 'MMM do, yyyy')}
            />

            <TransactionDetail label="Maturity date" value="Jan 18th,  2027" />

            <div className="col-span-2">
              <TransactionDetail
                label="Payment Method"
                value={`BezoWallet (${maskedDisplayPhoneNum(userProfile?.phone!)})`}
              />
            </div>
          </div>
        </div>
      </div>

      <Spacer className="h-12" />

      <p className="font-sans text-[#000] text-xl">Transactions</p>

      <Spacer className="h-3" />

      <div className="flex flex-col space-y-3">
        {investmentDetails.map((details) => {
          return <InvestTransactionRow key={details._id} transactionData={details} detailsOpen />;
        })}
      </div>
    </CreateSavingsGoalLayout>
  );
};
