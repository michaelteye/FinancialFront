import * as yup from 'yup';
import { Spacer } from '@/components/spacer';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Input } from '@/components/input/input';
import { Button } from '@/components/button';
import SvgArrowRight from '@/components/icons/ArrowRight';
import { Select } from '@/components/input/select';
import { ProfileDetailContext } from './profile-context';
import { regionOptions } from '@/pages/dashboard/settings/lib/data';

const personalDetailsValidationSchema = yup.object().shape({
  homeAddress: yup.string().required('Please provide your home Address'),
  region: yup.string().required('Please provide a valid region'),
});

export function getValidDateOfBirth(date: Date | string) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}

function parseErrorsToMap(errors: { inner: yup.ValidationError[] }) {
  let errorsMap: any = {};

  errors.inner.forEach((validationError: yup.ValidationError) => {
    errorsMap[validationError.path!] = validationError.message;
  });

  if (errors?.inner.length === 0) {
    return undefined;
  }

  return errorsMap;
}

export const AddressInformation = () => {
  const { step, showPrevStep, showNextStep, form, setValue } = useContext(ProfileDetailContext);
  const [errors, setErrors] = useState<any>({});

  const validateAndSubmitDataToApi = async () => {
    personalDetailsValidationSchema
      .validate(form, {
        abortEarly: false,
      })
      .then(() => {
        showNextStep();
      })
      .catch((error) => {
        setErrors(parseErrorsToMap(error));
      });
  };

  function clearError(key: string) {
    setErrors({ ...errors, [key]: undefined });
  }

  return (
    <div
      className={classNames({
        hidden: step !== 2,
        '': step === 2,
      })}
    >
      <h1 className="mt-24 font-sans font-extrabold text-5.5 leading-14 text-neutral-500">Almost there 😁</h1>

      <Spacer className=" h-3" />

      {/* <p className=" font-sans-body text-neutral-500 font-normal">
        Please complete the form below to help us get to know more about you and also setup your profile
      </p> */}

      <Spacer className=" h-10" />

      <p className=" text-sm text-neutral-400 ">Step 2/2</p>
      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Address Information</h2>

      <Spacer className=" h-6" />

      <div className=" lg:flex w-full lg:space-x-6">
        <div className=" lg:w-1/2">
          <Input
            label="Home address"
            error={errors.homeAddress}
            placeholder="Eg. Adenta ...."
            value={form.homeAddress}
            onChange={(event) => {
              setValue('homeAddress', event.target.value);
              clearError('homeAddress');
            }}
          />
        </div>

        <div className=" lg:mt-0 mt-6 lg:w-1/2">
          <Input
            label="Ghana Post digital address (Optional)"
            placeholder="Eg. GM-323-222 ...."
            value={form.gpsAddress}
            mask="aa-9999999"
            onChange={(event) => {
              setValue('gpsAddress', event.target.value.toUpperCase());
            }}
          />
        </div>
      </div>

      <Spacer className=" lg:h-8 h-6" />

      <div className=" lg:flex w-full lg:space-x-6">
        <div className=" lg:w-1/2">
          <Input label="Country" error={errors.country} value="Ghana" readOnly />
        </div>
        <div className=" lg:mt-0 mt-6 lg:w-1/2">
          <Select
            label="Region/State"
            error={errors.region}
            placeholder="Please select your region"
            options={regionOptions}
            value={form.region}
            onChange={(event) => {
              setValue('region', event.target.value);
              clearError('region');
            }}
          />
        </div>
      </div>

      <Spacer className=" h-14" />

      <div className=" text-right ">
        <div className=" lg:inline-flex lg:space-x-2 lg:w-3/4">
          <Button className=" w-full flex justify-center" variant="secondary" onClick={showPrevStep}>
            <div className=" flex lg:space-x-2">
              <span>
                <SvgArrowRight className=" mr-2" />
              </span>
              Back{' '}
            </div>
          </Button>
          <Button className=" w-full lg:mt-0 mt-4" onClick={validateAndSubmitDataToApi}>
            Continue
          </Button>
        </div>
      </div>
      <Spacer className=" lg:h-0 h-10" />
    </div>
  );
};
