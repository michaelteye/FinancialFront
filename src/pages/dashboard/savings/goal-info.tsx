import format from 'date-fns/format';
import { Spacer } from '@/components/spacer';
import { useAuthStore } from '@/store/auth';
import SvgComputer from '@/components/icons/Computer';
import { ReviewProps } from './helpers/types';
import { maskedDisplayPhoneNum } from './helpers';
import { LockTypes } from '../tools/types';
import { CONST } from '../tools/constants';

const ReviewDetails: React.FC<{ title: string; details: string }> = ({ title, details }) => {
  return (
    <div>
      <p className=" font-sans text-[#878FAB] text-sm">{title}</p>
      <p className=" font-sans text-neutral-400 text-lg font-medium">{details}</p>
    </div>
  );
};

export const SavingGoalInfo: React.FC<ReviewProps> = ({ savingGoalReview }) => {
  const { userProfile } = useAuthStore();

  const displayPhoneNumberMask = maskedDisplayPhoneNum(userProfile?.phone!);

  return (
    <>
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        {savingGoalReview?.name} goal Summary
      </h1>

      <Spacer className=" h-9" />

      <div className=" review w-full px-12 py-10 bg-[#EBF3F5] bg-opacity-60 flex flex-col rounded-xl">
        <div className=" flex flex-col text-left">
          <div className="text-4xl mb-2">{savingGoalReview?.emoji ? savingGoalReview?.emoji : '✨'}</div>

          <h5 className=" font-sans text-2xl font-medium text-neutral-400 ">{savingGoalReview?.name}</h5>

          <p className=" font-sans font-medium text-md text-neutral-400">{savingGoalReview?.savingGoal}</p>
        </div>

        <Spacer className=" h-8" />

        <div className=" flex flex-col space-y-8">
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            <ReviewDetails title="Amount to save" details={`GHS ${savingGoalReview?.amountToSave}`} />
            <ReviewDetails title="Account Type" details={savingGoalReview?.accountTypeName!} />
            <ReviewDetails title="Freqency" details={`${savingGoalReview?.frequency}`} />
            <ReviewDetails
              title="Interest rate"
              details={` ${
                savingGoalReview?.accountTypeName! === LockTypes.BEZO_LOCK
                  ? CONST.BEZO_LOCK_INTEREST
                  : CONST.BEZO_FLEX_INTEREST
              } per annum`}
            />
            <ReviewDetails
              title="End date"
              details={
                savingGoalReview?.endDate && savingGoalReview?.endDate !== 'unlimited'
                  ? format(new Date(savingGoalReview?.endDate!), 'ccc MMM do, yyyy')
                  : '-'
              }
            />
            <ReviewDetails title="Debit type" details={`${savingGoalReview?.preference || '-'}`} />

            <ReviewDetails title="Target Amount" details={`GHS ${savingGoalReview?.amountToRaise || '-'}`} />
            <div className="col-span-2">
              <ReviewDetails title="Payment method" details={` Mobile money (${displayPhoneNumberMask})`} />
            </div>
          </div>
        </div>

        <Spacer className=" h-10" />
      </div>

      <Spacer className=" h-6" />
    </>
  );
};
