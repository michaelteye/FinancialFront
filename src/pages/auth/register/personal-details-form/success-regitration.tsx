import logoUrl from '@/assets/images/logo.png';
import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { Link } from 'react-router-dom';
import SvgCongratulation from '@/components/icons/Congratulation';
import { showGetStarted } from '@/hooks/show-get-started';

export const SuccessRegistration = () => {
  const showGS = showGetStarted();

  return (
    <div className=" h-screen lg:px-28  px-8 relative success-page">
      <div className="mt-8 inline-flex w-[156px]">
        <img src={logoUrl} alt="bezo logo" />
      </div>

      <Spacer className="sm:h-0 h-8" />

      <div className="w-full flex flex-col justify-center top-1/2 -translate-y-2/3 items-center relative">
        <SvgCongratulation />

        <div className=" items-center flex flex-col ">
          <p className=" text-neutral-500 font-sans font-extrabold leading-14 lg:text-5xl text-3xl ">Way to go! 🙌</p>

          <Spacer className=" lg:h-5 h-3" />

          <p className=" font-sans-body text-neutral-500 text-center leading-7 text-xl">
            You are finally part of our growing community of today’s <br /> go-getters, cool cats, young professionals,
            artisans, digital nomads, hustlers and content creators achieving financial freedom.
          </p>

          <Spacer className=" h-6" />

          <Link to={`/dashboard/${!showGS ? 'welcome' : 'home'}`}>
            <Button>Let’s begin! </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
