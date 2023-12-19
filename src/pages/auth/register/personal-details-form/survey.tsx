import { Button } from '@/components/button';
import { RadioInput } from '@/components/input/radio-input';
import { Spacer } from '@/components/spacer';
import { useAuthStore } from '@/store/auth';
import { useMessagesStore } from '@/store/messages';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileDetailContext } from './profile-context';
import SvgArrowRight from '@/components/icons/ArrowRight';

export const SurveyOptions: React.FC<{
  name?: string;
  onClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}> = ({ name, onClick }) => {
  return (
    <div className="flex space-x-3 items-center">
      <input className="w-6 h-6 border-2 border-[#DCDCDC]" id={name?.toLowerCase()} type="checkbox" onClick={onClick} />
      <label htmlFor={name?.toLowerCase()}>{name}</label>
    </div>
  );
};

export const Survey = () => {
  const [surveyReply, setSurveyReply] = useState<string[]>([]);
  const [qatarSurveyReply, setQatarSurveyReply] = useState<string[]>([]);
  const { step, setValue, showPrevStep, showNextStep } = useContext(ProfileDetailContext);

  useEffect(() => {
    setValue('social', surveyReply);
  }, [surveyReply]);

  // useEffect(() => {
  //   setValue('campaignSocial', qatarSurveyReply);
  // }, [qatarSurveyReply]);

  function handleChange(event: boolean, value: string) {
    if (event === true) {
      setSurveyReply([...surveyReply, value]);
    }

    if (event === false) {
      setSurveyReply(
        surveyReply.filter((reply) => {
          return reply !== value;
        })
      );
    }
  }

  function handleQatarSurveyChange(event: boolean, value: string) {
    if (event === true) {
      setQatarSurveyReply([...qatarSurveyReply, value]);
    }

    if (event === false) {
      setQatarSurveyReply(
        qatarSurveyReply.filter((reply) => {
          return reply !== value;
        })
      );
    }
  }

  return (
    <div
      className={classNames('relative', {
        hidden: step !== 3,
        '': step === 3,
      })}
    >
      <h1 className="mt-24 font-sans font-extrabold lg:text-5.5 text-4xl lg:leading-14 text-neutral-500">
        Can you tell us how you found us?
      </h1>

      <Spacer className=" lg:h-14 h-8" />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <SurveyOptions
          name="Facebook"
          onClick={(event) => {
            //  @ts-ignore

            handleChange(event.target.checked, 'Facebook');
          }}
        />
        <SurveyOptions
          name="Instagram"
          onClick={(event) => {
            //  @ts-ignore

            handleChange(event.target.checked, 'Instagram');
          }}
        />
        <SurveyOptions
          name="Whatsapp"
          onClick={(event) => {
            //  @ts-ignore

            handleChange(event.target.checked, 'whatsapp');
          }}
        />
        <SurveyOptions
          name="LinkedIn"
          onClick={(event) => {
            //  @ts-ignore
            handleChange(event.target.checked, 'LinkedIn');
          }}
        />

        <SurveyOptions
          name="Twitter"
          onClick={(event) => {
            //  @ts-ignore

            handleChange(event.target.checked, 'Twitter');
          }}
        />

        <SurveyOptions
          name="Youtube"
          onClick={(event) => {
            //  @ts-ignore

            handleChange(event.target.checked, 'Youtube');
          }}
        />
      </div>

      <Spacer className=" lg:h-14 h-8" />
      {/* 
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap items-center sm:space-x-3">
          <p>Have you heard of the we deh go qatar campaign</p>
          <RadioInput
            id="qatar-check-yes"
            text="yes"
            name="qatar-check"
            className="w-[80px] mr-3"
            checked={qatarSurvey === 'Yes'}
            onChange={() => setQatarSurvey('Yes')}
          />
          <RadioInput
            id="qatar-check-no"
            text="No"
            name="qatar-check"
            className="w-[80px] cursor-pointer"
            checked={qatarSurvey === 'No'}
            onChange={() => setQatarSurvey('No')}
          />
        </div>

        {qatarSurvey === 'Yes' && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            <SurveyOptions
              name="Facebook"
              onClick={(event) => {
                //  @ts-ignore

                handleQatarSurveyChange(event.target.checked, 'Facebook');
              }}
            />
            <SurveyOptions
              name="Instagram"
              onClick={(event) => {
                //  @ts-ignore

                handleQatarSurveyChange(event.target.checked, 'Instagram');
              }}
            />
            <SurveyOptions
              name="Referral"
              onClick={(event) => {
                //  @ts-ignore

                handleQatarSurveyChange(event.target.checked, 'Referral');
              }}
            />
            <SurveyOptions
              name="LinkedIn"
              onClick={(event) => {
                //  @ts-ignore
                handleQatarSurveyChange(event.target.checked, 'LinkedIn');
              }}
            />

            <SurveyOptions
              name="Google and Social Media Ad"
              onClick={(event) => {
                //  @ts-ignore

                handleQatarSurveyChange(event.target.checked, 'Google and Social Media Ad');
              }}
            />

            <SurveyOptions
              name="From a friend"
              onClick={(event) => {
                //  @ts-ignore

                handleQatarSurveyChange(event.target.checked, 'friend');
              }}
            />
          </div>
        )}
      </div> */}

      <Spacer className=" lg:h-6 h-3" />

      <div className="mt-5 pb-6 lg:w-3/4 w-full absolute right-0 flex sm:flex-row flex-col sm:space-x-3 sm:space-y-0 space-y-4">
        <Button className=" w-full flex justify-center" variant="secondary" onClick={showPrevStep}>
          <div className=" flex lg:space-x-2">
            <span>
              <SvgArrowRight className=" mr-2" />
            </span>
            Back{' '}
          </div>
        </Button>
        <Button className="w-full" onClick={() => showNextStep()}>
          Continue
        </Button>
      </div>
    </div>
  );
};
