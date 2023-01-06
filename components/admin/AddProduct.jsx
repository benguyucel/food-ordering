import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/categorySlice";
import { productSchema } from "../../schema/productSchema";
import Input from "../form/Input";
import Textarea from "../form/Textarea";
import PreviewImage from "../form/PreviewImage";
import { toast } from "react-toastify";
/** FORMIK INITAL STATE */
const initialValues = {
  title: "",
  desc: "",
  img: "",
  prices: [],
  category: "pizza",
  extras: { text: "", price: 0 },
};

/** FORMIK INITAL STATE */
const AddProduct = ({ setIsProductModal }) => {
  const { categories } = useSelector((state) => state.category);
  const [extraOptions, setExtraOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = async (values) => {
    const { img } = values;
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "food-ordering");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/yuceldev/image/upload",
        data
      );

      const { url } = res.data;

      const newProduct = {
        title: values.title,
        desc: values.desc,
        img: url,
        prices: values.prices,
        category: values.category.toLowerCase(),
        extras: [...extraOptions],
      };
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );
      if (result.status === 200) {
        setIsProductModal(false);
        toast.success("Product created successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    handleSubmit,
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    setValues,
    resetForm,
    setFieldValue,
  } = useFormik({
    onSubmit,
    initialValues,
    validationSchema: productSchema,
  });


  const addExtraOption = (e, option) => {
    e.preventDefault();
    if (values.extras.text !== "" && values.extras.price > 0) {
      setExtraOptions((prev) => [...prev, option]);
      setFieldValue("extras.price", 0);
      setFieldValue("extras.text", "");
    }
  };
  const handlePriceChange = (event, index) => {
    let prices = values.prices.slice();
    prices[index] = event.target.value;
    setValues({
      ...values,
      prices: prices,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Add a New Product</Title>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col text-sm mt-6 items-ebnd">
                <label htmlFor="img" className="flex items-center gap-3">
                  <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">
                    Choose image
                  </button>
                  <input
                    id="img"
                    type={"file"}
                    name="img"
                    onChange={(e) => setFieldValue("img", e.target.files[0])}
                    className="hidden"
                  />
                  {errors.img && (
                    <span className="text-xs text-danger">{errors.img}</span>
                  )}
                  {values.img && !errors.img && (
                    <PreviewImage file={values.img} />
                  )}
                </label>
              </div>
              <div className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-[2px]">Title</span>
                <Input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 p-1 text-sm px-1 outline-none w-full"
                  placeholder="Write a title..."
                  touched={touched.title}
                  errorMessage={errors.title}
                />
              </div>
              <div className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-[2px]">Description</span>
                <Textarea
                  name="desc"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.desc}
                  className="border-2 p-1 text-sm px-1 outline-none w-full"
                  placeholder="Write a title..."
                  touched={touched.desc}
                  errorMessage={errors.desc}
                />
              </div>
              <div className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-[2px]">Select Category</span>
                <select
                  className="border-2 p-1 text-sm px-1 outline-none"
                  placeholder="Write a title..."
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  {categories &&
                    categories.map((category, index) => (
                      <option
                        key={index}
                        value={`${category.title.toLowerCase()}`}
                      >
                        {category.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col text-sm mt-4 w-full">
                <span className="font-semibold mb-[2px]">Prices</span>
                {values.category.toLowerCase() === "pizza" ? (
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                      <Input
                        type="number"
                        name="prices[0]"
                        id="prices[0]"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="small"
                        value={values.prices[0]}
                        onBlur={handleBlur}
                        onChange={(event) => handlePriceChange(event, 0)}
                      />
                      <Input
                        type="number"
                        id="prices[1]"
                        name="prices[1]"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="medium"
                        value={values.prices[1]}
                        onBlur={handleBlur}
                        onChange={(event) => handlePriceChange(event, 1)}
                      />
                      <Input
                        type="number"
                        id="prices[2]"
                        name="prices[2]"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="large"
                        value={values.prices[2]}
                        onBlur={handleBlur}
                        onChange={(event) => handlePriceChange(event, 2)}
                      />
                    </div>
                    {touched.prices && errors.prices && (
                      <span className="mt-2 text-center text-danger">
                        {errors.prices}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                      <Input
                        type="number"
                        name="prices[0]"
                        id="prices"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="small"
                        value={values.prices[0]}
                        onBlur={handleBlur}
                        onChange={(event) => handlePriceChange(event, 0)}
                        touched={touched.prices && touched.prices}
                        errorMessage={
                          errors.prices && touched.prices ? errors.prices : null
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col text-sm mt-4 w-full">
                <span className="font-semibold mb-[2px]">Extra</span>
                <div className="flex  gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="text"
                    name="extras.text"
                    value={values.extras.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="price"
                  />
                  <input
                    type="number"
                    name="extras.price"
                    value={values.extras.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="item"
                  />
                  <button
                    onClick={(e) => addExtraOption(e, values.extras)}
                    className="btn-primary ml-auto"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2">
                  {extraOptions &&
                    extraOptions.map((extra, index) => (
                      <span
                        key={index}
                        onClick={() =>
                          setExtraOptions(
                            extraOptions.filter((_, i) => i !== index)
                          )
                        }
                        className="inline-block cursor-pointer border border-orange-500 text-orange-500  p-1 rounded-xl text-xs"
                      >
                        {extra.text}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn-primary !bg-success">
                  Create
                </button>
              </div>
              <button
                className="absolute  top-4 right-4"
                onClick={() => setIsProductModal(false)}
              >
                <GiCancel size={25} className=" transition-all" />
              </button>
            </form>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
