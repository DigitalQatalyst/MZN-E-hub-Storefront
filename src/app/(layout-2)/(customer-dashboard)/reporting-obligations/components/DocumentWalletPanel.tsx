"use client";

import {
  ChevronRightIcon,
  ExternalLinkIcon,
  FileIcon,
  FileTextIcon,
} from "lucide-react";
import Link from "next/link";
import { ReportDocument } from "../types/reporting";

interface DocumentWalletPanelProps {
  documents: ReportDocument[];
}

export function DocumentWalletPanel({ documents }: DocumentWalletPanelProps) {
  // Function to get file type icon
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileTextIcon size={16} className="text-red-600" />;
      case "excel":
      case "xlsx":
        return <FileIcon size={16} className="text-green-600" />;
      case "word":
      case "docx":
        return <FileIcon size={16} className="text-blue-600" />;
      default:
        return <FileIcon size={16} className="text-gray-600" />;
    }
  };

  // Function to get file type background color
  const getFileTypeBg = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return "bg-red-100";
      case "excel":
      case "xlsx":
        return "bg-green-100";
      case "word":
      case "docx":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full w-full flex flex-col">
      <div className="border-b border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Document Wallet</h2>
          <p className="text-sm text-gray-600">
            Your uploaded report documents
          </p>
        </div>
        <Link
          href="/reporting-obligations/documents"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          View All
          <ChevronRightIcon size={16} className="ml-1" />
        </Link>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {documents.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No documents found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.slice(0, 4).map((document) => (
              <div
                key={document.id}
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1 mr-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${getFileTypeBg(
                        document.fileType
                      )} flex items-center justify-center mr-3 mt-0.5`}
                    >
                      {getFileIcon(document.fileType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {document.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {document.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {document.fileSize}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
                    onClick={() => window.open(document.fileUrl, "_blank")}
                  >
                    <ExternalLinkIcon size={12} />
                  </button>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
