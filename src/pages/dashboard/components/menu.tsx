import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const MenuDrop = () => {
  return (
    <div className=" relative ">
      <Menu as="div">
        <Menu.Button className="flex font-sans text-sm leading-5 text-neutral-500 mt-1 items-center bg-none ">
          {({ open }) => <>My Profile</>}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="flex flex-col space-y-2 px-2 py-6 absolute -right-6 w-48 origin-top-right bg-white rounded-md shadow-xl ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard/settings"
                  className={`${
                    active ? 'bg-neutral-100 text-primary-400' : 'text-gray-900'
                  } px-3 py-1 rounded-md text-[#000000] font-sans-body `}
                >
                  My profile
                </Link>
              )}
            </Menu.Item>

            {/* <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard/coupon"
                  className={`${
                    active ? 'bg-neutral-100 text-primary-400' : 'text-gray-900'
                  } px-3 py-1 rounded-md text-[#000000] font-sans-body `}
                >
                  Coupons
                </Link>
              )}
            </Menu.Item> */}

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-neutral-100 text-primary-400' : 'text-gray-900'
                  } text-left px-3 py-1 rounded-md  text-[#000000] font-sans-body`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
