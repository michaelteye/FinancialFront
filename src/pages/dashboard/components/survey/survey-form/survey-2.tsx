import { SurveyValueRange } from '../components/survey-value-range';
import { SurveySteps, useSurveyContext } from '../survey-context';

const Survey2 = () => {
  const { step } = useSurveyContext();

  if (step !== SurveySteps.SURVEY_2) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <SurveyValueRange />
    </div>
  );
};

export default Survey2;
