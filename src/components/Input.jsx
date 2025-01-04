import React from "react";

export const Input = ({
  min,
  nameLabel,
  value,
  name,
  handleInputChange,
  type,
  required,
  readOnly,
  onWheel,
}) => {
  return (
    <div className="flex flex-col mt-4">
      <label className="text-gray-700">{nameLabel}</label>
      <input
        min={min}
        type={type}
        value={value}
        name={name}
        onChange={handleInputChange}
        className="rounded-md w-full"
        required={required}
        readOnly={readOnly ? true : false}
        onWheel={onWheel}
        pattern={type === "number" ? "^[0-9.,-]*$" : null}
      />
    </div>
  );
};
