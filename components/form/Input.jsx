import React from "react";

const Input = (props) => {
  const { placeholder, errorMessage, touched, type, className, ...restInputs } =
    props;
  return (
    <div className="w-full">
      <label className="w-full relative block cursor-text">
        <input
          type={type}
          className={`${type !== "datetime-local" ? "pt-2" : ""} ${
            touched && errorMessage
              ? "border-red-500"
              : `${!className && "border-primary"}`
          } ${
            className
              ? className
              : "h-12 w-full outline-none border border-primary px-4 pt-2 pb-2"
          }`}
          
          {...restInputs}
        />
        {type !== "datetime-local" && (
          <span
            className={`h-12 absolute top-0 left-0 
          text-sm px-4 flex items-center 
          ${restInputs.value && `h-5`}
          peer-focus:h-5 peer-valid:h-5 
          peer-focus:text-xs transition-all`}
          >
            {placeholder}
          </span>
        )}
      </label>
      {touched && <span className="text-xs text-danger">{errorMessage}</span>}
    </div>
  );
};

export default Input;
