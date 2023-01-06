import React, { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "../../schema/footerSchema";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [socialMediaLink, setSocialMediaLink] = useState([]);
  const [footerData, setFooterData] = useState([]);
  const onSubmit = async (values, actions) => {
    const { socialMedia, ...rest } = values;
    const editFooterData = { socialMedia: [...socialMediaLink], ...rest };
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
      editFooterData
    );
    if (res.status === 200) {
      toast.success("Footer Updated");
    }
    try {
    } catch (error) {}
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      location: footerData?.location || "",
      email: footerData?.email || "",
      phoneNumber: footerData?.phoneNumber || "",
      desc: footerData?.desc || "",
      openingHours: {
        day: footerData?.openingHours?.day || "",
        hour: footerData?.openingHours?.hour || "",
      },
      socialMedia: {
        icon: "",
        link: "",
      },
    },

    onSubmit,
    validationSchema: footerSchema,
  });
  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values?.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values?.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values?.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values?.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "openingHours.day",
      type: "text",
      placeholder: "Update Day",
      value: values?.openingHours?.day || "",
      errorMessage: errors.openingHours && errors.openingHours.day,
      touched: touched.openingHours && touched.openingHours.day,
    },
    {
      id: 6,
      name: "openingHours.hour",
      type: "text",
      placeholder: "Update Time",
      value: values?.openingHours?.hour || "",
      errorMessage: errors.openingHours && errors.openingHours?.hour,
      touched: touched.openingHours && touched.openingHours.hour,
    },
  ];
  const getFooter = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer/`);
      setFooterData(res.data[0]);
      setSocialMediaLink(res.data[0].socialMedia);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFooter();
  }, []);

  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Footer Settings</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            name="socialMedia.link"
            placeholder="Link Address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={`${values.socialMedia?.link}` || ""}
          />
          <Input
            placeholder="Icon Name"
            name="socialMedia.icon"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.socialMedia?.icon || ""}
          />
          <button
            className="btn-primary"
            type="button"
            onClick={() => {
              values.socialMedia.icon !== "" &&
                values.socialMedia.link !== "" &&
                setSocialMediaLink((prev) => [
                  ...prev,
                  { ...values.socialMedia },
                ]);
              setFieldValue("socialMedia.icon", "");
              setFieldValue("socialMedia.link", "");
            }}
          >
            Add
          </button>
        </div>
        <ul className="flex items-center gap-6">
          {socialMediaLink?.map(({ icon }, index) => (
            <li key={index} className="flex items-center">
              <i className={`${icon} text-2xl`}></i>
              <button
                className="text-danger"
                type="button"
                onClick={() => {
                  setSocialMediaLink((prev) =>
                    prev.filter((_, idx) => idx !== index)
                  );
                }}
              >
                <i className="fa fa-trash text-xl ml-2"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className="btn-primary mt-4">
        Update
      </button>
    </form>
  );
};

export default Footer;
