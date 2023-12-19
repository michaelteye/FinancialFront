import { Spacer } from '@/components/spacer';
import SvgBills from '@/components/icons/Bills';
import SvgBonds from '@/components/icons/Bonds';
import SvgBondSm from '@/components/icons/BondSm';
import SvgFixedDeposits from '@/components/icons/FixedDeposits';
import SvgFixedDepositsSm from '@/components/icons/FixedDepositsSm';
import SvgTreasuryBillsSm from '@/components/icons/TreasuryBillsSm';

import classNames from 'classnames';
import { useInvestContext } from '../invest-ctx';
import { InvestmentData, InvestSteps } from '../types';

export function resolveInvestIcon(type: string, small?: boolean) {
  if (type === 'Bonds') {
    return small ? <SvgBondSm /> : <SvgBonds />;
  }
  if (type === 'Treasury Bills') {
    return small ? <SvgTreasuryBillsSm /> : <SvgBills />;
  }
  if (type === 'Fixed Deposits') {
    return small ? <SvgFixedDepositsSm /> : <SvgFixedDeposits />;
  }
}
export const InvestTypes: React.FC<{ investTypes: InvestmentData[] }> = ({ investTypes }) => {
  const { step, setStep, form, setForm } = useInvestContext();

  if (step !== InvestSteps.SELECT_TYPE) {
    return null;
  }

  return (
    <>
      <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        Create your investment goal
      </h1>

      <p className="font-sans-body text-neutral-900">Choose from our investment types</p>

      <Spacer className="h-4" />

      <div className="w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {investTypes.map((investType) => {
          const { name, _id: id, status, brief } = investType;
          const active = status === 'active';
          const isSelected = form?.type?.name === name;

          return (
            <button
              key={id}
              onClick={() => {
                if (!active) {
                  return;
                }
                setForm({ ...form, type: investType });
              }}
              className={classNames(
                'flex flex-col lg:max-w-[240px] w-full lg:px-6 pl-5 py-8 border border-neutral-100 rounded-xl goal-type-card',
                {
                  'bg-opacity-50 bg-neutral-100 hover:shadow-sm transition-all ease-linear hover:bg-primary-100 hover:bg-opacity-[15%]':
                    active && !isSelected,
                  'bg-opacity-20 bg-neutral-100 cursor-not-allowed': !active && !isSelected,
                  'bg-[#23D789] bg-opacity-[15%]': isSelected,
                }
              )}
            >
              <div className="flex items-start text-lightgreen">{resolveInvestIcon(name!)}</div>
              <Spacer className="h-2" />
              <h3
                className={classNames(' text-left font-medium font-sans text-lg', {
                  'text-neutral-500': active,
                  'text-neutral-500 text-opacity-50': !active,
                })}
              >
                {name}
              </h3>

              <Spacer className="h-2" />
              <p
                className={classNames('text-sm text-left font-sans-body', {
                  'text-neutral-500': active,
                  'text-neutral-500 text-opacity-50': !active,
                })}
              >
                {active ? brief : 'Coming Soon'}
              </p>
            </button>
          );
        })}
      </div>

      <Spacer className="h-8" />

      {form?.type ? (
        <div>
          <p className="font-sans text-lightgreen font-medium text-2xl">{form.type?.title}</p>

          <Spacer className="h-3" />

          <div className="font-sans text-neutral-600 text-opacity-80 text-sm sm:mr-10">
            {form.type.description?.split('.').map((desc, idx) => {
              return (
                <span key={idx}>
                  {idx === 2 || idx === 4 ? <Spacer /> : null}

                  <span>{`${desc}${idx === form.type?.description?.split('.').length! - 1 ? '' : '.'}`}</span>
                </span>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
