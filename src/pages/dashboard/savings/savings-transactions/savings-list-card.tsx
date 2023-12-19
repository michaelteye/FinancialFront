import React from 'react';
import { Link } from 'react-router-dom';
import { Spacer } from '@/components/spacer';
import { SavingsListCardsProps } from '../helpers/types';
import { computePercentageSaved } from '../helpers';
import { LockTypes } from '../../tools/types';

export const SavingsListCard: React.FC<SavingsListCardsProps> = ({ savingGoal, className }) => {
  const percentSaved = computePercentageSaved(savingGoal) || 0;

  return (
    <Link to={savingGoal?.id}>
      <button
        className={`px-5 py-6 flex flex-col text-left bg-[#FFF0ED] rounded-xl hover:shadow-md w-full h-full transition duration-75 ease-linear savingsListCard ${className}`}
      >
        <div className=" flex flex-col">
          <div className="sm:text-3xl text-xl">{savingGoal?.emoji ? savingGoal?.emoji : '✨'}</div>

          <Spacer className=" h-2" />
          <label className="font-sans sm:text-xl font-medium text-neutral-400 capitalize">
            {`${savingGoal?.name}` + ' ' + `${savingGoal?.accountTypeName === LockTypes.BEZO_LOCK ? '🔒' : ''}`}
          </label>
        </div>
        <Spacer className=" h-5" />
        <div className=" flex flex-col">
          <p className=" font-sans text-neutral-400 ">GHS</p>
          <p className=" font-sans font-medium text-3xl text-neutral-400">
            {parseFloat(savingGoal?.account?.balance!).toFixed(2)}
          </p>
        </div>
        <Spacer className=" h-4" />
        <div className=" w-full">
          <p className=" font-sans font-medium text-sm text-neutral-400 mb-1">{percentSaved}% saved</p>
          <div className=" w-full h-[6px] rounded-full bg-white">
            <div className={` bg-green h-full rounded-full`} style={{ width: `${percentSaved}%` }}></div>
          </div>
          <Spacer className=" h-10" />
        </div>
      </button>
    </Link>
  );
};
