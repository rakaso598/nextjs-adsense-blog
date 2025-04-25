import React from "react";

export default function LabelAndInput({ label, type, name, placeholder }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
  );
}
