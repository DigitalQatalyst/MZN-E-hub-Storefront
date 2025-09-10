import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, FileText, Download, Share2, Trash2 } from 'lucide-react';

interface FileCardProps {
  fileName: string;
  uploadDate: string;
  fileSize: string;
  fileId?: string;
  onDelete?: (fileId: string) => void;
  onDownload?: (fileId: string, fileName: string) => void;
  onShare?: (fileId: string, fileName: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ fileName, uploadDate, fileSize, fileId, onDelete, onDownload, onShare }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (fileId && onDelete) {
      onDelete(fileId);
    }
    setIsDropdownOpen(false);
  };

  const handleDownload = () => {
    if (fileId && onDownload) {
      onDownload(fileId, fileName);
    }
    setIsDropdownOpen(false);
  };

  const handleShare = () => {
    if (fileId && onShare) {
      onShare(fileId, fileName);
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full h-[189px] flex flex-col items-center relative border border-gray-100">
      {/* 3-dot menu */}
      <div className="absolute top-4 right-4 cursor-pointer" ref={dropdownRef}>
        <div 
          onClick={toggleDropdown}
          className="p-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </div>
        
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            {fileId && onDelete && (
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 last:rounded-b-lg"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {/* File icon */}
      <div className="bg-[#EEF1FE] rounded-xl flex items-center justify-center mb-4 mt-2" style={{ width: '110px', height: '84px' }}>
        <div className="flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
          <FileText className="text-[#0030E3]" width={42.67} height={42.67} strokeWidth={1.5} />
        </div>
      </div>

      {/* File name */}
      <div className="font-medium truncate w-full text-center mb-1" style={{ color: '#00140E', fontFamily: 'Outfit, sans-serif', fontSize: '16px' }} title={fileName}>{fileName}</div>
      {/* Upload date and size */}
      <div className="text-xs text-gray-500 text-center">{uploadDate} - {fileSize}</div>
    </div>
  );
}; 