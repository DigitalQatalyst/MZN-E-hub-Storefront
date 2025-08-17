'use client';
import React, { useState, useEffect } from 'react'
import { Navbar } from "@component/ui/FirmWalletNavbar";
import { DocumentSearch } from "@component/ui/DocumentSearch";
import { DocumentFilter } from "@component/ui/DocumentFilter";
import { FileCard } from "@component/ui/FileCard";
import { RecentActivity, ActivityItem } from "@component/ui/RecentActivity";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  cid: string;
}

const STORAGE_KEY = 'firm-wallet-uploaded-files';
const ACTIVITIES_STORAGE_KEY = 'firm-wallet-activities';

const MyDownloadsPage = () => {
  const [downloadedFiles, setDownloadedFiles] = useState<UploadedFile[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Load activities from localStorage and filter downloaded files
  useEffect(() => {
    try {
      const savedFiles = localStorage.getItem(STORAGE_KEY);
      const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      
      if (savedActivities && savedFiles) {
        const parsedActivities = JSON.parse(savedActivities);
        const parsedFiles = JSON.parse(savedFiles);
        
        // Convert timestamp strings back to Date objects and filter for download activities
        const activitiesWithDates = parsedActivities
          .map((activity: any) => ({
            ...activity,
            timestamp: new Date(activity.timestamp)
          }))
          .filter((activity: ActivityItem) => activity.type === 'downloaded');
        
        setActivities(activitiesWithDates);

        // Get files that have been downloaded
        const downloadedFileIds = activitiesWithDates.map((activity: ActivityItem) => activity.id);
        const filesWithDates = parsedFiles
          .filter((file: any) => downloadedFileIds.includes(file.id))
          .map((file: any) => ({
            ...file,
            uploadDate: new Date(file.uploadDate)
          }));
        
        setDownloadedFiles(filesWithDates);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

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
      <Navbar active="My Downloads" />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-sans text-[24px] font-medium mb-2 ml-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          My Downloads
        </h1>
        <p className="text-gray-600 ml-2">
          View and manage all your downloaded files
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mt-2 mb-4 gap-4 bg-[#F4F7FB] px-4 py-2 rounded-xl" style={{ width: '1116px' }}>
        <div className="flex-1 min-w-0">
          <DocumentSearch />
        </div>
        <div className="flex-shrink-0 ml-4">
          <DocumentFilter />
        </div>
      </div>

      {/* My Downloaded Files Section */}
      {downloadedFiles.length > 0 ? (
        <div className="mt-6" style={{ width: '1116px' }}>
          <h2 className="text-lg font-semibold mb-4 ml-1">My Downloaded Files ({downloadedFiles.length})</h2>
          <div className="grid grid-cols-4 gap-4" id="myDownloadedFiles">
            {downloadedFiles.map((file) => (
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
                    const fileToDelete = downloadedFiles.find(f => f.id === fileId);
                    const fileName = fileToDelete?.name || 'Unknown file';

                    // Delete from server (Pinata)
                    const { deleteImage } = await import('@lib/actions');
                    const result = await deleteImage(fileId);
                    
                    if (result.success) {
                      // Remove from local state
                      setDownloadedFiles(prev => prev.filter(f => f.id !== fileId));
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
        </div>
      ) : (
        <div className="mt-6 text-center py-12" style={{ width: '1116px' }}>
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No downloads yet</h3>
          <p className="text-gray-500 mb-4">Files you download will appear here</p>
          <button 
            onClick={() => window.location.href = '/documents'}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-md transition-colors"
          >
            Browse Files
          </button>
        </div>
      )}
      
      {/* Recent Download Activity Section */}
      <RecentActivity activities={activities} />
    </div>
  )
}

export default MyDownloadsPage
