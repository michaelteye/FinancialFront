import * as yup from 'yup';
import { Spacer } from '@/components/spacer';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { FunctionComponent, useContext, useState } from 'react';
import { ProfileDetailContext } from './profile-context';
import { Input } from '@/components/input/input';
import { Button } from '@/components/button';
import { useAuthStore } from '@/store/auth';
import { parseErrorsToMap } from '../../components/error';
import { BirthDateInput } from '@/components/input/birth-date-input';

//

const personalDetailsValidationSchema = yup.object().shape({
  firstName: yup.string().required('Please provide your first name'),
  lastName: yup.string().required('Please provide your last name'),
  email: yup.string().email(),
  dateOfBirth: yup.date().required('Please provide a valid date of birth.').typeError('Please select a valid date.'),
  occupation: yup.string().typeError('Please provide a valid occupation').required('Please provide your occupation'),
  gender: yup.string().oneOf(['male', 'female'], 'Please select your gender').required('Please select your gender'),
});

export const ErrorText: FunctionComponent = ({ children }) => {
  return <p className="text-secondary-200 text-sm font-sans-body mt-2">{children}</p>;
};

export const PersonalDetails = () => {
  const { userId } = useAuthStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const { step, showNextStep, form, setValue } = useContext(ProfileDetailContext);

  // useEffect(() => {
  //   if (!userId) {
  //     navigate('/auth/register');
  //   }
  // }, []);

  function clearError(key: string) {
    setErrors({ ...errors, [key]: undefined });
  }

  //****************** ERROR HANDLING ********************
  // set the errors.message to be the error displayed when ever the errors.path equals the key of the object in state
  const onContinue = async () => {
    personalDetailsValidationSchema
      .validate(form, {
        abortEarly: false,
      })
      .then(showNextStep)
      .catch((error) => {
        setErrors(parseErrorsToMap(error));
      });
  };

  return (
    <div
      className={classNames(` relative`, {
        hidden: step !== 1,
        '': step === 1,
      })}
    >
      <h1 className="mt-24 font-sans font-extrabold lg:text-5.5 text-4xl lg:leading-14 text-neutral-500">
        Now, let’s get to know each other 😄
      </h1>

      <Spacer className=" lg:h-3 h-3" />

      <p className=" font-sans-body text-neutral-500 font-normal">
        We’d love to get to know you! Mind sharing a few deets with us?
      </p>

      <Spacer className=" h-10" />

      <p className=" text-sm text-neutral-400 ">Step 1/2</p>
      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Personal details</h2>

      <Spacer className=" h-6" />

      <div className="lg:flex w-full lg:space-x-8">
        <div className="lg:w-1/2">
          <Input
            label="First name"
            value={form.firstName}
            error={errors?.firstName}
            onChange={(event) => {
              setValue('firstName', event.target.value);
              clearError('firstName');
            }}
          />
        </div>

        <div className=" lg:mt-0 mt-6 lg:w-1/2">
          <Input
            label="Last name"
            value={form.lastName}
            error={errors.lastName}
            onChange={(event) => {
              setValue('lastName', event.target.value);
              clearError('lastName');
            }}
          />
        </div>
      </div>

      <Spacer className="lg:h-10 h-6" />

      <div className="lg:flex lg:space-x-8">
        <div className="lg:w-1/2 ">
          <div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="date-of-birth" className="font-sans font-semibold text-sm text-neutral-400">
                Date of birth
              </label>
              <div className=" flex flex-col space-x-8">
                <div id="date-of-birth" className=" relative flex items-center w-full">
                  <BirthDateInput
                    onChange={(dateOfBirth) => {
                      setValue('dateOfBirth', dateOfBirth);
                      clearError('dateOfBirth');
                    }}
                    value={form.dateOfBirth}
                  />
                </div>
              </div>
            </div>
          </div>

          {errors.dateOfBirth ? <ErrorText>{errors?.dateOfBirth}</ErrorText> : null}
        </div>

        <div className=" lg:mt-0 mt-6 lg:w-1/2">
          <Input
            label="Occupation"
            placeholder="Eg. Nurse"
            value={form.occupation}
            error={errors.occupation}
            onChange={(event) => {
              setValue('occupation', event.target.value);
              clearError('occupation');
            }}
          />
        </div>
      </div>

      <Spacer className=" h-6" />

      <div className=" flex flex-wrap lg:flex-nowrap w-full lg:space-x-8">
        <div className="w-full lg:w-1/2">
          <Input
            label="Email(Optional)"
            value={form.email}
            type="email"
            error={errors?.email}
            placeholder="Please provide your email"
            onChange={(event) => {
              setValue('email', event.target.value);
              clearError('email');
            }}
          />
        </div>

        <Spacer className="h-6 lg:hidden" />

        <div className="w-full lg:w-1/2">
          <p className=" font-sans text-sm font-medium text-neutral-400">Gender</p>

          <Spacer className="lg:h-6 h-1" />

          <div className=" flex lg:space-x-8 w-1/2 space-x-3">
            <label htmlFor="male" className=" flex space-x-1 items-center">
              <input
                type="radio"
                id="male"
                className=" w-4 h-4 border border-neutral-400"
                name="gender"
                value="Male"
                onChange={() => {
                  setValue('gender', 'male');
                  clearError('gender');
                }}
              />
              <p className="mr-4 font-sans-body text-neutral-900">Male</p>
            </label>
            <label htmlFor="Female" className=" flex space-x-1 items-center">
              <input
                type="radio"
                id="Female"
                className=" w-4 h-4 border border-neutral-400"
                name="gender"
                value="Female"
                onChange={() => {
                  setValue('gender', 'female');
                  clearError('gender');
                }}
              />
              <p className="mr-4 font-sans-body text-neutral-900">Female</p>
            </label>
          </div>
          {errors.gender ? <ErrorText>{errors?.gender}</ErrorText> : null}
        </div>
      </div>

      <Spacer className="lg:h-8 h-5" />

      <div className=" lg:w-1/2 w-full flex absolute right-0">
        <Button className=" w-full" onClick={onContinue}>
          Continue
        </Button>
      </div>

      <Spacer className=" h-20" />
    </div>
  );
};
