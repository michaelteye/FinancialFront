import React from 'react';
import { format } from 'date-fns';
import classNames from 'classnames';
import { resolveColor } from './investment';
import { InvestTransactionValues } from './types';
import SvgBondSm from '@/components/icons/BondSm';
import SvgArrowUp from '@/components/icons/ArrowUp';
import { resolveInvestIcon } from './invest-form/invest-types';

export const TransactionType: React.FC<{ TransactionType?: string; reference?: string }> = ({
  TransactionType,
  reference,
}) => {
  return (
    <div className="flex flex-col">
      <p className=" font-sans font-semibold text-[#000] capitalize">{TransactionType}</p>
      <p className=" font-sans-body text-[#000] text-sm">#Ref: {reference}</p>
    </div>
  );
};

const TransactionDetail: React.FunctionComponent<{ label?: string; value?: string }> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-start">
      <p className=" flex items-start font-sans text-[#AAB0C6]">{label}</p>
      <p className=" font-sans font-medium text-[#252525] mt-1">{value}</p>
    </div>
  );
};

export const InvestTransactionRow: React.FC<{ detailsOpen?: boolean; transactionData: InvestTransactionValues }> = ({
  detailsOpen,
  transactionData,
}) => {
  const { transaction_type, refNo, createdAt, amount, responseMessage } = transactionData;
  const date = format(new Date(createdAt?.split('T')[0]!), 'dd MMM, yyyy');
  const time = createdAt?.split('T')[1].split(':');
  const hour = time?.[0];
  const minute = time?.[1];
  const displayTime = `${hour}:${minute} ${parseFloat(hour!) >= 12 ? 'pm' : 'am'}`;

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div
          className={classNames('flex', {
            'items-start space-x-4': detailsOpen,
            'items-center sm:space-x-8 space-x-4': !detailsOpen,
          })}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 bg-opacity-50 text-xl ${resolveColor(
              'Bonds'
            )}`}
          >
            {resolveInvestIcon('Bonds') || (
              <span className="text-lightgreen">
                <SvgBondSm />
              </span>
            )}
          </div>
          <div className="flex flex-col justify-start">
            <TransactionType TransactionType={transaction_type} reference={refNo} />
            <p className="block sm:hidden font-sans text-[9px] text-[#686868]">{`${date} -  ${displayTime}`}</p>
          </div>
        </div>

        <div className="sm:block hidden">
          <TransactionDetail label="Date/Time" value={`${date} -  ${displayTime}`} />
        </div>

        {detailsOpen ? null : (
          <div className="sm:block hidden">
            <TransactionDetail label="Description" value={responseMessage} />
          </div>
        )}

        <div className={classNames('flex items-center space-x-2')}>
          <SvgArrowUp
            className={classNames('', {
              'text-secondary-200': transaction_type === 'credit',
              'text-lightgreen rotate-180': transaction_type === 'debit',
            })}
          />
          <TransactionDetail label=" Amount" value={`GHS ${amount}`} />
        </div>
      </div>
    </>
  );
};
