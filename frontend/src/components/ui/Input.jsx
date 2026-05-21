import React from 'react';

export const Input = ({ label, id, error, ...props }) => {
  return (
    <div className="mb-8 relative">
      {label && (
        <label htmlFor={id} className="block font-heading text-lg text-dhaaga-primary mb-3">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-transparent border-b py-3 text-dhaaga-primary placeholder:text-dhaaga-muted/50 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-500' : 'border-dhaaga-border focus:border-dhaaga-accent'
        }`}
        {...props}
      />
      {error && <p className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
