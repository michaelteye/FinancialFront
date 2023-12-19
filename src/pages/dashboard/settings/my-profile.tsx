import { useApi } from '@/helpers/api';
import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { Spinner } from '@/components/spinner';
import { Flash } from '@/components/flash/flash';
import { Input } from '@/components/input/input';
import { Select } from '@/components/input/select';
import { useMessagesStore } from '@/store/messages';
import 'react-datepicker/dist/react-datepicker.css';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import { genderOptions, regionOptions } from './lib/data';
import { settingsProfileSchema } from './lib/validation-schema';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BirthDateInput } from '@/components/input/birth-date-input';
import { getValidPhoneNumberFromMask } from '@/pages/auth/login/login';
import MaleProfile from '@assets/images/dashboard-images/profile-male.png';
import FemaleProfile from '@assets/images/dashboard-images/profile-female.png';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { ProfileForm } from '@/pages/auth/register/personal-details-form/profile-context';
import { Message, parseErrorsToMap, resolveErrorMessage } from '@/pages/auth/components/error';
import { convertToBaseNumber, convertToCodeNumber, resolveWithdrawalLimit } from './lib/index.t';

import { RequestMethod } from '@/helpers/create-api';

// main component

enum usernameAvaialability {
  AVAILABLE = 'isAvailable',
  NOT_AVAILABLE = 'isNotAvailable',
}

export const MyProfile = () => {
  const { displayMessage } = useMessagesStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputedUserName, setInputedUserName] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const { userProfile, setUpdateProfile } = useAuthStore();
  const [usernameState, setUsernameState] = useState<usernameAvaialability>();
  const [updateError, setUpdateError] = useState<Partial<Record<keyof ProfileForm, string>>>({});

  // POST /user/upgrade/intermediate

  const {
    submit: updateUserProfileOnServer,
    isLoading: IsUpdating,
    error: updatingUserProfileError,
    setError: setUpdatingUserProfileError,
  } = useApi(`/users/profile/update/${userProfile?.userId}`, {
    onSuccess(response) {
      const userDetails = userProfile;

      Object.keys(userDetails).map((userDetail) => {
        if (userDetail === 'user') {
          userDetails['user'] = response?.data;
        }
      });

      setUpdateProfile(userDetails);

      displayMessage({
        title: 'Successful Update',
        description: ' Your profile has been successfully updated',
        variant: 'success',
      });
    },
    method: RequestMethod.PUT,
  });

  // const { refetch: checkIfUsernameIsTaken, isError } = useQuery(
  //   [],
  //   async () => {
  //     const response = await fetch(`/users/verify/${inputedUserName}`);

  //     return response?.data;
  //   },
  //   {
  //     enabled: false,
  //   }
  // );

  // useEffect(() => {
  //   if (isError) {
  //     setUsernameState(usernameAvaialability.NOT_AVAILABLE);
  //   }
  // }, [isError]);

  const { submit: checkIfUsernameIsTaken, isLoading: isCheckingIfUsernameIsTaken } = useApi(
    `/users/verify/${inputedUserName}`,
    {
      onSuccess() {
        setUsernameState(usernameAvaialability.NOT_AVAILABLE);
      },
      onError() {
        setUsernameState(usernameAvaialability.AVAILABLE);
      },
      method: RequestMethod.GET,
    }
  );

  useEffect(() => {
    if (inputedUserName.length >= 6) {
      checkIfUsernameIsTaken();
      setUsernameError('');
      setUsernameState(undefined);
    }
  }, [inputedUserName]);

  const { submit: uploadProfilePicture, isLoading: isUploadingProfilePicture } = useApi('/users/profile/upload', {
    onSuccess(response) {
      const newArr = userProfile?.user?.files?.filter((file) => {
        return file.appType !== 'PROFILE';
      });

      setUpdateProfile({
        ...userProfile,
        //@ts-ignore
        user: {
          ...userProfile?.user,
          files: [...newArr!, response?.data],
        },
      });
    },
    onError(error) {
      displayMessage({
        title: 'An error occured uploading your profile picture.',
        description: error?.response?.data?.message || 'Please try again or contact our support team.',
        variant: 'danger',
      });
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const [form, setForm] = useState<ProfileForm>({
    firstName: userProfile?.user?.firstName,
    lastName: userProfile?.user?.lastName,
    dateOfBirth: userProfile?.user?.dateOfBirth,
    occupation: userProfile?.user?.occupation,
    gender: userProfile?.user?.gender,
    homeAddress: userProfile?.address?.homeAddress || '',
    gpsAddress: userProfile?.address?.gpsAddress || '',
    region: userProfile?.address?.region,
    username: userProfile?.user?.userName,
    momo: convertToBaseNumber(userProfile?.phone!),
    // withdrawalLimit: userProfile?.withdrawalLimit,
    level: userProfile?.user?.level,
    // depositLimit: userProfile?.depositLimit,
  });

  const setValue = (key: keyof ProfileForm, value: any) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const updateUserProfile = () => {
    updateUserProfileOnServer({
      phone_number: convertToCodeNumber(getValidPhoneNumberFromMask(form.momo!)!),
      lastName: form.lastName,
      firstName: form.firstName,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      homeAddress: form.homeAddress,
      userName: form.username,
      gpsAddress: form.gpsAddress,
      country: form.country,
      region: form.region,
      occupation: form.occupation,
    });
  };

  const updateProfileInfo = async () => {
    settingsProfileSchema
      .validate(form, {
        abortEarly: false,
      })
      .then(() => {
        setUpdateProfile({
          ...userProfile,
          ...form,
          // fullName: `${form?.firstName} ${form?.lastName}`,
        });
        updateUserProfile();
      })
      .catch((error) => {
        setUpdateError(parseErrorsToMap(error));
      });
  };

  const errorMessage = resolveErrorMessage(updatingUserProfileError);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const formData = new FormData();

    formData.append('profilePic', event.target.files?.[0]);
    formData.append('idType', 'NONE');

    uploadProfilePicture(formData);
  };

  function clearError(key: string) {
    setUpdateError({ ...updateError, [key]: undefined });
  }

  const profileFiles = userProfile?.user?.files?.filter(
    (file) => file?.appType === 'PROFILE' && file.idType === 'NONE'
  );

  const userProfilePic = profileFiles ? profileFiles?.[0] : null;

  const profilePicture = userProfile?.user?.gender === 'male' ? MaleProfile : FemaleProfile;

  return (
    <div>
      <Spacer className=" h-4" />

      {userProfile?.user?.level === 'beginner' ? <Flash>Please complete your Id verification</Flash> : null}

      <Spacer className=" h-6" />

      {/* //Profile section */}

      <div className=" flex space-x-3">
        <button
          onClick={() => {
            inputRef?.current?.click();
          }}
          className="lg:w-14 w-1/2 flex items-center justify-center relative"
        >
          <span>
            {' '}
            <img
              className="object-cover w-14 h-14 rounded-full"
              loading="lazy"
              src={userProfilePic ? userProfilePic?.url[0] : profilePicture}
              alt="profile-picture"
            />
          </span>
          {isUploadingProfilePicture ? (
            <div className="absolute">
              <Spinner />
            </div>
          ) : null}
        </button>

        <input ref={inputRef} type="file" onChange={onFileChange} accept="image/*" className="hidden" />

        <div>
          <p className="font-sans font-medium text-neutral-800 text-xl">Change Profile Picture</p>
          <button className="flex font-sans text-sm text-neutral-500 text-left">
            Click on Profile Picture to upload a new one or choose your preferred avatar.
          </button>
        </div>
      </div>

      <Spacer className=" h-16" />

      {/* //display error message */}

      {updatingUserProfileError ? (
        <>
          <Message emoji="😥" title={errorMessage?.title} description={errorMessage?.description}>
            <button onClick={() => setUpdatingUserProfileError(undefined)}>
              <SvgCloseIcon />
            </button>
          </Message>

          <Spacer className=" h-10" />
        </>
      ) : null}

      <div>
        <h2 className=" font-sans font-medium text-2xl text-neutral-400">Username</h2>

        <Spacer className=" h-2" />

        <div className="w-full sm:flex items-center">
          <div className="">
            <label className="font-sans font-semibold text-sm text-neutral-400" htmlFor="username">
              Receive money from friends and family using your username
            </label>

            <Spacer className="h-3" />

            <input
              type="text"
              value={form.username}
              className="box-border w-full rounded-lg h-14 focus:outline-none px-3 py-4 border border-neutral-200 focus:ring-1 focus:ring-primary-100"
              id="username"
              onChange={(event) => {
                const inputValue = event.target.value;

                setTimeout(() => {
                  setInputedUserName(event.target.value);
                }, 1000);

                if (inputValue.length > 0 && inputValue.length < 6) {
                  setUsernameError('Username must be  atleast 6 characters long');
                  setUsernameState(undefined);
                }
                if (inputValue.length === 0) {
                  setUsernameError('');
                  setUsernameState(undefined);
                }
                setValue('username', event.target.value);
                setUsernameState(undefined);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        {isCheckingIfUsernameIsTaken && (
          <div className="flex items-center space-x-2">
            <Spinner className="h-5 w-5 text-[#213353]" />
            <p className="text-sm font-sans text-neutral-400 font-medium">Verifying ...</p>
          </div>
        )}
        {usernameState === usernameAvaialability.AVAILABLE ? (
          <div className="flex items-center mt-2 space-x-2">
            <p className="text-[#25BCAC] font-sans text-sm">{form.username} is Available</p>
          </div>
        ) : null}
        {usernameState === usernameAvaialability.NOT_AVAILABLE ? (
          <p className="text-secondary-200 text-sm font-sans-body mt-1">{form.username} is taken</p>
        ) : null}
      </div>
      <div>{usernameError ? <ErrorText>{usernameError}</ErrorText> : null}</div>
      <Spacer className="h-6" />
      {/* Personal Details */}
      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Personal Details</h2>
      <Spacer className=" h-6" />
      <div>
        <div className=" flex lg:flex-row flex-col lg:space-x-8 lg:w-8/12 w-full">
          <div className=" lg:w-1/2 w-full">
            <Input
              id="first-name"
              label="First Name"
              type="text"
              value={form.firstName}
              error={updateError?.firstName}
              onChange={(event) => {
                setValue('firstName', event.target.value);
                clearError('firstName');
              }}
            />
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className=" lg:w-1/2 w-full">
            <Input
              id="last-name"
              label="Last Name"
              type="text"
              value={form.lastName}
              error={updateError?.lastName}
              onChange={(event) => {
                setValue('lastName', event.target.value);
                clearError('lastName');
              }}
            />
          </div>
        </div>

        <Spacer className=" h-6" />

        <div className=" flex lg:flex-row flex-col lg:space-x-8 lg:w-8/12 w-full">
          <div className="flex flex-col  lg:w-1/2 w-full ">
            <label htmlFor="date-of-birth" className="font-sans font-semibold text-sm text-neutral-400">
              Date of birth
            </label>
            <div className=" flex flex-col lg:space-x-8">
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
            {updateError.dateOfBirth ? <ErrorText>{updateError?.dateOfBirth}</ErrorText> : null}
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className="lg:w-1/2 w-full">
            <Input
              id="occupation"
              label="Occupation"
              type="text"
              placeholder="Eg. Nurse"
              value={form.occupation}
              error={updateError?.occupation}
              onChange={(event) => {
                setValue('occupation', event.target.value);
                clearError('occupation');
              }}
            />
          </div>
        </div>

        <Spacer className=" h-6" />

        <div className=" flex lg:flex-row flex-col lg:space-x-8 lg:w-8/12">
          <div className="w-full lg:w-1/2">
            <Select
              id="gender"
              label="Gender"
              placeholder="Select your gender"
              options={genderOptions}
              value={form.gender!}
              error={updateError?.gender}
              onChange={(event) => {
                setValue('gender', event?.target.value);
                clearError('gender');
              }}
            />
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className="w-full lg:w-1/2">
            <Input
              type="phone"
              id="account-phone-number"
              label="Account phone number"
              readOnly
              disabled
              value={convertToCodeNumber(userProfile?.phone!)}
              // error={updateError?.momo}
              // onChange={(event) => {
              //   setValue('momo', event.target.value);
              //   clearError('momo');
              // }}
            />
          </div>
        </div>
      </div>
      {/* Account Information */}
      <Spacer className=" h-16" />
      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Account Information</h2>
      <Spacer className=" h-6" />
      <div className=" flex flex-wrap lg:space-x-16 ">
        <div className="flex items-center">
          <div className=" flex flex-col items-start">
            <p className=" font-sans text-sm text-neutral-400 mb-2 font-medium">Account level</p>

            <p className="font-sans-body text-neutral-900 px-4 py-2 bg-neutral-100 rounded-full capitalize mr-12">
              {userProfile?.user?.level} Plan Level
            </p>
          </div>
        </div>

        <Spacer className="lg:hidden h-3" />

        <div className=" flex flex-col items-start space-x-[2px]">
          <p className=" font-sans text-sm text-neutral-400 mb-2 font-medium">Withdrawal limit</p>

          <p className=" font-sans-body text-neutral-900 px-4 py-2 bg-neutral-100 rounded-full text-center">
            {`GHS ${resolveWithdrawalLimit(userProfile?.user?.level!)}`}
          </p>
        </div>
      </div>

      {/* Address Information */}

      <Spacer className=" h-16" />
      <div>
        <h2 className=" font-sans font-medium text-2xl text-neutral-400">Address Information</h2>

        <Spacer className=" h-6" />

        <div className=" flex flex-col lg:flex-row lg:space-x-8 lg:w-10/12">
          <div className=" lg:w-1/2">
            <Input
              id="home-address"
              label="Home address"
              type="text"
              placeholder="Eg. Adenta ...."
              value={form.homeAddress}
              error={updateError?.homeAddress}
              onChange={(event) => {
                setValue('homeAddress', event.target.value);
                clearError('homeAddress');
              }}
            />
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className=" lg:w-1/2">
            <Input
              id="ghana-post-digital-address"
              label="Ghana Post digital address"
              type="text"
              placeholder="Eg. GM-323-222 ...."
              value={form.gpsAddress}
              onChange={(event) => {
                setValue('gpsAddress', event.target.value);
                clearError('gpsAddress');
              }}
            />
          </div>
        </div>

        <Spacer className=" h-6" />

        <div className="flex flex-wrap lg:flex-nowrap lg:space-x-8 w-full lg:w-10/12">
          <div className="w-full lg:w-1/2">
            <Input id="country" label="Country" type="text" value="Ghana" readOnly />
          </div>

          <Spacer className="lg:hidden h-6" />

          <div className="w-full lg:w-1/2">
            <Select
              options={regionOptions}
              id="region/state"
              label="Region/State"
              placeholder="Select Region/state"
              value={form.region}
              error={updateError?.region}
              onChange={(event) => {
                setValue('region', event.target.value);
                clearError('region');
              }}
            />
          </div>
        </div>
      </div>
      <Spacer className=" h-12" />
      <Button
        className="w-full sm:w-auto"
        disabled={usernameState === usernameAvaialability.NOT_AVAILABLE || !!usernameError}
        loading={IsUpdating}
        onClick={updateProfileInfo}
      >
        Update profile info
      </Button>
      <Spacer className="h-20" />
      <Spacer className="sm:hidden h-10" />
    </div>
  );
};
