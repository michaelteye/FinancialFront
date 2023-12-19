import React, { useContext } from 'react';
import { Spacer } from '@/components/spacer';
import { CreateGroupFormContextSteps } from '../../lib/types';
import { CreateGroupFormContext } from '../group-form-context';

export const CreateGroupProgressBar = () => {
  const { step } = useContext(CreateGroupFormContext);

  const width = (step! / CreateGroupFormContextSteps.ADD_MEMBERS) * 100;

  return (
    <>
      <h3 className="font-medium font-sans-body">
        Steps {step}/{CreateGroupFormContextSteps.ADD_MEMBERS}
      </h3>

      <Spacer className="h-4" />

      <div className="w-full h-[6px] rounded-full bg-neutral-100 relative">
        <div className="absolute bg-success-300 w-full h-[6px] rounded-full" style={{ width: `${width}%` }}></div>
      </div>

      <Spacer className="h-6" />
    </>
  );
};
