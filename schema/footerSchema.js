import * as Yup from "yup";

export const footerSchema = Yup.object().shape({
  location: Yup.string().required(),
  email: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  desc: Yup.string().required(),
  'socialMedia.link': Yup.string().when('socialMedia.icon', {
    is: (val) => val && val.length > 0,
    then: Yup.string().required('Required Icon'),
  }),
  'socialMedia.icon': Yup.number().when('socialMedia.link', {
    is: (val) => val && val.length > 0,
    then: Yup.number().required('Required link'),
  }),
  openingHours: Yup.object().shape({
    day: Yup.string().required('Day is required'),
    hour: Yup.string().required('Hour is required'),
  }),

});
