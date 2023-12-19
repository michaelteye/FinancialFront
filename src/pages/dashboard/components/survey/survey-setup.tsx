import { useEffect, useState } from 'react';
import { SurveyLayout } from './components/survey-layout';
import { SurveyValueRange } from './components/survey-value-range';
import { SurveyContext, SurveyFormData, SurveySteps } from './survey-context';
import { Survey3 } from './survey-form/survey-3';
import SvgSuccess from '@/components/icons/Success';
import { useApi } from '@/helpers/api';
import { useMessagesStore } from '@/store/messages';
import { Survey1 } from './survey-form/survey-1';
import Survey2 from './survey-form/survey-2';

interface SurveySetupProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  hideSurveyNotice: (open: boolean) => void;
}

export const SurveySetup: React.FC<SurveySetupProps> = ({ open, setOpen, hideSurveyNotice }) => {
  const [selectedRate, setSelectedRate] = useState('');
  const { displayMessage } = useMessagesStore();
  const [form, setForm] = useState<SurveyFormData>({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [step, setStep] = useState<SurveySteps>(SurveySteps.SURVEY_1);
  const { submit: submitSurveyResponse, isLoading: isSubmittingSurveyResponse } = useApi('/users/survey', {
    onSuccess() {
      setOpen(false);
      setOpenSuccess(true);
      hideSurveyNotice(true);
    },
    onError(error) {
      displayMessage({
        title: 'Failed!',
        description: error?.response?.data.message || 'Oops, Something went wrong, please try again later',
        variant: 'error',
      });
      setOpen(false);
    },
  });

  function resolveSurveyQuestion(step: SurveySteps) {
    if (step === SurveySteps.SURVEY_2) {
      return 'How likely are you to recommend BezoSusu to a friend?';
    }
    if (step === SurveySteps.SURVEY_1) {
      return 'How satisfied are you with your entire experience on the platform?';
    }
    if (step === SurveySteps.SURVEY_3) {
      return 'Care to share the reason for your score?';
    }
    if (step === SurveySteps.SURVEY_4) {
      return 'Done!';
    }
  }

  function resolveDisabledState(step: SurveySteps) {
    if (step === SurveySteps.SURVEY_1) {
      return !form.overallRating;
    }
    if (step === SurveySteps.SURVEY_2) {
      return !form.recommendRating;
    }
    if (step === SurveySteps.SURVEY_3) {
      return false;
    }
    return selectedRate === '';
  }

  useEffect(() => {
    if (open === true) {
      setStep(SurveySteps.SURVEY_1);
    }
  }, [open]);

  function handleSubmit() {
    submitSurveyResponse({
      message: form.overallRating,
      rating: form.recommendRating?.toString(),
      additional_info: form.feedback || '',
    });
  }

  return (
    <>
      <SurveyLayout
        open={openSuccess}
        setOpen={() => {
          setOpenSuccess(false);
          localStorage.setItem('SURVEY', 'true');
        }}
        question="Thank you!"
        successModal
        actionClick={() => {
          setOpenSuccess(false);
          localStorage.setItem('SURVEY', 'true');
        }}
      >
        <div className="flex flex-col justify-center items-center space-y-3">
          <SvgSuccess />

          <p className="font-sans text-sm">Your responses has been saved</p>
        </div>
      </SurveyLayout>

      <SurveyLayout
        open={open}
        setOpen={() => {
          setOpen(false);
          setSelectedRate('');
          setForm({});
        }}
        hideButton={step === SurveySteps.SURVEY_4}
        question={resolveSurveyQuestion(step)}
        actionClick={() => {
          if (step === SurveySteps.SURVEY_3) {
            handleSubmit();
          } else {
            setStep(step + 1);
            setSelectedRate('');
          }
        }}
        disabled={resolveDisabledState(step)}
        loading={step === SurveySteps.SURVEY_3 ? isSubmittingSurveyResponse : false}
      >
        <SurveyContext.Provider value={{ setStep, step, setForm, form, selectedRate, setSelectedRate }}>
          <Survey3 />
          <Survey2 />
          <Survey1 />
        </SurveyContext.Provider>
      </SurveyLayout>
    </>
  );
};
