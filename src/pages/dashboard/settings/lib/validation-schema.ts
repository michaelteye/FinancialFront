import * as yup from 'yup';

export const settingsProfileSchema = yup.object().shape({
  firstName: yup.string().required('Please provide a valid first name').required('Please provide a valid first name'),
  lastName: yup.string().typeError('Please provide a valid last name').required('Please provide a valid last name'),
  dateOfBirth: yup.date().typeError('Please provide your date of birth').required('Please provide your date of birth'),
  occupation: yup.string().typeError('Please provide your occupation').required('Please provide your occupation'),
  gender: yup.string().typeError('Please provide your first name').required('Please select your gender type'),
  momo: yup.string().typeError('Please provide a valid phone number').required('Please provide a valid phone number'),
  homeAddress: yup.string().typeError('Please provide your home Address').required('Please provide your home Address'),
  region: yup.string().required('Please provide a valid region').required('Please provide a valid region'),
});

export const nextOfKinsProfileSchema = yup.object().shape({
  firstName: yup.string().typeError('Please provide a valid first name').required('Please provide a valid first name'),
  lastName: yup.string().typeError('Please provide a valid last name').required('Please provide a valid last name'),
  occupation: yup.string().typeError('Please provide a valid occupation').required('Please provide a valid occupation'),
  relationship: yup
    .string()
    .typeError('Please provide the relationship between you and your next of Kin')
    .required('Please provide the relationship between you and your next of Kin'),
  gender: yup.string().typeError('Please select your gender type').required('Please select your gender type'),
  phone: yup.string().typeError('Please provide a valid phone number').required('Please provide a valid phone number'),
  homeAddress: yup
    .string()
    .typeError('Please provide a valid home Address')
    .required('Please provide a valid home Address'),
  region: yup.string().typeError('Please provide a valid region').required('Please provide a valid region'),
});
