import React from 'react';

export const Select = ({ label, id, options, error, ...props }) => {
  return (
    <div className="mb-8 relative">
      {label && (
        <label htmlFor={id} className="block font-heading text-lg text-dhaaga-primary mb-3">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full bg-transparent border-b py-3 text-dhaaga-primary appearance-none focus:outline-none transition-colors cursor-pointer ${
            error ? 'border-red-500 focus:border-red-500' : 'border-dhaaga-border focus:border-dhaaga-accent'
          }`}
          {...props}
        >
          <option value="" disabled className="text-dhaaga-muted">Select an option</option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-dhaaga-muted">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {error && <p className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
