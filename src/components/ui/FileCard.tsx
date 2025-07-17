import React from 'react';
import { MoreVertical, FileText } from 'lucide-react';

interface FileCardProps {
  fileName: string;
  uploadDate: string;
  fileSize: string;
}

export const FileCard: React.FC<FileCardProps> = ({ fileName, uploadDate, fileSize }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-[262px] h-[189px] flex flex-col items-center relative border border-gray-100">
      {/* 3-dot menu */}
      <div className="absolute top-4 right-4 cursor-pointer group">
        <MoreVertical className="w-4 h-4 text-gray-400" />
        {/* Dropdown menu (hidden by default) */}
        <div className="hidden group-hover:block absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Download</button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share</button>
          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
        </div>
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