import React from "react";

const CustomInput = (props : any) => {
  const {
    type,
    name,
    placeholder,
    classname,
    value,
    onChange,
    onBlur,
    disabled,
  } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        dir="rtl"
        className="w-[95%] mx-auto px-6 text-md justify-center py-3 shadow-sm rounded-md  border"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
