import * as Yup from "yup";

export const productSchema = Yup.object().shape({
    title: Yup.string().required('Bu alan zorunludur'),
    desc: Yup.string().required('Bu alan zorunludur'),
    img: Yup.mixed().required("Required")
        .test('FILE_SIZE', 'Too big', (value) => value && value.size < 1024 * 1024)
        .test('FILE_TYPE', 'Invalid file typle', (value) => value && ['image/jpg', 'image/png', 'image/jpeg'].includes(value.type)),
    category: Yup.string().required('Bu alan zorunludur'),
    prices: Yup.array().when('category', {
        is: 'pizza',
        then: Yup.array().of(Yup.number()).min(3,'Prices are required').required("Required"),
        otherwise: Yup.array().of(Yup.number()).min(1,'Price required').required("Required"),
    }),
    'extras.text': Yup.string().when('extras.price', {
        is: (val) => val > 0,
        then: Yup.string().required('Bu alan zorunludur'),
    }),
    'extras.price': Yup.number().when('extras.text', {
        is: (val) => val && val.length > 0,
        then: Yup.number().required('Bu alan zorunludur'),
    }),
});

