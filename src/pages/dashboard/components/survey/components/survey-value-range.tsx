import classNames from 'classnames';
import { SurveySteps, useSurveyContext } from '../survey-context';

const surveyRates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const SurveyValueRange: React.FC<{}> = () => {
  const { step, setForm, form, setSelectedRate, selectedRate } = useSurveyContext();

  function resolveEmoji(idx: number) {
    if (idx === 0) {
      return '🙄';
    }
    if (idx === 3) {
      return '😐';
    }
    if (idx === 7) {
      return '😕';
    }
    if (idx === 10) {
      return '🤩';
    }
  }

  return (
    <div>
      <div className="flex">
        {surveyRates.map((rate, idx) => {
          return (
            <div className="flex flex-col items-center">
              <div className="">
                <p className="mb-8 text-xl">{resolveEmoji(idx)}</p>
              </div>
              <button
                key={idx}
                onClick={(event) => {
                  // @ts-ignore
                  const selectedValue = event.target.textContent;

                  if (step === SurveySteps.SURVEY_2) {
                    setForm({ ...form, recommendRating: selectedValue });
                  }
                  setSelectedRate(selectedValue);
                }}
                className={classNames(
                  'font-sans-body lg:text-lg text-sm text-[#06080c] border-t-2 border-b-2 border-r-[1px] border-[#0A2E65] lg:p-3 p-2',
                  {
                    'hover:bg-neutral-100': !selectedRate,
                    'border-r-2 border-[#0A2E65] rounded-tr-md rounded-br-md': idx === 10,
                    'border-l-2 border-[#0A2E65] rounded-bl-md rounded-tl-md': idx === 0,
                    '-mt-7': idx === 0 || idx === 3 || idx === 7 || idx === 10,
                    'bg-[#5E74DF] bg-opacity-20': idx <= parseFloat(selectedRate!),
                  }
                )}
              >
                {rate}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
