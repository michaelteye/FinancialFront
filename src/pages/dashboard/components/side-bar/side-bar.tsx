import { Profile } from './profile';
import { NavItem } from './nav-item';
import classnames from 'classnames';
import { useWidth } from '@/hooks/use-width';
import { Transition } from '@headlessui/react';
import { useLocation } from 'react-router-dom';
import SvgClose from '@/components/icons/Close';
import SvgPaper from '@/components/icons/Paper';
import SvgReferal from '@/components/icons/Referal';
import { FunctionComponent, Fragment } from 'react';
import { Spacer } from '@/components/spacer/spacer';
import { showGetStarted } from '@/hooks/show-get-started';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { GetStarted, Home, Setting, Transactions, Account, Savings, Invest, Group } from '@/components/icons';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export const SideBar: FunctionComponent<SidebarProps> = ({ onClose, open }) => {
  const width = useWidth();
  const location = useLocation();
  const showGS = showGetStarted();

  function isActive(path: string) {
    return location.pathname.includes(`/dashboard/${path}`);
  }

  const sideBarContent = (
    <div className={classnames('relative w-full lg:w-[22%] lg:flex flex-col min-h-screen mb-14')}>
      <Spacer className="h-[50px]" />

      <div className="w-full ml-6 flex items-center justify-between">
        <Profile onClose={onClose} />

        <button
          onClick={() => onClose?.()}
          className="lg:hidden w-[46px] h-[46px] mr-6 flex items-center justify-center"
        >
          <SvgClose className="text-neutral-400" />
        </button>
      </div>
      <Spacer className="h-12" />

      <div>
        <div>
          {showGS ? (
            <NavItem
              iconStyle="ml-[23px]"
              titleStyle="ml-[22px]"
              close={onClose}
              path="welcome"
              title="Get started"
              active={isActive('welcome')}
              icon={GetStarted}
            />
          ) : null}

          <div>
            <NavItem
              iconStyle="ml-[21.5px]"
              titleStyle="ml-[24px]"
              close={onClose}
              path="home"
              title="Home"
              active={isActive('home')}
              icon={Home}
            />
          </div>

          <div>
            <NavItem
              close={onClose}
              iconStyle="ml-[21.5px]"
              titleStyle="ml-[24px]"
              path="wallet"
              title="BezoWallet"
              active={isActive('wallet')}
              icon={Account}
            />
          </div>

          <div>
            <NavItem
              iconStyle="ml-[20px]"
              titleStyle="ml-[22.5px]"
              close={onClose}
              path="savings"
              title="Savings goals"
              active={isActive('savings')}
              icon={Savings}
            />
          </div>

          <div>
            <NavItem
              iconStyle="ml-[20px]"
              titleStyle="ml-[25px]"
              close={onClose}
              path="investment"
              title="Investment"
              active={isActive('investment')}
              icon={Invest}
            />
          </div>

          <div>
            <NavItem
              titleStyle="ml-[26px]"
              iconStyle="ml-[20px]"
              close={onClose}
              path="transactions"
              title="Transactions"
              active={isActive('transactions')}
              icon={Transactions}
            />
          </div>

          <div>
            <NavItem
              beta
              iconStyle="ml-[19px]"
              titleStyle="ml-[23px]"
              close={onClose}
              path="groups"
              title="Group savings"
              active={isActive('groups')}
              icon={Group}
            />
          </div>

          <div>
            <NavItem
              iconStyle="ml-[19px]"
              titleStyle="ml-[23px]"
              close={onClose}
              path="referrals"
              title="Referrals"
              active={isActive('referrals')}
              icon={SvgReferal}
            />
          </div>

          <div>
            <NavItem
              iconStyle="ml-[21.5px]"
              titleStyle="ml-[24px]"
              close={onClose}
              path="airtime-&-bills"
              title="Airtime & Bills"
              active={isActive('airtime-&-bills')}
              icon={SvgPaper}
            />
          </div>

          <div>
            <NavItem
              iconStyle="ml-[21px]"
              titleStyle="ml-[25px]"
              close={onClose}
              path="settings"
              title="Settings"
              active={isActive('settings')}
              icon={Setting}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (width >= EScreenBreakpoints.LG) {
    return <>{sideBarContent}</>;
  }

  return (
    <Transition
      as={Fragment}
      show={open}
      enter="transition ease-in-out duration-200 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-200 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      {sideBarContent}
    </Transition>
  );
};
