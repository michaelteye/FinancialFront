import classNames from 'classnames';
import { SurveySteps, useSurveyContext } from '../survey-context';

export const Survey3 = () => {
  const { step, setForm, form } = useSurveyContext();

  if (step !== SurveySteps.SURVEY_3) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <textarea
        className={classNames(
          'box-border w-full rounded-lg focus:outline-none p-4 border border-neutral-200 focus:ring-primary-100 focus:ring-1'
        )}
        id="feedback"
        cols={6}
        rows={4}
        placeholder="Your Feedback here"
        onChange={(event) => {
          setForm({ ...form, feedback: event.target.value });
        }}
      />
    </div>
  );
};
