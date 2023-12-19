import classNames from 'classnames';
import { useState } from 'react';
import { Button } from '@/components/button';
import SvgClose from '@/components/icons/Close';
import { Spacer } from '@/components/spacer';
import { useAuthStore } from '@/store/auth';
import { SurveySetup } from './survey-setup';
import MaleProfile from '@assets/images/dashboard-images/profile-male.png';
import FemaleProfile from '@assets/images/dashboard-images/profile-female.png';

export const SurveyNotice = () => {
  const { userProfile } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [hideSurvey, setHideSurvey] = useState(false);

  const profileFiles = userProfile?.user?.files?.filter(
    (file) => file?.appType === 'PROFILE' && file.idType === 'NONE'
  );

  const userProfilePic = profileFiles ? profileFiles?.[0] : null;

  const profilePicture = userProfile?.user?.gender === 'male' ? MaleProfile : FemaleProfile;

  return (
    <>
      <SurveySetup open={open} setOpen={setOpen} hideSurveyNotice={setHideSurvey} />

      <div
        className={classNames(
          'lg:w-[400px] max-w-[350px] rounded-lg border border-[#F2ECF6] drop-shadow-2xl px-6 py-5 bg-white z-30',
          {
            hidden: hideSurvey,
          }
        )}
      >
        <div className="w-full relative">
          <button onClick={() => setHideSurvey(true)} className="absolute right-0">
            <SvgClose />
          </button>
        </div>

        <Spacer className="h-3" />

        <div className="flex flex-col justify-center items-center space-y-4 border-b border-neutral-100">
          {userProfilePic ? (
            <div>
              <img className="w-10 h-10 rounded-full" src={userProfilePic?.url[0]} alt="profile" />
            </div>
          ) : (
            <img className="w-10 h-10 rounded-full" src={profilePicture} alt="" />
          )}
          <p className="font-sans-body text-center">Hey, {userProfile?.user?.firstName}</p>
          <p className="font-sans-body text-center text-sm">
            Kindly spare a few minutes to rate your experience using the platform.
          </p>

          <Spacer className="h-2" />
        </div>

        <Spacer className="h-5" />

        <div className="flex justify-center">
          <Button onClick={() => setOpen(true)}>Next</Button>
        </div>
      </div>
    </>
  );
};
