import React from 'react';
import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import logoUrl from '@/assets/images/logo.png';
import { useLocation } from 'react-router-dom';
import loginModalImageUrl from '@/assets/images/login-modal.png';
import verificationModalImageUrl from '@/assets/images/verify-modal.png';

interface AuthLayoutProps {
  ladyDrawingImage?: boolean;
  className?: string;
  illustrationTitle?: string;
  illustrationDescription?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  ladyDrawingImage,
  children,
  className,
  illustrationDescription,
  illustrationTitle,
}) => {
  const location = useLocation();
  const loginLocation = location.pathname.includes('/auth/login');
  const verifyLocation = location.pathname.includes('/auth/verify');
  const regiterLocation = location.pathname.includes('auth/register');
  const registrationVerify = location.pathname.includes('/register/verify');
  const passwordLocation = location.pathname.includes('/register/password');

  return (
    <div className="lg:h-screen flex flex-wrap relative">
      <div
        className={classNames(
          `h-screen overflow-y-auto w-full lg:w-3/5 lg:h-full px-8 lg:pl-32 lg:pr-44 flex flex-col ${className}`,
          {
            'login-main': loginLocation || regiterLocation,
            'verify-main': verifyLocation || registrationVerify || passwordLocation,
          }
        )}
      >
        <div className="py-8 fixed sm:w-1/2 top-0 w-full sm:px-2 px-7 sm:left-auto left-2 z-50 bg-white">
          <img src={logoUrl} alt="bezo logo" className="w-[9rem]" />
        </div>

        <Spacer className="h-10" />

        <div className="sm:max-h-screen max-h-[31.25rem]">{children}</div>
      </div>

      <div
        className={classNames('w-full lg:w-2/5 lg:h-full bg-primary-400 text-white lg:block hidden relative', {
          'login-image': !ladyDrawingImage,
          'verify-image': verifyLocation || registrationVerify || passwordLocation,
        })}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          {verifyLocation || registrationVerify || passwordLocation ? (
            <>
              <img
                src={verificationModalImageUrl}
                alt={classNames({
                  'lady on coins': !verifyLocation || !registrationVerify || !passwordLocation,
                  'lady Drawing': verifyLocation || registrationVerify || passwordLocation,
                })}
              />
              <h3 className="font-sans font-normal text-center text-3xl mb-3.5">Discover Amazing Savings Benefits </h3>
              <p className="mt-4 font-normal text-base text-center font-sans-body w-[31.25rem]">
                Achieve your savings goals with a breeze! Set multiple personal and group goals with features such as
                auto - lock, auto - deposit, bezoscore, and many more.
              </p>
            </>
          ) : (
            <>
              <img className="mx-auto" src={loginModalImageUrl} alt="A person standing on coins" />
              <div className="text-center mx-auto">
                <h3 className="font-sans font-normal text-3xl text-center">{illustrationTitle}</h3>
              </div>

              <div className="w-[31.25rem] text-center mx-auto">
                <p className="mt-6 font-normal text-base font-sans-body mb-7 lg:mb-0">{illustrationDescription}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
