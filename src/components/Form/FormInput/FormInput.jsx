import "./FormInput.css";
import React from "react";

const FormInput = ({ placeholder, onChange }) => {
  return (
    <input
      type="number"
      className="form-input"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default FormInput;
