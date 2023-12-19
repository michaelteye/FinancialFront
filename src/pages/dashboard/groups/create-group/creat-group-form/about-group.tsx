import * as yup from 'yup';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { CreateGroupFormContext } from '../group-form-context';
import { CreateGroupFormContextSteps } from '../../lib/types';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';

const CreateGroupSchema = yup.object().shape({
  groupName: yup.string().required('Please provide a group name'),
  description: yup.string().required('Please provide a group description'),
});

export const AboutGroup: React.FC = () => {
  const [validateError, setValidateError] = useState<any>({});
  const { step, form, showNextStep, setValue } = useContext(CreateGroupFormContext);

  const validate = async () => {
    CreateGroupSchema.validate(form, {
      abortEarly: false,
    })
      .then(() => showNextStep())
      .catch((error) => {
        setValidateError(parseErrorsToMap(error));
      });
  };

  return (
    <>
      <div
        className={classNames({
          hidden: step !== CreateGroupFormContextSteps.ABOUT_GROUP,
          '': step === CreateGroupFormContextSteps.ABOUT_GROUP,
        })}
      >
        <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
          Tell us about your saving group.
        </h1>

        <Spacer className="h-6" />

        <Input
          error={validateError?.groupName}
          label="Saving group name"
          placeholder="eg. Class of 2021"
          onChange={(event) => {
            setValue?.('groupName', event.target.value);
            setValidateError({ ...validateError, groupName: undefined });
          }}
        />

        <Spacer className="h-6" />

        <label className="font-sans font-semibold text-sm text-neutral-400" htmlFor="group-description">
          Group description
        </label>

        <Spacer className="h-1" />

        <textarea
          className={classNames('box-border w-full rounded-lg focus:outline-none p-4 border ', {
            'border-secondary-200 focus:outline-none': validateError.description,
            'border-neutral-200 focus:ring-primary-100 focus:ring-1 ': !validateError.description,
          })}
          id="group-description"
          cols={10}
          rows={6}
          placeholder='eg. Class of 2021"'
          onChange={(event) => {
            setValue?.('description', event.target.value);
            setValidateError({ ...validateError, description: undefined });
          }}
        />

        {validateError?.description ? (
          <p className=" text-secondary-200 text-sm font-sans-body mt-2">{validateError?.description}</p>
        ) : null}

        <ActionButtons hideCancel onNext={() => validate()} />
      </div>
    </>
  );
};
