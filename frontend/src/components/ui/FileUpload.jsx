import React, { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

export const FileUpload = ({ label, id, accept, multiple = false, onChange, error, value }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files);
    }
  };

  const fileCount = value?.length || 0;
  const fileName = fileCount > 0 ? (fileCount === 1 ? value[0].name : `${fileCount} files selected`) : null;

  return (
    <div className="mb-8 relative">
      {label && (
        <label className="block font-heading text-lg text-dhaaga-primary mb-3">
          {label}
        </label>
      )}
      <div className="relative">
        <input 
          type="file" 
          id={id} 
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`w-full flex flex-col items-center justify-center p-8 border border-dashed rounded-xl transition-all text-center ${
            dragActive ? 'bg-dhaaga-accent/5 border-dhaaga-accent' : 
            error ? 'border-red-500 bg-red-50' :
            'bg-dhaaga-bg border-dhaaga-border hover:bg-dhaaga-cards hover:border-dhaaga-accent/50'
          }`}
        >
          {fileName ? (
            <CheckCircle className="w-8 h-8 text-dhaaga-accent mb-3" strokeWidth={1.5} />
          ) : (
            <UploadCloud className="w-8 h-8 text-dhaaga-muted mb-3" strokeWidth={1.5} />
          )}
          <p className={`text-sm font-medium mb-1 ${fileName ? 'text-dhaaga-accent' : 'text-dhaaga-primary'}`}>
            {fileName ? fileName : 'Click or drag files to upload'}
          </p>
          <p className="text-xs text-dhaaga-muted">
            {accept ? `Supports ${accept}` : 'All standard formats supported'}
          </p>
        </div>
      </div>
      {error && <p className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
