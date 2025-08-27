import React from "react";

export type FileType = 'all' | 'png' | 'jpeg' | 'pdf' | 'docx' | 'xlsx';

interface DocumentFilterProps {
  selectedType: FileType;
  onTypeChange: (type: FileType) => void;
  fileTypeCounts?: Record<FileType, number>;
}

export function DocumentFilter({ selectedType, onTypeChange, fileTypeCounts }: DocumentFilterProps) {
  const fileTypes: { value: FileType; label: string }[] = [
    { value: 'all', label: 'All types' },
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'pdf', label: 'PDF' },
    { value: 'docx', label: 'DOCX' },
    { value: 'xlsx', label: 'XLSX' }
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(event.target.value as FileType);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter" viewBox="0 0 24 24">
          <polygon points="22 3 2 3 10 13.5 10 19 14 21 14 13.5 22 3"></polygon>
        </svg>
      </span>
      <select 
        value={selectedType}
        onChange={handleChange}
        className="rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {fileTypes.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
} 