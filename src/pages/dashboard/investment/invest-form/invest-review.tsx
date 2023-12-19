import { add, format } from 'date-fns';
import { Spacer } from '@/components/spacer';
import { useInvestContext } from '../invest-ctx';
import { useAuthStore } from '@/store/auth';
import { InvestSteps } from '../types';
import { ReviewDetails } from '../../savings/create-savings-form/7-review';
import { maskedDisplayPhoneNum } from '../../savings/helpers';

export const InvestReview = () => {
  const { userProfile } = useAuthStore();
  const { step, form } = useInvestContext();

  if (step !== InvestSteps.REVIEW) {
    return null;
  }

  const profit = (Number(form.amount) / 100) * parseFloat(form.package?.rate!);

  return (
    <>
      <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        Starter {form.type?.name} Investment Summary
      </h1>

      <Spacer className="h-5" />

      <div className="review w-full sm:px-12 px-4 py-4 sm:py-10 bg-[#EBF3F5] bg-opacity-60 rounded-xl">
        <div className="flex flex-col text-left">
          <h5 className=" font-sans sm:text-xl text-sm font-medium text-neutral-400 ">Expected Interest Amount</h5>

          <p className=" font-sans font-medium sm:text-xl text-lg text-lightgreen">{`GHS ${profit.toFixed(
            2
          )}/year `}</p>
        </div>

        <Spacer className="h-4" />

        <ReviewDetails title="Principal Amount" details={`GHS ${form.amount}`} />

        <Spacer className="h-5" />

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-y-8 gap-x-3">
          <ReviewDetails title="Interest rate" details={`${form.package?.rate}% per annum`} />
          <ReviewDetails title="Payment Schedule" details={`Every ${form.package?.paymentSchedule} months`} />
          <ReviewDetails title="Start Date" details={format(new Date(), 'MMM do, yyyy')} />
          <ReviewDetails title="Maturity Date" details={'Jan 18th,  2027'} />

          <div className="col-span-2">
            <ReviewDetails
              title="Payment Method"
              details={`BezoWallet (${maskedDisplayPhoneNum(userProfile?.phone!)})`}
            />
          </div>
        </div>

        <Spacer className="h-4" />
      </div>

      <Spacer className="h-7" />
    </>
  );
};
