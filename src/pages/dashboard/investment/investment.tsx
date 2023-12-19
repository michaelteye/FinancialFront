import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Spacer } from '@/components/spacer';
import React, { Fragment, useEffect, useState } from 'react';
import invest from '@assets/images/dashboard-images/invest.png';
import investSm from '@assets/images/dashboard-images/invest2.png';
import noInvest from '@assets/images/dashboard-images/no-invest.png';
import bondBg from '@assets/images/dashboard-images/bond-bg.png';
import tBillsBg from '@assets/images/dashboard-images/t-bills-bg.png';
import fixedDepBg from '@assets/images/dashboard-images/fixed-deposits-bg.png';
import { Button } from '@/components/button';
import { InvestSetup } from './invest-setup';
import investBg from '@assets/images/dashboard-images/invest-bg.png';
import { useWidth } from '@/hooks/use-width';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { resolveInvestIcon } from './invest-form/invest-types';
import SvgBondSm from '@/components/icons/BondSm';
import Slider from 'react-slick';
import { CarouselArrow } from '../savings/savings';
import { LeftArrow, RightArrow } from '@/components/icons';
import SvgPlusSm from '@/components/icons/PlusSm';
import { InvestTransactionDetails } from './invest-transaction-details';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import { InvestmentDetailValues } from './types';
import { fetch } from '@/helpers/fetch';

export function resolveColor(name: string) {
  if (name === 'Bonds') {
    return 'text-[#25D789]';
  }
  if (name === 'Treasury Bills') {
    return 'text-[#0095D9]';
  }
  return 'text-[#000]';
}

const InvestmentDetails: React.FC<{ details?: InvestmentDetailValues }> = ({ details }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const small = true;

  const styles = { backgroundSize: 'cover', backgroundRepeat: 'no-repeat' };

  const bondBgStyle = {
    backgroundImage: `url(${bondBg})`,
    ...styles,
  };
  const tBillsStyles = {
    backgroundImage: `url(${tBillsBg})`,
    ...styles,
  };
  const fixedDepositsStyles = {
    backgroundImage: `url(${fixedDepBg})`,
    ...styles,
  };

  useEffect(() => {
    if (searchParams.get('details')) {
      setOpenDetails(true);
    }
  }, [!!searchParams.get('details')]);

  return (
    <>
      <InvestTransactionDetails open={openDetails} setOpen={setOpenDetails} details={details} />

      <button
        onClick={() => {
          setSearchParams({ details: details?._id! });
        }}
        style={(() => {
          if (details?.type === 'Treasury Bills') {
            return tBillsStyles;
          }
          if (details?.type === 'Fixed Deposits') {
            return fixedDepositsStyles;
          }
          return bondBgStyle;
        })()}
        className={`px-4 py-6 flex flex-col text-left rounded-xl hover:shadow-md sm:w-[230px] sm:min-w-[230px] min-w-[250px] w-full lg:w-[240px] mx-auto h-[272px] transition duration-75 ease-linear`}
      >
        <div className=" flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center bg-white text-xl ${resolveColor(
                details?.type?.name!
              )}`}
            >
              {resolveInvestIcon(details?.type?.name!, small) || (
                <span className="text-lightgreen">
                  <SvgBondSm />
                </span>
              )}
            </div>

            <p
              className={classNames(
                `text-white font-sans text-xs  px-3 py-2 rounded-full flex items-center justify-center`,
                {
                  'bg-secondary-200': details?.status !== 'active',
                  'bg-[#00AA77]': details?.status === 'active',
                }
              )}
            >
              {details?.status === 'active' ? 'Active' : 'Matured'}
            </p>
          </div>

          <Spacer className=" h-2" />

          <label className=" font-sans font-semibold text-neutral-600 text-xl">{details?.package?.name}</label>

          <span className="text-[#4F4F4F] text-xs">{details?.type?.brief}</span>

          <Spacer className="h-16" />

          <p className=" font-sans text-neutral-600 text-xl font-semibold">{`GHS ${
            details?.amount! ? details?.amount! : '0.00'
          }`}</p>
          <p className=" font-sans text-[#4F4F4F] text-xs">Amount Invested</p>

          <Spacer className="h-6" />

          <p className=" font-sans text-[#4F4F4F] text-xs">
            Up to {`${details?.package?.rate}% each year for ${details?.package?.duration} years`}
          </p>
        </div>
      </button>
    </>
  );
};

export const Investment = () => {
  const width = useWidth();
  const [searchParams] = useSearchParams();
  const [openInvest, setInvest] = useState(false);
  const [investments, setInvestments] = useState<InvestmentDetailValues[]>([]);

  const { data, refetch: fetchInvestments } = useQuery(
    ['investments'],
    async () => {
      const response = await fetch(`/users/investment`);

      return response?.data;
    },
    {
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    setInvestments(data?.data?.investments);
  }, [data]);

  const bgStyles = {
    backgroundImage: `url(${investBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const bgStylesSm = {
    backgroundImage: `url(${investBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 110px',
  };

  useEffect(() => {
    if (searchParams.get('open')) {
      setInvest(true);
    }
  }, [!!searchParams.get('open')]);

  const SliderWrapper = width > EScreenBreakpoints.LG ? 'div' : Fragment;

  const renderInvestments = investments?.map((investment) => {
    return (
      <div key={investment._id}>
        <InvestmentDetails details={investment} />
      </div>
    );
  });

  function resolveSlide(width: any) {
    if (width < EScreenBreakpoints.SM) {
      return 1;
    }

    if (width <= EScreenBreakpoints.MD && width > EScreenBreakpoints.SM) {
      return 3;
    }

    return 4;
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: resolveSlide(width),
    slidesToScroll: 1,
    nextArrow: (
      <CarouselArrow right>
        <RightArrow />
      </CarouselArrow>
    ),
    prevArrow: (
      <CarouselArrow>
        <LeftArrow />
      </CarouselArrow>
    ),
  };

  return (
    <>
      <InvestSetup open={openInvest} setOpen={setInvest} onSave={fetchInvestments} />

      <div className="font-recoleta relative">
        <Spacer className="sm:h-[26px] h-0" />

        <div
          style={width <= EScreenBreakpoints.SM ? bgStylesSm : bgStyles}
          className="flex justify-between w-full rounded-xl bg-lightgreen h-[213px] sm:px-8 pl-6 sm:pl-0 invest z-10"
        >
          <div className="flex flex-col items-start justify-center sm:w-1/2 w-3/4 sm:px-8">
            <p className="text-white sm:text-5xl text-3xl">Investment</p>

            <Spacer className="h-4" />

            <p className="font-sans text-white w-full">
              Create an investment goal today and earn up to <span className="text-primary-200">18% interest</span> each
              year
            </p>
          </div>

          <div className="flex sm:items-center justify-center sm:w-1/2  absolute sm:top-0 right-0 bottom-0   sm:right-0">
            <img src={invest} className="sm:block hidden" alt="invest-ad lady" />
            <img src={investSm} className="sm:hidden block" alt="invest-ad lady" />
          </div>
        </div>
      </div>

      <Spacer className="h-6" />

      <div className="flex flex-col">
        {investments?.length === 0 ? null : (
          <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-2 sm:items-center justify-between sm:w-full w-2/3">
            <p className="font-sans font-medium text-[#000] text-2xl">My Investment Portfolio</p>

            {/* <Button
              variant="tertiary"
              onClick={() => setInvest(true)}
              className="border-2 border-lightgreen text-lightgreen px-8 lg:py-2 flex items-center space-x-2"
            >
              <SvgPlusSm />
              <span> Invest</span>
            </Button> */}
          </div>
        )}
        <Spacer className="h-12" />

        {/* {investments?.length === 0 ? (
          <div className="flex flex-col items-center justify-center ">
            <img src={noInvest} alt="" />

            <Spacer className="h-6" />

            <p className="font-sans font-extralight text-center">
              You have no investment goals yet. <br /> Start investing and earn up to{' '}
              <span className="font-sans text-lightgreen font-bold">18% interest</span> each year
            </p>

            <Spacer className="h-10" />

            <div>
              <Button
                variant="tertiary"
                onClick={() => setInvest(true)}
                className="border-2 border-[#23D789] text-[#23D789] px-12 lg:py-3 flex items-center space-x-2"
              >
                <SvgPlusSm />
                <span> Start Investing</span>
              </Button>

              <Spacer className="h-16" />
            </div>
          </div>
        ) : (
          <div className="sm:grid sm:grid-cols-1 gap-2 sm:gap-4">
            <SliderWrapper>
              {renderInvestments?.length > 4 || width <= EScreenBreakpoints.SM ? (
                <Slider className="col-span-3" {...settings}>
                  {renderInvestments}
                </Slider>
              ) : (
                <div className="flex items-center space-x-4">{renderInvestments}</div>
              )}
            </SliderWrapper>
          </div>
        )} */}

        <div className="flex flex-col items-center justify-center ">
          <img src={noInvest} alt="" />

          <Spacer className="h-6" />

          <p className="font-sans font-extralight text-center">No Investment Packages are currently available.</p>

          <Spacer className="h-10" />
        </div>
      </div>

      <Spacer className="sm:h-16 h-8" />
    </>
  );
};
