import { CaretDown, CaretUp } from '@/components/icons';
import { useAuthStore } from '@/store/auth';
import MaleProfile from '@assets/images/dashboard-images/profile-male.png';
import FemaleProfile from '@assets/images/dashboard-images/profile-female.png';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export const Profile: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userProfile, logout } = useAuthStore();
  const firstName = userProfile?.user?.firstName || ' ';
  const lastName = userProfile?.user?.lastName || ' ';

  const profileFiles = userProfile?.user?.files?.filter(
    (file) => file?.appType === 'PROFILE' && file.idType === 'NONE'
  );

  const userProfilePic = profileFiles ? profileFiles?.[0] : null;

  const profilePicture = userProfile?.user?.gender === 'male' ? MaleProfile : FemaleProfile;

  return (
    <>
      <div className="flex justify-center">
        <div>
          <img
            className="w-14 h-14 rounded-full ml-5 object-cover"
            placeholder="blur"
            src={userProfilePic?.url[0] || profilePicture}
            alt="profile-picture"
          />
        </div>

        <div className="flex flex-col ml-4">
          <p className="font-sans font-medium text-neutral-800 text-xl leading-6 break-words capitalize">
            {firstName + ' ' + lastName?.substring(0, 1) + '.' || ' '}
          </p>

          <div>
            <div className=" relative ">
              <Menu as="div">
                <Menu.Button className="flex font-sans text-sm leading-5 text-neutral-500 mt-1 items-center bg-none ">
                  {({ open }) => (
                    <>
                      My Profile
                      <span className="ml-2">{open ? <CaretUp /> : <CaretDown />}</span>
                    </>
                  )}
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
                  <div className="flex flex-col">
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
                      {/* 
                      <Menu.Item>
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
                            onClick={() => {
                              logout();
                              onClose?.();
                              navigate('/auth/login');
                              queryClient.clear();
                            }}
                            className={`${
                              active ? 'bg-neutral-100 text-primary-400' : 'text-gray-900'
                            } text-left px-3 py-1 rounded-md  text-[#000000] font-sans-body`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </div>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
