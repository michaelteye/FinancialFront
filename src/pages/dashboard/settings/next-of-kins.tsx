import * as yup from 'yup';
import { Button } from '@/components/button';
import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { useEffect, useState } from 'react';
import { ProfileForm } from '@/pages/auth/register/personal-details-form/profile-context';
import { Select } from '@/components/input/select';
import { nextOfKinsProfileSchema } from './lib/validation-schema';
import { RequestMethod, useApi } from '@/helpers/api';
import { getValidPhoneNumberFromMask } from '@/pages/auth/login/login';
import { useMessagesStore } from '@/store/messages';
import { Spinner } from '@/components/spinner';
import { useNextOfKinDetails } from '@/hooks/useNextOfKinDetails';
import { genderOptions, regionOptions } from './lib/data';
import { PhoneNumberInput } from '@/components/input/phone-number-input';
import { useAuthStore } from '@/store/auth';

//

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

// main component

export const NextOfKins = () => {
  const { userProfile } = useAuthStore();
  const { displayMessage } = useMessagesStore();
  const [updateError, setUpdateError] = useState<Partial<Record<keyof ProfileForm, string>>>({});
  const { data, isFetchingNextOfkinDetails } = useNextOfKinDetails();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    occupation: '',
    homeAddress: '',
    gender: '',
    gpsAddress: '',
    relationship: '',
    country: '',
    region: '',
    phone: '',
  });

  const setValue = (key: keyof ProfileForm, value: any) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const { submit: setNextOfKin, isLoading: isCreatingNextOfKin } = useApi('/users/nextofkin', {
    onSuccess() {
      displayMessage({
        title: 'Successful',
        description: ' Your Next of Kin profile has been successfully set',
        variant: 'success',
      });
    },
    onError() {
      displayMessage({
        title: 'Error',
        description: 'Something went wrong! Please try again later.',
        variant: 'error',
      });
    },
  });
  const { submit: updateNextOfKin, isLoading: isUpdatingNextOfKin } = useApi(
    `/users/nextofkin/update/${userProfile?.userId}`,
    {
      onSuccess() {
        displayMessage({
          title: 'Successful',
          description: ' Your Next of Kin profile has been successfully updated',
          variant: 'success',
        });
      },
      onError() {
        displayMessage({
          title: 'Error',
          description: 'Something went wrong! Please try again later.',
          variant: 'error',
        });
      },
      method: RequestMethod.PUT,
    }
  );

  useEffect(() => {
    setForm({
      ...data,
    });
  }, [data]);

  const submitNextOfKinDetails = () => {
    const nextOfKinMethod = data ? updateNextOfKin : setNextOfKin;

    nextOfKinMethod({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: getValidPhoneNumberFromMask(form.phone),
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      homeAddress: form.homeAddress,
      gpsAddress: form.gpsAddress,
      country: form.country,
      region: form.region,
      relationship: form.relationship,
      occupation: form.occupation,
    });
  };

  const updateProfileInfo = async () => {
    nextOfKinsProfileSchema
      .validate(form, {
        abortEarly: false,
      })
      .then(() => {
        submitNextOfKinDetails();
      })
      .catch((error) => {
        setUpdateError(parseErrorsToMap(error));
      });
  };

  function clearError(key: string) {
    setUpdateError({ ...updateError, [key]: undefined });
  }

  if (isFetchingNextOfkinDetails) {
    return (
      <div className="flex items-center justify-center my-12">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Spacer className=" h-8" />

      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Next - of - kin Details</h2>

      <Spacer className=" h-6" />

      <div>
        <div className=" flex flex-col lg:flex-row lg:space-x-8 lg:w-8/12">
          <div className=" lg:w-1/2">
            <Input
              id="first-name"
              label="First Name"
              type="text"
              placeholder="Linda"
              value={form.firstName}
              error={updateError?.firstName}
              onChange={(event) => {
                setValue('firstName', event?.target.value);
                clearError('firstName');
              }}
            />
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className=" lg:w-1/2">
            <Input
              id="last-name"
              label="Last Name"
              type="text"
              placeholder="Danielada"
              value={form.lastName}
              error={updateError?.lastName}
              onChange={(event) => {
                setValue('lastName', event?.target.value);
                clearError('lastName');
              }}
            />
          </div>
        </div>

        <Spacer className=" h-6" />

        <div className=" flex lg:flex-row flex-col lg:space-x-8 lg:w-8/12">
          <div className=" lg:w-1/2">
            <Input
              id="occupation"
              label="Occupation"
              type="text"
              placeholder="Eg. Nurse"
              value={form.occupation}
              error={updateError?.occupation}
              onChange={(event) => {
                setValue('occupation', event?.target.value);
                clearError('occupation');
              }}
            />
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className=" lg:w-1/2">
            <Select
              id="gender"
              label="Gender"
              placeholder="Select gender"
              options={genderOptions}
              value={form.gender}
              error={updateError?.gender}
              onChange={(event) => {
                setValue('gender', event?.target.value);
                clearError('gender');
              }}
            />
          </div>
        </div>

        <Spacer className=" h-6" />

        <div className="flex lg:flex-row flex-col lg:space-x-8 relative lg:w-8/12">
          <div className=" lg:w-1/2">
            <PhoneNumberInput
              label="Phone Number"
              value={form.phone}
              error={updateError?.phone}
              flagClassName="top-[42px] left-5"
              labelClassName="text-sm font-semibold"
              onChange={(event) => {
                setValue('phone', event?.target.value);
                clearError('phone');
              }}
            />
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className=" lg:w-1/2">
            <Input
              id="Relation to next-of-kin"
              label="Relation to next-of-kin"
              type="text"
              placeholder="eg. Sister"
              value={form.relationship}
              error={updateError?.relationship}
              onChange={(event) => {
                setValue('relationship', event?.target.value);
                clearError('relationship');
              }}
            />
          </div>
        </div>
      </div>

      <Spacer className=" h-16" />

      <div>
        <h2 className=" font-sans font-medium text-2xl text-neutral-400">Address Information</h2>

        <Spacer className=" h-6" />

        <div>
          <div className=" flex lg:flex-row flex-col lg:space-x-8 lg:w-10/12 ">
            <div className=" lg:w-1/2">
              <Input
                id="home-address"
                label="Home address"
                type="text"
                placeholder="Eg. Adenta ...."
                value={form.homeAddress}
                error={updateError?.homeAddress}
                onChange={(event) => {
                  setValue('homeAddress', event?.target.value);
                  clearError('homeAddress');
                }}
              />
            </div>

            <Spacer className="lg:hidden h-6" />

            <div className=" lg:w-1/2">
              <Input
                id="ghana-post-digital-address"
                type="text"
                label="Ghana Post digital address"
                placeholder="Eg. GM-323-222 ...."
                value={form.gpsAddress}
                onChange={(event) => {
                  setValue('gpsAddress', event?.target.value);
                  clearError('gpsAddress');
                }}
              />
            </div>
          </div>

          <Spacer className=" h-6" />

          <div className=" flex lg:flex-row flex-col lg:space-x-8 lg:w-10/12">
            <div className=" lg:w-1/2">
              <Input id="country" label="Country" type="text" value="Ghana" readOnly />
            </div>

            <Spacer className="lg:hidden h-6" />

            <div className=" lg:w-1/2">
              <Select
                id="region/state"
                label="Region/State"
                placeholder="Select Region/state"
                options={regionOptions}
                value={form.region}
                error={updateError?.region}
                onChange={(event) => {
                  setValue('region', event?.target.value);
                  clearError('region');
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Spacer className=" h-12" />

      <Button
        className="w-full sm:w-auto"
        loading={isCreatingNextOfKin || isUpdatingNextOfKin}
        onClick={updateProfileInfo}
      >
        Save next of kins info
      </Button>

      <Spacer className=" h-20" />
      <Spacer className="sm:hidden h-10" />
    </>
  );
};
