import { FunctionComponent } from 'react';
import { Options } from '@/components/icons';
import { useLocation } from 'react-router-dom';
import { Notifications } from '../notifications';
import { BreadCrumb } from '../breadcrumb';
import { Campaigns } from '../campaigns';

interface TopbarProps {
  onOpenSidebar?: () => void;
}

export const Topbar: FunctionComponent<TopbarProps> = ({ onOpenSidebar }) => {
  const location = useLocation();
  const welcomePage = location.pathname.split('/')[2] === 'welcome';

  return (
    <div className="bg-white -mx-0 sm:px-20 w-full sm:static  z-10">
      <div className="flex items-start  justify-between sm:px-0 px-8 pt-[50px]">
        <div className="flex items-center sm:space-x-0 space-x-4">
          <button onClick={() => onOpenSidebar?.()} className="flex sm:hidden items-center justify-center">
            <Options/>
          </button>
          {welcomePage ? null : <BreadCrumb />}
        </div>
        <div className=" flex space-x-4">
          {/* <Campaigns /> */}
          <Notifications />
        </div>
      </div>
    </div>
  );
};
