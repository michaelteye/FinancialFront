import classNames from 'classnames';
import React, { useContext } from 'react';
import { GoalTypeProps, GroupSavingsType } from '../lib/types';
import { Spacer } from '@/components/spacer';
import SvgUmbrella from '@/components/icons/Umbrella';
import SvgReceipt2 from '@/components/icons/Receipt2';
import SvgCardHolder from '@/components/icons/CardHolder';
import { CreateGroupSavingsGoalFormContext, defaultFirstStep } from './create-group-goal-context';

const GoalType: React.FC<GoalTypeProps> = ({ icon: Icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col p-10 w-full bg-[#ECF1F480] bg-opacity-50 border border-[#ECF1F480] rounded-2xl hover:bg-primary-400 hover:bg-opacity-[15%] goal-type-card"
    >
      <div className="flex items-center space-x-3">
        <Icon />

        <p className="font-sans text-lg font-medium text-neutral-500">{title}</p>
      </div>

      <Spacer className="h-3" />

      <p className="text-left font-sans-body text-sm text-[#000] ">{description}</p>
    </button>
  );
};

export const GroupGoalType = () => {
  const { step, setValue, setStepChange } = useContext(CreateGroupSavingsGoalFormContext);

  return (
    <div
      className={classNames({
        hidden: step !== defaultFirstStep,
        '': step === defaultFirstStep,
      })}
    >
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Choose a saving goal type</h1>

      <Spacer className="h-4" />

      <p className="font-sans text-[#000]">Type of savings goal to create</p>

      <Spacer className="h-2" />

      <div className="flex flex-col space-y-3 overflow-y-auto">
        <GoalType
          icon={SvgUmbrella}
          title="Default"
          onClick={() => {
            setStepChange?.(true);
            setValue('nature', GroupSavingsType.DEFAULT);
          }}
          description="At the end of the savings goal, all the money is retrieved by the group creator."
        />

        <Spacer className="h-2" />

        <GoalType
          icon={SvgReceipt2}
          title="Split and share"
          onClick={() => {
            setStepChange?.(true);
            setValue('nature', GroupSavingsType.SPLIT_AND_SHARE);
          }}
          description="At the end of the savings goal, all funds are distributed evenly among all contributors."
        />

        <Spacer className="h-2" />

        <GoalType
          icon={SvgCardHolder}
          title="Rotational"
          onClick={() => {
            setStepChange?.(true);
            setValue('nature', GroupSavingsType.ROTATIONAL);
          }}
          description="At the end of the savings goal, all funds are given to one person. The cycle starts again, funds will be given to another person. This goes on until every group member has received funds."
        />
      </div>
    </div>
  );
};
