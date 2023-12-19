import classNames from 'classnames';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { useP2pContext } from '../p2p-context';
import { NewUserProfile } from '@/store/types';
import { DefaultIcon, SelectedName } from '../selected-name';
import SvgSearch from '@/components/icons/Search';
import { Input } from '@/components/input/input';
import check from '@assets/images/check.png';
import { P2pError, P2pSteps } from '../../lib/types';
import { useVerifyUserName } from '@/hooks/useVerifyUserName';
import { getPrimaryGoalTopupError } from '@/pages/dashboard/savings/helpers';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { RadioInput } from '@/components/input/radio-input';
import { PhoneNumberInput } from '@/components/input/phone-number-input';
import { getValidPhoneNumberFromMask } from '@/pages/auth/login/login';
import { convertToBaseNumber } from '@/pages/dashboard/settings/lib/index.t';

export const P2pDetails: React.FC = () => {
  const [user, setUser] = useState('');
  const { userProfile } = useAuthStore();
  const [userNotFound, setUserNotFound] = useState('');
  const [invalidNumErr, setInvalidNumErr] = useState('');
  const [openSelectAmt, setOpenSelectAmt] = useState(false);
  const [p2pUserProfile, setP2pUserProfile] = useState<NewUserProfile>();
  const [searchType, setSearchType] = useState<'username' | 'phoneNumber'>('username');
  const { step, form, setValue, error, setError, setErrorMessage, errorMessage } = useP2pContext();
  const { data: p2pUsers, verifyUsername: searchUser, isError, IsSearchingUser } = useVerifyUserName(user);

  useEffect(() => {
    if (isError) {
      setUserNotFound('Recepient not found. check username.');
      setP2pUserProfile({});
    }
    if (p2pUsers && searchType === 'phoneNumber'){
      setP2pUserProfile(p2pUsers[0]);
    }
  }, [p2pUsers, isError]);

  const amountError = error === P2pError.AMOUNT;
  //@ts-ignore
  const profileFiles = userProfile?.user?.files?.filter(
    (file) => file?.appType === 'PROFILE' && file.idType === 'NONE'
  );

  const p2pUserProfilePic = profileFiles ? profileFiles?.[0] : null;

  useEffect(() => {
    if (p2pUserProfile) {
      setValue('transferAccountId', p2pUserProfile?.account?.id);
      setValue('profilePicture', p2pUserProfilePic);
      setValue('username', p2pUserProfile?.userName);
      setValue('phoneNumber', p2pUserProfile?.phone);
      setValue('fullName', p2pUserProfile.firstName + ' ' + p2pUserProfile.lastName);
    }
  }, [p2pUserProfile]);

  const amounts = ['5.00', '10.00', '20.00', '50.00'];
  const primaryGoalBalance = parseFloat(userProfile?.balance!);
  const sameUser = userProfile?.user?.userName === p2pUserProfile?.userName;
  // const noProfile = Object.keys(p2pUserProfile!).length === 0;

  if (step !== P2pSteps.FORM_DETAILS) {
    return null;
  }

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    if (searchType === 'phoneNumber' && user.length < 12) {
      setInvalidNumErr('Invalid Phone Number');
      return;
    }
    searchUser();
  };

  // useEffect(() => {
  //   if (user.length > 3 && searchType === 'username') {
  //     setTimeout(() => {
  //       searchUser();
  //     }, 500);
  //   }
  // }, [user, searchType]);

  function onSearchuserHandler() {
    if (p2pUserProfile) {
      setP2pUserProfile({});
    }
    setInvalidNumErr('');
    setUserNotFound('');
  }

  return (
    <>
      <div className="px-7">
        <div className="flex flex-col space-y-2">
          <div className="text-left relative mt-3">
            <Input
              label="Enter Amount"
              prefix="GHS "
              value={form?.amount || ''}
              alwaysShowMask
              onChange={(e) => {
                const inputValue = e?.target?.value;

                if (inputValue.includes('.')) {
                  const [, secondValue] = inputValue.split('.');

                  if (secondValue.length > 2) {
                    return inputValue;
                  }
                }
                if (isNaN(Number(inputValue))) {
                  setErrorMessage?.('Please provide a valid amount');
                } else {
                  setErrorMessage?.('');
                }
                setValue('amount', inputValue);
              }}
            />

            <p className="text-green text-xs font-sans-body absolute right-2 top-11">
              BezoWallet: ₵ {primaryGoalBalance}
            </p>
          </div>

          <p className="font-sans-body text-[#091E42] text-opacity-40 text-xs font-medium text-left">
            Or select amount
          </p>

          <div className="flex flex-col lg:flex-row">
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
              {amounts.map((amount, idx) => {
                return (
                  <label
                    key={idx}
                    id="sendingAmount"
                    className={classNames('p-3 items-center rounded-full flex space-x-2 cursor-pointer', {
                      'bg-[#AACAF6]': amount === form?.amount,
                      'bg-neutral-100': amount !== form?.amount,
                    })}
                  >
                    <button
                      id="amount"
                      name="amount"
                      onClick={() => {
                        setValue('amount', amount);
                        setOpenSelectAmt(false);
                        setError?.(undefined);
                      }}
                    />
                    <p className="font-sans-body text-neutral-900"> ₵ {amount}</p>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <Spacer className="h-3" />

        <div className="flex flex-col">
          {openSelectAmt ? (
            <Input
              onChange={(e) => {
                setValue('amount', e.target.value.split(' ')[1]);
                setError?.(undefined);
              }}
              mask="GHS 999999999999999999999"
              alwaysShowMask
            />
          ) : null}

          {amountError ? (
            <div className="flex flex-col text-left">
              <ErrorText>Please Input a different amount, Insufficient funds</ErrorText>

              <Spacer className="h-2" />
            </div>
          ) : null}

          {errorMessage ? (
            <div className="flex flex-col text-left">
              <ErrorText>{errorMessage}</ErrorText>

              <Spacer className="h-2" />
            </div>
          ) : null}

          {getPrimaryGoalTopupError(form?.amount!, primaryGoalBalance!, 'primary') && form?.amount ? (
            <div className="flex flex-col text-left">
              <ErrorText>{getPrimaryGoalTopupError(form?.amount!, primaryGoalBalance!, 'primary')}</ErrorText>

              <Spacer className="h-2" />
            </div>
          ) : null}

          <div className="flex items-center space-x-4">
            <RadioInput
              id="username"
              text="username"
              name="search-type"
              className="p-1"
              nobgColor
              checked={searchType === 'username'}
              onChange={() => {
                setSearchType('username');
              }}
            />
            <RadioInput
              id="phone number"
              text="phone number"
              name="search-type"
              className="p-1"
              nobgColor
              checked={searchType === 'phoneNumber'}
              onChange={() => {
                setSearchType('phoneNumber');
              }}
            />
          </div>

          <Spacer className="h-2" />

          <div className="text-left relative">
            {searchType === 'phoneNumber' ? (
              <PhoneNumberInput
                label="Reciever's phone number"
                labelClassName="text-sm text-neutral-400 font-semibold"
                flagClassName="top-[42px] left-7"
                onChange={(e) => {
                  onSearchuserHandler();
                  setUser(getValidPhoneNumberFromMask(e.target.value)!);
                }}
                value={p2pUserProfile ? p2pUserProfile?.phone : user}
                onKeyPress={user?.length < 3 ? () => {} : onEnterPress}
              />
            ) : (
              <Input
                onChange={(e) => {
                  onSearchuserHandler();

                  setUser(e.target.value.split('@')[1]);
                }}
                label="Reciever's userName"
                value={p2pUserProfile ? p2pUserProfile?.userName : user}
                mask={'@*******************************'}
                alwaysShowMask
                onKeyPress={user?.length < 3 ? () => {} : onEnterPress}
              />
            )}

            <button
              onClick={() => {
                if (searchType === 'phoneNumber' && user.length < 12) {
                  setInvalidNumErr('Invalid Phone Number');
                  return;
                }

                searchUser();

                return;
              }}
              className="text-primary-100 font-sans text-xs absolute top-10 right-5"
            >
              <SvgSearch />
            </button>
          </div>

          {invalidNumErr && <p className="text-secondary-200 text-sm font-sans-body text-left">{invalidNumErr}</p>}

          <Spacer className="h-3" />

          {IsSearchingUser ? (
            <div className="w-full flex justify-center my-6">
              <Spinner />
            </div>
          ) : searchType === 'username' ? (
            <div className={classNames('flex flex-col w-full')}>
              {p2pUsers?.slice(0, 4)?.map((userData) => {
                const { firstName, lastName, phone, id } = userData;
                //@ts-ignore
                const profileFile = user?.files?.filter(
                  //@ts-ignore
                  (file) => file?.appType === 'PROFILE' && file.idType === 'NONE'
                );

                const userProfilePic = profileFile?.[0]?.url[0];

                const sameUser = userProfile?.user?.userName === userData?.userName;
                const selected = id === p2pUserProfile?.id;

                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (sameUser) {
                        return;
                      }
                      setP2pUserProfile(userData);
                    }}
                    className={classNames('flex items-center justify-between space-x-2 px-3 py-1', {
                      'hover:bg-neutral-400 hover:bg-opacity-10': !sameUser,
                      'bg-neutral-400 bg-opacity-5': selected,
                      'cursor-not-allowed': sameUser,
                    })}
                  >
                    <div className="flex items-center space-x-2">
                      {userProfilePic ? (
                        <div>
                          <img className="w-7 h-7 rounded-full " src={userProfilePic} alt="picture" />
                        </div>
                      ) : (
                        <div>
                          <DefaultIcon name={firstName + ' ' + lastName} className="w-7 h-7 text-xs" />
                        </div>
                      )}
                      <div
                        className={classNames('flex items-center justify-start text-neutral-400', {
                          'text-neutral-400 text-opacity-50': sameUser,
                        })}
                      >
                        <p className="sm:text-sm text-xs text-left">{firstName + ' ' + lastName} </p>
                        <p className=""> - </p>
                        <p className="sm:text-sm text-xs text-left">{convertToBaseNumber(phone!)}</p>
                      </div>
                    </div>
                    {selected && (
                      <div className="sm:w-5 w-4 h-4 sm:h-5">
                        <img src={check} alt="" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : p2pUserProfile && p2pUsers ? (
            <SelectedName sameUser={sameUser} p2pProfile={p2pUserProfile} />
          ) : null}

          {sameUser && !IsSearchingUser ? <ErrorText>You can't send money to yourself</ErrorText> : null}

          {userNotFound && !IsSearchingUser ? <ErrorText>{userNotFound}</ErrorText> : null}

          <Spacer className="h-3" />

          <div className="text-left">
            <Input
              label={
                <p className="font-sans font-semibold text-sm text-neutral-400">
                  Personalised notes{' '}
                  <span className="text-xs font-sans-body text-[#252525] text-opacity-[58%]">optional</span>
                </p>
              }
              onChange={(e) => setValue('notes', e.target.value)}
            />
          </div>
          <Spacer className="h-10" />
        </div>
      </div>

      <div className="h-[1px] bg-neutral-100"></div>
    </>
  );
};
