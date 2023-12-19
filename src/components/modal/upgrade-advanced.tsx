import Modal from './modal';
import { Button } from '../button';
import { Spacer } from '../spacer';
import SvgClose from '../icons/Close';
import { useNavigate } from 'react-router-dom';
import loginModalImageUrl from '@/assets/images/login-modal.png';

export const UpgradeToAdvanced: React.FC<{ open?: boolean }> = ({ open }) => {
  const navigate = useNavigate();

  return (
    <Modal open={open} className="rounded-2xl max-w-[530px]">
      <>
        <div className="px-7 py-6 rounded-t-2xl">
          <div className="w-full items-center relative">
            <Spacer className="h-8" />
          </div>
        </div>
      </>
      <div className="px-7 border-b border-neutral-200">
        <p className="font-sans text-neutral-400 font-medium">
          Of course you want to save in groups we get that, but first you need to upgrade your Bezo susu account.
        </p>

        <Spacer className="h-6" />

        <div className="flex items-center justify-center">
          <img className="w-64 h-64" src={loginModalImageUrl} aria-hidden />
        </div>

        <Spacer className="h-6" />

        <p>
          Only <span className="font-medium">advance</span> users get access to save in groups
        </p>

        <Spacer className="h-8" />
      </div>

      <Spacer className="h-8" />

      <div className="px-7 w-full">
        <div className="inline-flex space-x-6">
          <Button onClick={() => navigate('/dashboard/home')} className={'px-7 py-3'}>
            Home
          </Button>
          <Button onClick={() => navigate('/dashboard/settings?tab=4')} className={'px-4 py-3'}>
            Upgrade
          </Button>
        </div>
      </div>
      <Spacer className="lg:h-7 h-5" />
    </Modal>
  );
};
