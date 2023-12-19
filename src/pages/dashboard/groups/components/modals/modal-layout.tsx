import { Button } from '@/components/button';
import SvgClose from '@/components/icons/Close';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import classNames from 'classnames';
import React from 'react';
import { GroupModalLayoutprops } from '../types';

export const GroupModalLayout: React.FC<GroupModalLayoutprops> = ({
  open,
  setOpen,
  children,
  hideCancel,
  headerText,
  bgColorStyle,
  cancelAction,
  buttonStyle,
  isLoading,
  icon: Icon,
  action = 'Yes, Confirm',
  action2 = 'Cancel',
  actionClick,
}) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen} className="rounded-2xl max-w-[530px]">
        <>
          <div className="px-7 py-6 bg-neutral-100 flex  bg-opacity-60 rounded-t-2xl">
            <div className="w-full items-center relative">
              <button className="absolute right-0" onClick={() => setOpen?.(false)}>
                <SvgClose />
              </button>

              <Spacer className="h-8" />

              <div className="flex flex-col space-y-4 justify-center items-center">
                <div className='flex justify-center items-center"'>
                  <Icon />
                </div>

                <div className="font-sans text-neutral-500 text-2xl font-semibold">{headerText}</div>
              </div>
            </div>
          </div>

          <Spacer className="h-8" />
        </>

        {children}

        <Spacer className="lg:h-12 h-5" />

        <div className=" h-[2px] w-full bg-neutral-100 bg-opacity-60"></div>

        <Spacer className="h-8" />

        <div
          className={classNames(`px-7 w-full ${buttonStyle}`, {
            'text-right': !buttonStyle,
          })}
        >
          <div className="inline-flex space-x-6">
            {hideCancel ? null : (
              <Button
                variant="secondary"
                className=" px-4 py-3"
                onClick={() => {
                  setOpen?.(false);
                  {
                    cancelAction ? cancelAction() : null;
                  }
                }}
              >
                {action2}
              </Button>
            )}

            <Button onClick={actionClick} loading={isLoading} variant="primary" className={`px-4 py-3 ${bgColorStyle}`}>
              {action}
            </Button>
          </div>
        </div>
        <Spacer className="lg:h-7 h-5" />
      </Modal>
    </>
  );
};
