import React from "react";

const Textarea = (props) => {
  const {
    placeholder,
    errorMessage,
    touched,
    descValue,
    className,
    ...restInputs
  } = props;
  return (
    <div className="w-full">
      <label className="w-full relative block cursor-text">
        <textarea
          placeholder={placeholder}
          className={`${
            touched && errorMessage
              ? "border-red-500"
              : `${!className && "border-primary"}`
          } ${
            className
              ? className
              : "h-12 w-full outline-none border border-primary px-4 pt-2 pb-2"
          }`}
          required
          {...restInputs}
        >
          {descValue}
        </textarea>
      </label>
      {touched && <span className="text-xs text-danger">{errorMessage}</span>}
    </div>
  );
};

export default Textarea;
