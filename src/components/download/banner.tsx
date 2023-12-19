import { deviceDetect, isIOS, isMacOs } from 'react-device-detect';
import React from 'react';

const getDownloadLink = () => {
  if (isIOS || isMacOs) {
    // iOS (iPhone, iPad, iPod)
    return 'https://apps.apple.com/gh/app/bezo/id6447621019';
  }

  // Android
  return 'https://play.google.com/store/apps/details?id=com.bezosusu.app';
};

const downloadLink = getDownloadLink();

export default function Banner() {
  return (
    <>
      <div className=" px-5 py-5">
        <h1 className="leading-[23.1px] font-semibold text-[16.5px] pb-1 font-sans">Get in on all the Bezo action!</h1>
        <h2 className=" font-opensans font-normal text-darkMidnight text-[13px] leading-[17.7px]">
        Click{' '}
         <a href={downloadLink} target="_blank">
            <button className="text-[#77C850] hover:text-sky-400 font-semibold underline">here</button>
        </a>{' '}
         to download the new Bezo app for an unmatched digital banking experience.{' '}
         
        </h2>
      </div>
    </>
  );
}

export function RegisterBanner() {
  return (
    <>
      <div className="ml-2 pl-2 rounded-2xl bg-LavenderGray mt-32">
        <div className=" px-5 py-5">
          <h1 className="leading-[23.1px] font-semibold text-[16.5px] pb-1 font-sans">Get in on all the Bezo action!</h1>
          <h2 className=" font-opensans font-normal text-darkMidnight text-[13px] leading-[17.7px]">
            Unlock the Full Potential. Download Our App{' '}
            <a href={downloadLink}>
              <button className=" text-blue-700 text-[#77C850] hover:text-sky-400 font-semibold underline">here</button>
            </a>{' '}
            for an Enhanced User Experience!
          </h2>
        </div>
      </div>
    </>
  );
}
