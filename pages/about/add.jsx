import * as Yup from "yup";
import { Field, useFormik } from "formik";

const validationSchema = Yup.object().shape({
  friends: Yup.array().of(
    Yup.number().min(1).required("This field is required")
  ),
});

const AddProduct = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        friends: [0, 0],
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div>
      <h1>Friends</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="friends[0]">Friend 1</label>
        <input
          id="friends[0]"
          name="friends[0]"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.friends[0]}
        />
        {errors.friends && touched.friends && (
          <div className="error">{errors.friends[0]}</div>
        )}
        <label htmlFor="friends[1]">Friend 2</label>
        <input
          id="friends[1]"
          name="friends[1]"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.friends[1]}
        />
        {errors.friends && touched.friends && (
          <div className="error">{errors.friends[1]}</div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddProduct;
