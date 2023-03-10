import { useFormik } from "formik";
import { useRouter } from "next/router";

import Link from "next/link";
import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { loginSchema } from "../../schema/loginSchema";

import { useSession, signIn, getSession } from "next-auth/react";

const Login = () => {
  const { push } = useRouter();
  const onSubmit = async (values, actions) => {
    let options = { redirect: false, ...values };
    try {
      const res = await signIn("credentials", options);

      if (res.status === 200) push("/profile");
    } catch (error) {
      console.log(error);
    }
    actions.resetForm();
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];
  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[2.5rem] mb-6">Login</Title>
        <div className="flex flex-col gap-y-2 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="btn-primary !bg-secondary"
          >
            <i className="fa fa-github mr-2 text-lg"></i>
            GITHUB
          </button>
          <Link href="/auth/register">
            <span className="text-sm underline cursor-pointer text-secondary">
              Do you no have a account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/profile/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;
