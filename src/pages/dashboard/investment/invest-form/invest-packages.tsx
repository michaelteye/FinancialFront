import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import classNames from 'classnames';
import { useInvestContext } from '../invest-ctx';
import { InvestSteps } from '../types';
import { resolveInvestIcon } from './invest-types';

function resolvePackageBrief(name?: string) {
  if (name === 'Starter') {
    return 'Starting at a cool GHS 500, invest in our 1-year bond and enjoy an 18% interest rate per annum.';
  }

  if (name === 'Trooper') {
    return 'Starting with GHS 1000, invest in our 3-year bond and enjoy a 20% interest rate per annum.';
  }

  if (name === 'Vanguard') {
    return 'With a minimum of GHS 1,000, invest in our 5-year bond and enjoy a 22% interest rate per annum.';
  }
}

function resolvePackageDesc(name?: string) {
  if (name === 'Starter') {
    return (
      <span>
        You’re about to make a very important financial decision, and we are here to support you all the way!.
        <Spacer className="h-1" />
        <br />
        Our starter bond is a 5 year valid bond product with the possibility of initiating a yearly roll over of the
        initial capital or making a withdrawal of the capital after a year
        <Spacer className="h-1" />
        <br />
        This package is available in multiples of GHS 500 and has an interest rate of 18% per year.As a starter bond
        holder, you will be entitled to receive your interest payments in two installments at 9% each.
        <Spacer className="h-1" />
        <br />
        Your interest will typically be paid into your BezoWallet every six months for a year. So, if you’re looking for
        a short-term investment opportunity with good returns, then our starter bond product might just be for you!'
        <Spacer className="h-1" />
        <br />
        <span className="font-medium text-lg text-lightgreen">REFERRALS: </span> <br />
        <span>
          Purchase our Starter bond and redeem a <span className="font-medium text-lg">GHS 15</span> reward instantly.
          <br />
          Refer a friend to purchase our Starter bond and redeem a <span className="font-medium text-lg">
            GHS 10
          </span>{' '}
          reward instantly.
        </span>
      </span>
    );
  }

  if (name === 'Trooper') {
    return (
      <span>
        Kudos! You’ve decided to take your financial journey a notch higher by investing in our trooper bond.
        <Spacer className="h-1" />
        <br />
        Our trooper bond is a 5 year valid bond product with the possibility of initiating a roll over or making a
        withdrawal of the capital after 3 years.
        <Spacer className="h-1" />
        <br />
        We are here to support you all the way! This package can be purchased in multiples of GHS 1000 at an interest
        rate of 20% per year. for 3 years. As a trooper bond holder, you will be entitled to receive your interest
        payments in two installments at 10% each.
        <Spacer className="h-1" />
        <br />
        Your interest will typically be paid into your BezoWallet every six months for a year. So, if you’re looking to
        take your financial journey to the next level, then our trooper bond product is exactly what you need!
        <Spacer className="h-1" />
        <br />
        <span className="font-medium text-lg text-lightgreen">REFERRALS: </span> <br />
        <span>
          Purchase our Trooper bond and redeem a <span className="font-medium text-lg">GHS 20</span> reward instantly.
          <br />
          Refer a friend to purchase our Trooper bond and redeem a <span className="font-medium text-lg">
            GHS 12
          </span>{' '}
          reward instantly.
        </span>
      </span>
    );
  }

  if (name === 'Vanguard') {
    return (
      <span>
        We commend your confidence and commitment to attain financial success by going all out with our vanguard bond.
        <Spacer className="h-1" />
        <br />
        Our vanguard bond can be purchased in multiples of GHS 1000 at an interest rate of 22% per year for 5 years. As
        a vanguard bondholder, you will be entitled to receive your interest payments in two installments at 11% each.
        <Spacer className="h-1" />
        <br />
        Your interest will typically be paid into your BezoWallet every six months for a year. So, if you’re looking to
        transform your financial future today, then our Vanguard Bond product is exactly what you need!
        <Spacer className="h-1" />
        <br />
        <span className="font-medium text-lg text-lightgreen">REFERRALS: </span> <br />
        <span>
          Purchase our Vanguard bond and redeem a <span className="font-medium text-lg">GHS 25</span> reward instantly.
          <br />
          Refer a friend to purchase our Vanguard bond and redeem a <span className="font-medium text-lg">
            GHS 15
          </span>{' '}
          reward instantly.
        </span>
      </span>
    );
  }
}

export interface InvestPackageValues {
  description?: string;
  duration?: number;
  brief?: string;
  title?: string;
  paymentSchedule?: string;
  investmentType?: string;
  minAmount?: number;
  name?: string;
  rate?: string;
  status?: 'active' | 'Inactive';
  _id?: string;
}

export const InvestPackages: React.FC<{ packages: InvestPackageValues[]; isfetching: boolean }> = ({
  packages,
  isfetching,
}) => {
  const { step, form, setForm } = useInvestContext();

  const displayPackage = packages?.filter((packages) => {
    return packages?.name === 'Vanguard';
  });

  const sortPackages = packages.sort((a, b) => {
    if (a.name! < b.name!) {
      return -1;
    }
    if (a.name! > b.name!) {
      return 1;
    }
    return 0;
  });

  if (step !== InvestSteps.SELECT_PACKAGE) {
    return null;
  }

  return isfetching ? (
    <div className="w-full flex justify-center my-6 animate-spin">
      <Spinner />
    </div>
  ) : (
    <>
      <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        Choose a {form.type?.name?.slice(-1) === 's' ? form.type?.name.slice(0, -1) : form.type?.name} package
      </h1>

      <p className="font-sans-body text-neutral-900">Select the duration of your investment </p>

      <Spacer className="h-4" />

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sortPackages?.map((InvestPackage) => {
          const { name, _id: id } = InvestPackage;
          const isSelected = form?.package?.name === name;

          return (
            <button
              key={id}
              onClick={() => {
                setForm({ ...form, package: InvestPackage });
              }}
              className={classNames(
                'flex flex-col sm:max-w-[240px] w-full sm:px-6 pl-5 py-8 border border-neutral-100 rounded-xl  hover:shadow-sm transition-all ease-linear goal-type-card',
                {
                  'bg-opacity-70 bg-neutral-100 hover:bg-primary-100 hover:bg-opacity-[15%] hover:border-none ':
                    !isSelected,
                  'bg-[#23D789] bg-opacity-[15%]': isSelected,
                }
              )}
            >
              <div className="flex items-start text-lightgreen">{resolveInvestIcon(form.type?.name!)}</div>
              <Spacer className="h-2" />
              <h3 className={classNames(' text-left font-medium font-sans text-lg text-neutral-500', {})}>
                {name === 'Bond' ? 'GOG Bond' : name}
              </h3>

              <Spacer className="h-2" />
              <p className={classNames('text-sm text-left font-sans-body text-neutral-500', {})}>
                {resolvePackageBrief(name)}
              </p>
            </button>
          );
        })}
      </div>

      <Spacer className="h-8" />

      {form?.package ? (
        <div>
          <p className="font-sans text-lightgreen font-medium text-2xl">{form?.package.title}</p>

          <Spacer className="h-3" />

          <div className="font-sans text-neutral-600 text-opacity-80  text-sm sm:mr-10">
            {resolvePackageDesc(form.package.name)}
          </div>
        </div>
      ) : null}

      <Spacer className="sm:h-16 h-8" />
    </>
  );
};
