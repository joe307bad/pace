import * as yup from 'yup';

export const PaceSchema = yup.object().shape({
  currentMile: yup.number().required(),
  mileTime: yup.number().required()
});
