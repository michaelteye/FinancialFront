import React, { useState, useEffect } from 'react';
import { deviceDetect, isIOS, isMacOs } from 'react-device-detect';
import alert from '@assets/images/alert.png';
import GroupOne from '@assets/icons/GroupOne.svg';
import SvgDownload from '@/components/icons/download';
import Download from '@assets/images/Download.png'
import Make from '@assets/images/make.png'

type MobileAppDownloadProps = {
  onClose?: () => void;
};

const MobileAppDownload: React.FC<MobileAppDownloadProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const getDownloadLink = () => {
    if (isIOS || isMacOs) {
      // iOS (iPhone, iPad, iPod)
      return 'https://apps.apple.com/gh/app/bezo/id6447621019';
    }

    // Android
    return 'https://play.google.com/store/apps/details?id=com.bezosusu.app';
  };

  const downloadLink = getDownloadLink();

  const closeModal = () => {
    setIsOpen(false);
    onClose?.(); // Call the onClose function provided as a prop
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-700 bg-gray-900 bg-opacity-50">
          <div className="h-screen w-screen  flex items-center justify-center bg-[#575a5c] bg-opacity-50">
            <div className="bg-[#ECF1F4] rounded-xl p-8 max-w-md w-11/12 mx-auto relative">
              {/* Close icon */}
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="24"
                  height="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M18.293 5.293l-1.414-1.414L12 10.586 7.121 5.707 5.707 7.121 10.586 12l-4.879 4.879 1.414 1.414L12 13.414l4.879 4.879 1.414-1.414L13.414 12l4.879-4.879z" />
                </svg>
                
              </div>
              {/* End of close icon */}
              <div className="text-center">
                <div className="text-center justify-center flex bg">
                  <div
                    className="flex items-center justify-center rounded-full p-3 bg-ff86cc"
                    style={{ width: '250px', height: '250px' }}
                  >
                    <img src={Make} alt="" />
                  </div>
                </div>
                <h1 className="font-sans font-extrabold text-2xl leading-9 pt-4">
                  Download Bezo App!
                </h1>
                <p className="text-[18px] mt-4 font-sans-body">
                  Download the new Bezo app for an unmatched digital banking experience.
                  {/* <span className="font-black text-xl">July 28th, 2023.</span> New user registrations after this date will only be possible on the mobile app. */}
                </p>
              </div>
              <div className="mt-6">
                <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                  <button
                    onClick={getDownloadLink}
                    className="w-full py-3 rounded-lg bg-[#2138A8] text-white font-semibold"
                  >
                    Download Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileAppDownload;





