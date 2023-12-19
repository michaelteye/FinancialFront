import classnames from 'classnames';
import { Title } from '../components/title';
import { Spacer } from '@/components/spacer';
import CreateSavingsGoal from './create-savings-goal';
import { LeftArrow, Plus, RightArrow } from '@/components/icons';
import { TopupWithdrawButtons } from './components/action-buttons';
import { Fragment, PropsWithChildren, useEffect, useState } from 'react';

import { SavingsListCard } from './savings-transactions/savings-list-card';
import { SavingsOperations } from './savings-transactions/topup-withdraw-savings/operations-setup';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSearchParams } from 'react-router-dom';

import Slider from 'react-slick';
import useGoals from '@/hooks/fetch-goal';
import { useWidth } from '@/hooks/use-width';
import { ActionTypes, SavingGoal } from './helpers/types';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/input/input';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { SavingsDetailsRatingsRow } from './savings-details-row';
import SvgNoInvites from '@/components/icons/NoInvites';

export function CarouselArrow({
  children,
  onClick,
  right,
  referral,
}: PropsWithChildren<{
  onClick?: () => void;
  right?: boolean;
  referral?: boolean;
  className?: string;
}>) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        ` rounded-full shadow-xl z-40 absolute flex items-center justify-center bg-white top-[40%]`,
        {
          'right-[-24px] w-12 h-12': right && !referral,
          'left-[-24px] w-12 h-12': !right && !referral,
          'right-[5px] w-6 h-6': referral,
          'left-[5px] w-6 h-6': !right && referral,
        }
      )}
    >
      {children}
    </button>
  );
}

export const Savings = () => {
  const width = useWidth();
  const [searchParams] = useSearchParams();

  const { goals, isFetchingUserSavingsGoals } = useGoals();
  const [savingGoalSearch, setSavingGoalSearch] = useState('');
  const [topUpSavingsGoal, setTopUpSavingsGoal] = useState(false);
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([]);
  const [addingSavingsGoal, setAddingSavingsGoal] = useState(false);
  const [withDrawFromSavingsGoal, setWithdrawFromSavingsGoal] = useState(false);
  const [filteredSavingGoals, setFilteredSavingGoals] = useState<SavingGoal[]>([]);

  useEffect(() => {
    setSavingGoals(goals);
  }, [goals]);

  useEffect(() => {
    setFilteredSavingGoals(
      savingGoals?.filter((savingGoal) => {
        return savingGoal?.name?.toLowerCase().match(savingGoalSearch?.toLowerCase());
      })
    );
  }, [savingGoalSearch]);

  useEffect(() => {
    if (!isFetchingUserSavingsGoals) {
      setAddingSavingsGoal(!!searchParams.get('create') === true);
      setTopUpSavingsGoal(!!searchParams.get('topUp') === true);
      setWithdrawFromSavingsGoal(!!searchParams.get('withdraw') === true);
    }
  }, [isFetchingUserSavingsGoals]);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: width < EScreenBreakpoints.LG ? 1 : 3,
    slidesToScroll: 1,
    nextArrow: (
      <CarouselArrow right>
        <RightArrow />
      </CarouselArrow>
    ),
    prevArrow: (
      <CarouselArrow>
        <LeftArrow />
      </CarouselArrow>
    ),
  };

  const favoriteSavingGoals = savingGoals?.filter((goal) => goal.isFavorite);

  const renderedSavingGoals = favoriteSavingGoals?.map((savingGoal, index) => {
    return (
      <div key={savingGoal.id} className="w-full h-72 lg:pr-4 bg-transparent">
        <SavingsListCard className={index % 2 === 1 ? 'savingCardOdd' : undefined} savingGoal={savingGoal} />
      </div>
    );
  });

  const SliderWrapper = width < EScreenBreakpoints.LG ? 'div' : Fragment;

  return (
    <>
      <SavingsOperations
        open={topUpSavingsGoal}
        setOpen={setTopUpSavingsGoal}
        action={ActionTypes.TOPUP}
        savingGoals={savingGoals}
      />
      <SavingsOperations
        open={withDrawFromSavingsGoal}
        setOpen={setWithdrawFromSavingsGoal}
        action={ActionTypes.WITHDRAW}
        savingGoals={savingGoals}
      />

      <CreateSavingsGoal
        open={addingSavingsGoal}
        onTopup={() => setTopUpSavingsGoal(true)}
        setOpen={setAddingSavingsGoal}
      />

      <Title title="Savings Goals" />

      <Spacer className=" h-5" />

      <TopupWithdrawButtons noMobileChange />

      <Spacer className=" h-5" />

      <p className="text-lg font-sans font-medium text-neutral-400 mt-8">Recently added / Favorite saving goal </p>

      <Spacer className=" h-6" />

      {isFetchingUserSavingsGoals ? (
        <div className="w-full flex justify-center my-6">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
            <button
              onClick={() => setAddingSavingsGoal(true)}
              className="lg:px-9 border border-neutral-100 bg-neutral-100 bg-opacity-50 rounded-xl h-72 items-center hover:shadow-md transition duration-75 ease-linear"
            >
              <div className="flex flex-col  items-center">
                <Plus />
                <p className="font-sans text-sm text-[#000] text-center">Create savings goal</p>
              </div>
            </button>

            <SliderWrapper>
              {renderedSavingGoals?.length > 3 || width <= EScreenBreakpoints.LG ? (
                <Slider className="col-span-3" {...settings}>
                  {renderedSavingGoals}
                </Slider>
              ) : (
                renderedSavingGoals
              )}
            </SliderWrapper>
          </div>
          <div className=" flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:justify-between mt-15">
            <p className="font-sans font-medium text-2xl text-neutral-400 ">All Savings goals</p>
            <div className="lg:w-1/3">
              <Input
                className="rounded-xl border border-[#161617] border-opacity-5 bg-[#ecf1f4] bg-opacity-30 placeholder-opacity-40 text-sm py-3"
                type="search"
                placeholder="Search savings goal"
                onChange={(event) => {
                  setSavingGoalSearch(event.target.value);
                }}
              />
            </div>
          </div>
          <Spacer className=" h-12" />

          {savingGoals?.length === 0 ? (
            <div className="flex flex-col space-y-2 items-center justify-center">
              <SvgNoInvites />
              <p className="font-bold text-sm font-sans text-[#000]">No savings goal created</p>

              <p className="text-sm font-sans-body text-[#000] text-center">
                You have not created any savings goals yet.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-scroll lg:overflow-x-auto">
              <div className="overflow-x-scroll lg:overflow-x-auto w-full">
                {(savingGoalSearch ? filteredSavingGoals : savingGoals)?.map((savingGoal) => {
                  return (
                    <SavingsDetailsRatingsRow
                      key={savingGoal?.id}
                      savingGoal={savingGoal}
                      onFavorite={() => {
                        setSavingGoals(
                          savingGoals?.map((goal) => {
                            if (goal.id === savingGoal?.id) {
                              return {
                                ...goal,
                                isFavorite: !goal.isFavorite,
                              };
                            }
                            return goal;
                          })
                        );
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <Spacer className="sm:hidden h-24" />
          <Spacer className="h-10" />
        </>
      )}
    </>
  );
};
