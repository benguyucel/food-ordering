import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import { categorySchema } from "../../schema/categorySchema";
import { getCategories } from "../../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  console.log(categories);
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        values
      );
      setCategories([...categories, res.data]);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (confirm("Are you sure want to delete this category")) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
      );
      setCategories(categories.filter((category) => category._id !== id));
    }
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        title: "",
      },
      onSubmit,
      validationSchema: categorySchema,
    });
  const input = {
    name: "title",
    type: "text",
    placeholder: "CategoryName",
    value: values.title || "",
    errorMessage: errors.title,
    touched: touched.title,
  };
  console.log(categories);
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Category</Title>
      <div className="mt-5">
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 flex-1 items-center"
        >
          <Input {...input} onBlur={handleBlur} onChange={handleChange} />
          <button type="submit" className="btn-primary">
            Add
          </button>
        </form>
        <div className="mt-10">
          {categories?.map((category, index) => (
            <div className="flex justify-between mt-4" key={index}>
              <b className="text-xl">{category.title}</b>
              <button
                className="btn-primary !bg-danger"
                onClick={(e) => handleDelete(e, category._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
