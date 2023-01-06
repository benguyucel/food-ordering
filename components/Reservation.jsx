import React from "react";
import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import { reservationSchema } from "../schema/reservation";
const Reservation = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    alert(JSON.stringify(values));
    actions.resetForm();
  };
  const { handleSubmit, touched, errors, values, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        persons: "",
        date: "",
      },
      onSubmit,
      validationSchema: reservationSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "persons",
      type: "number",
      placeholder: "How Many Persons?",
      values: values.persons,
      errorMessage: errors.persons,
      touched: touched.persons,
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      placeholder: "How Many Persons?",
      value: values.date,
      errorMessage: errors.date,
      touched: touched.date,
    },
  ];
  return (
    <div className="container mx-auto py-6">
      <div>
        <Title addClass="text-[2.5rem] mb-[1.563rem]">Book a Table</Title>
      </div>
      <div className="flex gap-x-7 w-full flex-wrap-reverse">
        <form
          onSubmit={handleSubmit}
          className="sm:flex-1 w-full flex-1 flex flex-col gap-y-2 items-start mb-5"
        >
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
          <button type="submit" onClick={handleSubmit} className="btn-primary">
            Order now
          </button>
        </form>
        <div className="sm:flex-1 w-full mb-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6919179.567147756!2d-116.31570068014047!3d44.59757176347471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5353ab66ebd1785d%3A0x51d0a39c77375f60!2zUm9ja3kgRGHEn2xhcsSx!5e0!3m2!1str!2str!4v1670954128140!5m2!1str!2str"
            allowFullScreen=""
            loading="lazy"
            className="w-full sm:h-full h-80 max-h-[17rem]  rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
