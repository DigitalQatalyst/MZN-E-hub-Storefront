'use client';
import React, { useState, useEffect, useCallback } from 'react'
import { Navbar } from "@component/ui/FirmWalletNavbar";
import { DocumentSearch } from "@component/ui/DocumentSearch";
import { DocumentFilter, FileType } from "@component/ui/DocumentFilter";
import { FileCard } from "@component/ui/FileCard";
import { RecentActivity, ActivityItem } from "@component/ui/RecentActivity";
// import { DebugStorage } from "@component/ui/DebugStorage";
import { filterFilesByType, getFileTypeCounts } from "@utils/fileUtils";


export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  cid: string;
}

const STORAGE_KEY = 'firm-wallet-uploaded-files';
const ACTIVITIES_STORAGE_KEY = 'firm-wallet-activities';

const MyUploadsPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<UploadedFile[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [selectedFileType, setSelectedFileType] = useState<FileType>('all');

  // Load files and activities from localStorage on component mount
  useEffect(() => {
    try {
      const savedFiles = localStorage.getItem(STORAGE_KEY);
      if (savedFiles) {
        const parsedFiles = JSON.parse(savedFiles);
        // Convert uploadDate strings back to Date objects
        const filesWithDates = parsedFiles.map((file: any) => ({
          ...file,
          uploadDate: new Date(file.uploadDate)
        }));
        setUploadedFiles(filesWithDates);
        setFilteredFiles(filesWithDates);
      }

      const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (savedActivities) {
        const parsedActivities = JSON.parse(savedActivities);
        // Convert timestamp strings back to Date objects and filter for upload activities
        const activitiesWithDates = parsedActivities
          .map((activity: any) => ({
            ...activity,
            timestamp: new Date(activity.timestamp)
          }))
          .filter((activity: ActivityItem) => activity.type === 'uploaded');
        setActivities(activitiesWithDates);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Apply filters (search + type filter)
  const applyFilters = useCallback((searchResults: UploadedFile[]) => {
    const typeFilteredFiles = filterFilesByType(searchResults, selectedFileType);
    setFilteredFiles(typeFilteredFiles);
  }, [selectedFileType]);

  // Handle search results from DocumentSearch component
  const handleSearchResults = useCallback((results: UploadedFile[]) => {
    applyFilters(results);
  }, [applyFilters]);

  // Handle file type filter changes
  const handleFileTypeChange = useCallback((fileType: FileType) => {
    setSelectedFileType(fileType);
    applyFilters(uploadedFiles);
  }, [applyFilters, uploadedFiles]);

  // Effect to apply filters when uploadedFiles or selectedFileType changes
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      applyFilters(uploadedFiles);
    }
  }, [uploadedFiles, applyFilters]);

  // Helper function to add new activity
  const addActivity = (type: ActivityItem['type'], fileName: string, fileId?: string) => {
    const newActivity: ActivityItem = {
      id: fileId || Date.now().toString(),
      type,
      fileName,
      timestamp: new Date()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="p-6">
      <Navbar active="My Uploads" />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-sans text-[24px] font-medium mb-2 ml-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          My Uploads
        </h1>
        <p className="text-gray-600 ml-2">
          View and manage all your uploaded files
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mt-2 mb-4 gap-4 bg-[#F4F7FB] px-4 py-2 rounded-xl" style={{ width: '1116px' }}>
        <div className="flex-1 min-w-0">
          <DocumentSearch 
            files={uploadedFiles} 
            onSearchResults={handleSearchResults}
            placeholder="Search uploaded files..."
          />
        </div>
        <div className="flex-shrink-0 ml-4">
          <DocumentFilter 
            selectedType={selectedFileType}
            onTypeChange={handleFileTypeChange}
            fileTypeCounts={getFileTypeCounts(uploadedFiles)}
          />
        </div>
      </div>

      {/* My Uploaded Files Section */}
      {uploadedFiles.length > 0 ? (
        <div className="mt-6" style={{ width: '1116px' }}>
          <h2 className="text-lg font-semibold mb-4 ml-1">
            My Uploaded Files ({uploadedFiles.length})
            {filteredFiles.length !== uploadedFiles.length && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                - Showing {filteredFiles.length} result{filteredFiles.length === 1 ? '' : 's'}
              </span>
            )}
          </h2>
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-4 gap-4" id="myUploadedFiles">
              {filteredFiles.map((file) => (
              <FileCard 
                key={file.id}
                fileName={file.name}
                uploadDate={formatDate(file.uploadDate)}
                fileSize={formatFileSize(file.size)}
                fileId={file.id}
                onDownload={(fileId, fileName) => {
                  addActivity('downloaded', fileName, fileId);
                  // TODO: Implement actual download functionality
                  console.log('Download file:', fileName);
                }}
                onShare={(fileId, fileName) => {
                  addActivity('shared', fileName, fileId);
                  // TODO: Implement actual share functionality
                  console.log('Share file:', fileName);
                }}
                onDelete={async (fileId) => {
                  try {
                    // Find the file to get its name for the toast
                    const fileToDelete = uploadedFiles.find(f => f.id === fileId);
                    const fileName = fileToDelete?.name || 'Unknown file';

                    // Delete from server (Pinata)
                    const { deleteImage } = await import('@lib/actions');
                    const result = await deleteImage(fileId);
                    
                    if (result.success) {
                      // Remove from local state (localStorage will be updated automatically)
                      setUploadedFiles(prev => {
                        const updated = prev.filter(f => f.id !== fileId);
                        setFilteredFiles(current => current.filter(f => f.id !== fileId));
                        return updated;
                      });
                      addActivity('deleted', fileName, fileId);
                      const { toast } = await import('sonner');
                      toast.warning(`File ${fileName} deleted!`);
                    } else {
                      const { toast } = await import('sonner');
                      toast.error('Error deleting file...');
                    }
                  } catch (error) {
                    console.error('Delete error:', error);
                    const { toast } = await import('sonner');
                    toast.error('Error deleting file...');
                  }
                }}
              />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 text-center py-12" style={{ width: '1116px' }}>
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No uploads yet</h3>
          <p className="text-gray-500 mb-4">Start by uploading your first file from the Overview tab</p>
          <button 
            onClick={() => window.location.href = '/documents'}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-md transition-colors"
          >
            Go to Upload
          </button>
        </div>
      )}
      
      {/* Recent Upload Activity Section */}
      <RecentActivity activities={activities} />
      
      {/* Debug Storage Component - Commented out */}
      {/* <DebugStorage /> */}
    </div>
  )
}

export default MyUploadsPage
