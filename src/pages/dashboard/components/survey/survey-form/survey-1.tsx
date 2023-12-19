import classNames from 'classnames';
import { format } from 'date-fns';
import { SurveySteps, useSurveyContext } from '../survey-context';

export const Survey1 = () => {
  const { step, setForm, form } = useSurveyContext();

  if (step !== SurveySteps.SURVEY_1) {
    return null;
  }

  return (
    <>
      <div className="w-full grid grid-cols-3">
        <button
          onClick={() => {
            setForm({ ...form, overallRating: 'Not satisfied' });
          }}
          className={classNames(
            'flex flex-col  items-center space-y-4 hover:bg-neutral-100 hover:bg-opacity-50 py-3 rounded-md',
            {
              'bg-neutral-100': form.overallRating === 'Not satisfied',
            }
          )}
        >
          <div className="rate-button">
            <p className="text-5xl">😒</p>
          </div>
          <p className="font-sans-body text-sm">Not satisfied</p>
        </button>

        <button
          onClick={() => {
            setForm({ ...form, overallRating: 'Somewhat satisfied' });
          }}
          className={classNames(
            'flex flex-col  items-center space-y-4 hover:bg-neutral-100 hover:bg-opacity-50 py-3 rounded-md',
            {
              'bg-neutral-100': form.overallRating === 'Somewhat satisfied',
            }
          )}
        >
          <div className="rate-button">
            <p className="text-5xl">😕</p>
          </div>
          <p className="font-sans-body text-sm">Somewhat satisfied</p>
        </button>

        <button
          onClick={() => {
            setForm({ ...form, overallRating: 'Very Satisfied' });
          }}
          className={classNames(
            'flex flex-col  items-center space-y-4 hover:bg-neutral-100 hover:bg-opacity-50 py-3 rounded-md',
            {
              'bg-neutral-100': form.overallRating === 'Very Satisfied',
            }
          )}
        >
          <div className="rate-button">
            <p className="text-5xl">🤩</p>
          </div>
          <p className="font-sans-body text-sm">Very Satisfied</p>
        </button>
      </div>
    </>
  );
};
