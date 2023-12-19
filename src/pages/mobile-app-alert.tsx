import { Spacer } from '@/components/spacer';
import logoUrl from '@/assets/images/logo.png';
import android from '@/assets/images/android.png';
import apple from '@/assets/images/apple.png';
import alert from '@assets/images/alert.png';

export const  MobileAppAlert = ({ skip }: { skip: () => void }) => {
  return (
    <div className="h-screen bg-[#F9F4F1] lg:px-28 px-8 relative">
      <div className="mt-8 inline-flex w-[156px]">
        <img src={logoUrl} alt="bezo logo" />
      </div>

      <Spacer className="sm:h-0 h-8" />

      <div className="w-full flex flex-col justify-center top-1/2 -translate-y-2/3 items-center relative">
        <img src={alert} alt="" className="w-[15rem]" />

        <Spacer className="h-10" />

        <div className=" items-center flex flex-col">
          <p className=" text-neutral-500 font-recoletaBold text-center font-extrabold sm:text-4xl text-2xl ">
            Download Bezo App Now!
          </p>

          <Spacer className=" lg:h-5 h-3" />

          <p className="text-[#535353] font-sans-lt text-center sm:text-xl text-lg">
            Join the Bezo #ReferandEarn campaign on Bezo app and start earning GHS10 for every referral.
          </p>

          <Spacer className=" h-6" />

          <div className="flex items-center justify-center space-x-4 sm:w-1/2 w-full">
            <a href="https://play.google.com/store/apps/details?id=com.bezosusu.app" target="_blank" rel="noreferrer">
              <img placeholder="blur" src={android} />
            </a>
            <a href="https://apps.apple.com/gh/app/bezo/id6447621019" target="_blank" rel="noreferrer">
              <img placeholder="blur" src={apple} />
            </a>
          </div>

          <Spacer className=" h-10" />

          <button onClick={skip} className="text-lg sm:w-1/4 w-1/2 px-4 text-[#7E8180]">
            <span className="border-b border-b-[#7E8180]">skip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
