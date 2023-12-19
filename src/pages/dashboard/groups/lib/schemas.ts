import * as yup from 'yup';

export const GroupSavingsGoalSchema = yup.object().shape({
  goalName: yup.string().required('This field is required'),
  goalPeriod: yup
    .string()
    .required('This field is required')
    .oneOf(['9 months', '6 months', '3 months', '1 year', 'custom'], 'Please select your goal period'),
  frequency: yup
    .string()
    .required('this field is required')
    .oneOf(['daily', 'weekly', 'monthly'], 'Please select your saving frequency'),
  amountToSave: yup.string().required('This field cannot be left empty'),
});

export const GroupGoalDetailsSchema = yup.object().shape({
  goalName: yup.string().required('This field is required'),
  amountToSave: yup.string().required('This field cannot be left empty'),
  accountType: yup.string().required('This is a required field'),
  subscriptionType: yup.string().required('This is a required field'),
});

export const DefaultGoalPeriodSchema = yup.object().shape({
  goalPeriod: yup.string().required().oneOf(['9', '6', '3', '12', 'custom'], 'Please select your goal period'),
  frequency: yup.string().required().oneOf(['daily', 'weekly', 'monthly'], 'Please select your saving frequency'),
});

export const RotationalGroupGoalDetailsSchema = yup.object().shape({
  goalName: yup.string().required('This field is required'),
  amountToSave: yup.string().required('This field cannot be left empty'),
  accountType: yup.string().required('This is a required field'),
  slots: yup.number().min(2, 'This value must be greater than 1').required('This is a required field'),
});

export const OrgGoalPeriodSchema = yup.object().shape({
  goalPeriod: yup
    .string()
    .required()
    .oneOf(['9 months', '6 months', '3 months', '1 year'], 'Please select your goal period'),
  frequency: yup.string().required().oneOf(['daily', 'weekly', 'monthly'], 'Please select your saving frequency'),
});
