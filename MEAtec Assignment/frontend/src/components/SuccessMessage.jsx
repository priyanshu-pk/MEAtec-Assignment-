import React from 'react';

const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 px-5 py-4 rounded-xl mb-4 flex justify-between items-center shadow-lg animate-slide-in">
      <span className="font-semibold">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-green-600 hover:text-green-800 font-bold text-2xl hover:scale-125 transition-transform duration-200 ml-4"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
