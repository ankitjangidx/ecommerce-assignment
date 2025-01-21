import React from 'react';
import { TbLoader3 } from 'react-icons/tb';

export const Button = ({ children, type = 'button', className = '', onClick = () => {},  isLoading = false, ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700  ${className}`}
      {...props}
    >
      {isLoading ? <TbLoader3 className="animate-spin text-black" /> : children}
     
    </button>
  );
};