import SvgBuildings from '@/components/icons/Buildings';
import SvgCardHolder from '@/components/icons/CardHolder';
import SvgCoin from '@/components/icons/Coin';
import SvgReceipt2 from '@/components/icons/Receipt2';
import SvgRichfluencer from '@/components/icons/Richfluencer';
import SvgStore from '@/components/icons/Store';
import SvgTrophy from '@/components/icons/Trophy';
import SvgUmbrella from '@/components/icons/Umbrella';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { useGoalTypes } from '@/hooks/useGoalTypes';
import { FunctionComponent, useContext } from 'react';
import { CreateSavingsAccountFormContext } from '../components/form-context';
import { CreateSavingsAccountFormSteps } from '../helpers/types';

function resolveGoalTypeIcon(goalType: string) {
  if (goalType === 'Business') {
    return <SvgStore />;
  }
  if (goalType === 'Other') {
    return <SvgCardHolder />;
  }
  if (goalType === 'Rent') {
    return <SvgBuildings />;
  }
  if (goalType === 'Halal') {
    return <SvgCoin />;
  }
  if (goalType === 'Fees') {
    return <SvgReceipt2 />;
  }
  if (goalType === 'Richfluencer') {
    return <SvgRichfluencer />;
  }
  if (goalType === '90 Days Challenge') {
    return <SvgTrophy />;
  }
  return <SvgUmbrella />;
}

export const GoalType: FunctionComponent<{
  onClick?: () => void;
  goalType?: string;
}> & { Title: typeof GoalTitle; Description: typeof GoalDescription } = ({ children, onClick, goalType }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col lg:max-w-[240px] w-full lg:px-5 pl-5 py-8 border border-neutral-100 bg-neutral-100 rounded-xl goal-type-card hover:shadow-sm transition-all ease-linear hover:bg-primary-100 hover:bg-opacity-[15%] hover:border-none"
    >
      <div className="flex items-start">{resolveGoalTypeIcon(goalType!)}</div>

      <Spacer className="h-1" />

      <div className="flex flex-col">
        <div className="max-w-[240px]">{children}</div>
      </div>
    </button>
  );
};

const GoalTitle: FunctionComponent = ({ children }) => {
  return <h3 className="text-neutral-500 text-left font-medium font-sans text-lg">{children}</h3>;
};

const GoalDescription: FunctionComponent = ({ children }) => {
  return <p className="text-sm text-left text-neutral-900 font-sans-body">{children}</p>;
};

GoalType.Title = GoalTitle;
GoalType.Description = GoalDescription;

// ****************** MAIN COMPONENT ***************** /

export function SelectGoalType() {
  const { showNextStep, step, setValue } = useContext(CreateSavingsAccountFormContext);
  const { data: savingGoalTypes, isFetching } = useGoalTypes();

  const onSelect = (goalTypeId: string) => {
    showNextStep();
    setValue('goalTypeId', goalTypeId);
  };

  if (step !== CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE) {
    return null;
  }
  if (isFetching) {
    return (
      <div className="flex h-screen justify-center items-center my-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savingGoalTypes?.map((type) => (
          <GoalType key={type.name} goalType={type.name} onClick={() => onSelect(type?.id)}>
            <GoalType.Title>{type?.name} </GoalType.Title>
            <Spacer className="h-2" />
            <GoalType.Description>{type?.description}</GoalType.Description>
          </GoalType>
        ))}
        <div className=" sm:hidden mt-20" />
      </div>
    </>
  );
}
