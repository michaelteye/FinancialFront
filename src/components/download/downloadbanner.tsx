import React from 'react';
import { isIOS, isMacOs } from 'react-device-detect';

const getDownloadLink = () => {
  if (isIOS || isMacOs) {
    // iOS (iPhone, iPad, iPod)
    return 'https://apps.apple.com/gh/app/bezo/id6447621019';
  }

  // Android
  return 'https://play.google.com/store/apps/details?id=com.bezosusu.app';
};

const downloadLink = getDownloadLink();

export default function DashboardBanner() {
  return (
    <>
      <span className="w-full font-opensans text-base font-medium text-neutral-400">
        <p
          className="pt-3 text-left font-semibold not-italic text-base align-top font-opensans pb-1 
              sm:font-opensans sm:font-extrabold sm:text-[14px] sm:leading-[19px]
              "
        >
          <span className=" font-sans font-semibold text-[16.5px] leading-[22.4px]">
            {' '}
            Get in on all the Bezo action!{' '} 
          </span>
          <br />
          <span className=" font-opensans font-normal text-[13px] text-xs leading-[18px] ">
          Click here to download the new Bezo app for an unmatched digital banking experience.{' '}
            <a href={downloadLink} target="_blank">
              <button className="text-blue-700 sm:hidden hover:text-sky-400 font-semibold underline">here</button>
            </a>{' '}
           
          </span>
        </p>
        <span className="underline"></span>
      </span>
      <a href={downloadLink} target="_blank" rel="noopener noreferrer">
        <button className="bg-[#2138A8] rounded-7.35998 text-white w-60 h-11 px-3 py-3  font-opensans sm:flex hidden pl-14">
          Download Now
        </button>
      </a>
    </>
  );
}
