import "./ErrorComponent.css";
import React from "react";
import { BiError } from "react-icons/bi";

const ErrorComponent = ({ message }) => {
  return (
    <div className="error-component">
      <span className="mb-3">
        <BiError />
      </span>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
