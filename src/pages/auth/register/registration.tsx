import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/button';
import { Input } from '@/components/input/input';
import { PhoneNumberInput } from '@/components/input/phone-number-input';
import { Spacer } from '@/components/spacer';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { AuthLayout } from '../components/auth-layout';
import { getValidPhoneNumberFromMask } from '../login/login';
import { Message, resolveErrorMessage } from '../components/error';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import { useMutation } from '@tanstack/react-query';
import { createPublicApi } from '@/helpers/create-api';
import { RequestMethod, useApi } from '@/helpers/api';
import Banner, { RegisterBanner } from '@/components/download/banner';

export const Registration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [phoneError, setPhoneError] = useState('');
  const [error, setError] = useState<{ message: string }>();
  const { phoneNumber, setPhoneNumber, setReferralCode, referralCode } = useAuthStore();

  const { mutate: sendOtp, isLoading } = useMutation(
    () =>
      createPublicApi({
        url: '/otps',
        data: { phone: getValidPhoneNumberFromMask(phoneNumber), verificationType: 'register_user' },
      }),
    {
      onSuccess: () => {
        navigate('/auth/register/verify');
      },
    }
  );

  const { submit: checkIfPhoneNumberExist, isLoading: isCheckingIfPhoneExists } = useApi(
    `/verifyphone/${getValidPhoneNumberFromMask(phoneNumber)}`,
    {
      method: RequestMethod.GET,
      onSuccess: (response) => {
        if (response.data && response.data.exist) {
          setError({ message: 'phone_already_exist' });
          return;
        }
        sendOtp();
      },
    }
  );

  const [hasReferralCode, setHasReferralCode] = useState(false);

  const urlReferralCode = searchParams.get('ref');

  useEffect(() => {
    if (urlReferralCode) {
      setHasReferralCode(true);
      setReferralCode?.(urlReferralCode);
    }
  }, [urlReferralCode]);

  async function getOtp() {
    const trimmedValue = phoneNumber.replace(/ /g, '');

    if (trimmedValue.length !== 14) {
      setPhoneError('Please enter a valid phone number to continue (eg. (233) 27 000 0000)');
      return;
    }

    checkIfPhoneNumberExist();
  }

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    getOtp();
  };

  const errorMessage = resolveErrorMessage(error);

  useEffect(() => {
    navigate('/auth/login');
  }, []);

  return (
    <AuthLayout
      illustrationTitle="Make Smart Money Moves with BezoSusu!"
      illustrationDescription="We’re disrupting digital banking for Boomers, Gen Xs, Millennials and Gen Zs."
    >
      <div className="overflow-y-auto">
        {/* including the download to the appstore or the playstore */}

        {/* <div className="ml-2 pl-2 rounded-lg bg-[#c1cbfcf1] mt-32">
          <div className=" px-5 py-5">
              <h1 className="leading-5 font-extrabold pb-1 font-opensans">
                  Download the new Bezo app now
              </h1>
              <h2 className=" font-opensans font-normal text-xs ">
                Unlock the Full Potential. Download Our App for an Enhanced User Experience! 
              </h2>
          </div>
        </div> */}
        <RegisterBanner />
        {/* <Banner/> */}

        <h1 className="mt-24 font-sans font-extrabold text-5.5 leading-14 text-neutral-500">
          Welcome! Secure Your 💰 with Us.
        </h1>

        <Spacer className=" h-3" />

        <p className=" font-sans-body text-neutral-500 font-normal">
          Join our community of people smashing their financial goals and living their best lives!
        </p>

        <Spacer className=" h-8" />

        {error ? (
          <>
            <Message emoji="😥" title={errorMessage?.title} description={errorMessage?.description}>
              <button onClick={() => setError(undefined)}>
                <SvgCloseIcon />
              </button>
            </Message>

            <Spacer className=" h-8" />
          </>
        ) : null}

        <div className="w-full">
          <PhoneNumberInput
            error={phoneError}
            value={phoneNumber}
            onChange={(event) => {
              setPhoneError('');
              setPhoneNumber(event.target.value);
              setError(undefined);
            }}
            onKeyPress={onEnterPress}
          />
        </div>

        <Spacer className="h-4" />

        <p className="font-normal text-sm font-sans-body opacity-70">
          A one-time password will be sent to your phone number as soon as you click to register.
        </p>

        <Spacer className="h-4" />

        {hasReferralCode ? null : (
          <button
            className={`text-green font-semibold font-sans-body underline`}
            onClick={() => {
              setHasReferralCode(true);
            }}
          >
            I have a referral code
          </button>
        )}

        {hasReferralCode ? (
          <div className={` flex flex-col`}>
            <Spacer className=" h-4" />
            <Input
              placeholder="e.g xkAdl2"
              label="Referral code"
              id="referrralCode"
              disabled={urlReferralCode ? true : false}
              onChange={(event) => {
                setReferralCode?.(event.target.value);
              }}
              value={urlReferralCode ? urlReferralCode : referralCode}
            />
          </div>
        ) : null}

        <Spacer className="h-8" />

        <Button className=" w-full" variant="primary" onClick={getOtp} loading={isLoading || isCheckingIfPhoneExists}>
          Register
        </Button>

        <Spacer className="h-6" />

        <p className="lg:text-left text-center font-normal text-sm font-sans-body lg:mb-0">
          I already have a BezoSusu account.
          <Link to="/auth/login" className="ml-1 text-neutral-400 font-sans-body font-bold text-sm underline">
            Login
          </Link>
        </p>
      </div>
      <Spacer className=" h-36" />
    </AuthLayout>
  );
};
