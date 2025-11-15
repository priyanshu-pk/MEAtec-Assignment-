import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-xl mb-4 flex justify-between items-center shadow-lg animate-slide-in">
      <span className="font-semibold">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 font-bold text-2xl hover:scale-125 transition-transform duration-200 ml-4"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
