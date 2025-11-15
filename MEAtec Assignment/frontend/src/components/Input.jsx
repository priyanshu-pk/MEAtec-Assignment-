import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  register,
  error,
  placeholder,
  ...props
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
          error
            ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
            : 'border-gray-300 focus:ring-purple-200 focus:border-purple-500'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 font-medium">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
