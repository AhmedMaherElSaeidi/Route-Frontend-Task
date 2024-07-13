import "./FormSelect.css";
import React from "react";

const FormSelect = ({ defaultOption, options, onChange }) => {
  return (
    <select className="form-select" onChange={onChange}>
      <option value="">{defaultOption}</option>
      {options.data.map((option) => (
        <option key={option[options.key]} value={option[options.key]}>
          {option[options.value]}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
