import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { GroupGoalsData } from '../../../components/types';
import { RadioInput } from '@/components/input/radio-input';
import { useContributeContext } from '../contribute-context';
import { ContributeSteps } from '../../../lib/types';

export const GroupGoalList: React.FC = () => {
  const params = useParams();
  const [savingGoalSearch, setSavingGoalSearch] = useState('');
  const [filteredSavingGoals, setFilteredSavingGoals] = useState<GroupGoalsData[]>([]);
  const { groupGoals, selectedGroupGoal, setSelectedGroupGoal, step, setStep, setForm, form } = useContributeContext();

  useEffect(() => {
    if (groupGoals) {
      setFilteredSavingGoals(
        groupGoals.filter((groupGoal) => {
          return groupGoal?.goalName?.toLowerCase().match(savingGoalSearch.toLowerCase());
        })
      );
    }
  }, [savingGoalSearch]);

  useEffect(() => {
    if (params.refId) {
      setForm({ ...form, groupRefId: params.refId });
    }
  }, []);

  useEffect(() => {
    if (groupGoals?.length === 1) {
      setSelectedGroupGoal?.(groupGoals[0]);
      setStep?.(ContributeSteps.FORM_DETAILS);
    }
  }, [groupGoals]);

  if (step !== ContributeSteps.SELECT_GOAL) {
    return null;
  }

  return (
    <>
      <div className="px-7">
        <Input
          className="w-full rounded-lg pl-14 pr-7 py-4 focus:outline-none border border-neutral-200"
          type="search"
          placeholder="Search for saving account here.."
          onChange={(event) => {
            setSavingGoalSearch(event.target.value);
          }}
        />
      </div>

      <Spacer className=" h-4" />

      <div className="flex flex-col border-b border-neutral-100 h-[220px] overflow-y-auto">
        {(savingGoalSearch ? filteredSavingGoals : groupGoals!).map((groupGoal) => {
          return (
            <div
              className={classNames('w-full px-7 rounded-none transition ease-linear', {
                'bg-neutral-100': selectedGroupGoal?._id === groupGoal?._id,
                'bg-white': selectedGroupGoal?._id !== groupGoal?._id,
              })}
              key={groupGoal?._id}
            >
              <RadioInput
                id={groupGoal?._id!}
                text={groupGoal?.goalName!}
                value={groupGoal?.goalName!}
                name="saving-goal"
                className={classNames('w-full rounded-none transition ease-linear', {
                  'bg-transparent': selectedGroupGoal?._id === groupGoal?._id,
                  'bg-white': selectedGroupGoal?._id !== groupGoal?._id,
                })}
                checked={selectedGroupGoal?._id === groupGoal?._id}
                onChange={() => {
                  setSelectedGroupGoal?.(groupGoal);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
