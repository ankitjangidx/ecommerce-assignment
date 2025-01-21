import React from "react";

function Input({
  id = "",
  label = "",
  type = "text",
  value = "",
  placeholder = "",
  onChange = () => {},
  required = true,
  children = null,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {children && <div className="mt-1">{children}</div>}
    </div>
  );
}

export default Input;
