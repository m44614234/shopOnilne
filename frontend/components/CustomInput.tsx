import React from "react";

const CustomInput = (props : any) => {
  const { type, name, placeholder, value, onChange } = props;
  return (
    <div className="w-full text-center">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        dir="rtl"
        className="w-[95%] mx-auto px-6 my-1 text-md justify-center py-3 shadow-sm rounded-md  border"
        value={value}
        onChange={onChange}
        
      />
    </div>
  );
};

export default CustomInput;
