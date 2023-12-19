import SvgClose from '@/components/icons/Close';
import { Spacer } from '@/components/spacer';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode } from 'react';
import { ActionButtons } from '../../savings/components/action-buttons';
import { ActionButtonsProps } from '../../savings/helpers/types';

interface NotificationLayoutProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showActionButtons?: boolean;
  buttonProps?: ActionButtonsProps;
}

export const NotificationLayout: React.FC<NotificationLayoutProps> = ({
  open,
  onClose,
  children,
  title,
  showActionButtons,
  buttonProps,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className={'fixed z-40 top-0 lg:w-[38%] w-full right-0'} onClose={onClose}>
        <div className="min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-20 z-[-10]" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-full transition-all transform bg-white shadow-xl h-screen p-8 overflow-auto">
              <div className="w-full flex items-center space-x-6">
                <button onClick={onClose}>
                  <SvgClose />
                </button>

                <h2 className="text-neutral-400 text-xl font-medium">{title}</h2>
              </div>

              {children}

              {showActionButtons ? (
                <>
                  <Spacer className="h-12" />

                  <ActionButtons {...buttonProps} />

                  <Spacer className="h-20" />
                </>
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
