import classnames from 'classnames';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment } from 'react';

interface ModalProps {
  open?: boolean;
  className?: string;
  dialogClasses?: string;
  close?: () => void;
  setOpen?: (open: boolean) => void;
}

export default function Modal({
  open,
  setOpen,
  children,
  dialogClasses,
  className = 'max-w-lg',
}: React.PropsWithChildren<ModalProps>) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={classnames('fixed z-40 top-0 left-0 flex justify-center items-center inset-0', dialogClasses)}
        onClose={() => {
          setOpen?.(false);
          close?.();
        }}
      >
        <div className="text-center">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-20" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={classnames(
                'flex justify-center w-full mx-auto align-middle transition-all transform px-4 lg:px-0',
                className
              )}
            >
              <div className={classnames('w-full bg-white shadow-xl ', className)}>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
