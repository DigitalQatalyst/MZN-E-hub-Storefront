'use client';
import React, { useState, useEffect } from 'react'
import { Dropzone } from "@component/ui/DropZone";
import { Navbar } from "@component/ui/FirmWalletNavbar";
import { DocumentSearch } from "@component/ui/DocumentSearch";
import { DocumentFilter } from "@component/ui/DocumentFilter";
import { FileCard } from "@component/ui/FileCard";
import { RecentActivity, ActivityItem } from "@component/ui/RecentActivity";
import { DebugStorage } from "@component/ui/DebugStorage";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  cid: string;
}

const STORAGE_KEY = 'firm-wallet-uploaded-files';
const ACTIVITIES_STORAGE_KEY = 'firm-wallet-activities';

const FirmWallet = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Load files and activities from localStorage on component mount
  useEffect(() => {
    console.log('Component mounting - loading from localStorage...');
    try {
      const savedFiles = localStorage.getItem(STORAGE_KEY);
      console.log('Raw localStorage data:', savedFiles);
      
      if (savedFiles) {
        const parsedFiles = JSON.parse(savedFiles);
        console.log('Loading files from localStorage:', parsedFiles.length, 'files');
        console.log('Parsed files:', parsedFiles.map((f: any) => ({ id: f.id, name: f.name })));
        
        // Convert uploadDate strings back to Date objects
        const filesWithDates = parsedFiles.map((file: any) => ({
          ...file,
          uploadDate: new Date(file.uploadDate)
        }));
        
        console.log('Setting uploadedFiles state with:', filesWithDates.length, 'files');
        setUploadedFiles(filesWithDates);
      } else {
        console.log('No saved files found in localStorage');
      }

      const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (savedActivities) {
        const parsedActivities = JSON.parse(savedActivities);
        // Convert timestamp strings back to Date objects
        const activitiesWithDates = parsedActivities.map((activity: any) => ({
          ...activity,
          timestamp: new Date(activity.timestamp)
        }));
        setActivities(activitiesWithDates);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // If there's an error, clear the corrupted data
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVITIES_STORAGE_KEY);
    }
  }, []);

  // Save files to localStorage whenever uploadedFiles changes
  useEffect(() => {
    // Only save if we have files (avoid saving empty array on initial render)
    if (uploadedFiles.length === 0) {
      // Check if there's actually supposed to be no files or if this is initial state
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing && JSON.parse(existing).length > 0) {
        console.log('Skipping save of empty array - localStorage has data');
        return;
      }
    }
    
    try {
      console.log('Saving files to localStorage:', uploadedFiles.length, 'files');
      console.log('Files being saved:', uploadedFiles.map(f => ({ id: f.id, name: f.name })));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedFiles));
      
      // Verify the save worked
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Verified save - localStorage now contains:', parsed.length, 'files');
      }
    } catch (error) {
      console.error('Error saving files to localStorage:', error);
    }
  }, [uploadedFiles]);

  // Debug: Check localStorage on component unmount
  useEffect(() => {
    return () => {
      console.log('Component unmounting - checking localStorage...');
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('On unmount - localStorage contains:', parsed.length, 'files');
      } else {
        console.log('On unmount - no localStorage data found');
      }
    };
  }, []);

  // Save activities to localStorage whenever activities changes
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activities to localStorage:', error);
    }
  }, [activities]);

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
      <Navbar active="Overview" />
      <Dropzone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} addActivity={addActivity} />
      <div className="flex items-center justify-between mt-2 mb-4 gap-4 bg-[#F4F7FB] px-4 py-2 rounded-xl" style={{ width: '1116px' }}>
        <div className="flex-1 min-w-0">
          <DocumentSearch />
        </div>
        <div className="flex-shrink-0 ml-4">
          <DocumentFilter />
        </div>
      </div>
      {/* My Files Section */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6" style={{ width: '1116px' }}>
          <h2 className="text-lg font-semibold mb-4 ml-1">My Files ({uploadedFiles.length})</h2>
          <div className="grid grid-cols-4 gap-4" id="myFiles">
            {uploadedFiles.map((file) => (
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

                    if (fileToDelete) {
                      // Move to bin instead of permanently deleting
                      const DELETED_FILES_STORAGE_KEY = 'firm-wallet-deleted-files';
                      const savedDeletedFiles = localStorage.getItem(DELETED_FILES_STORAGE_KEY);
                      const deletedFiles = savedDeletedFiles ? JSON.parse(savedDeletedFiles) : [];
                      
                      // Add to deleted files with deletion timestamp
                      const deletedFile = {
                        ...fileToDelete,
                        deletedDate: new Date()
                      };
                      deletedFiles.push(deletedFile);
                      localStorage.setItem(DELETED_FILES_STORAGE_KEY, JSON.stringify(deletedFiles));
                      
                      // Remove from uploaded files
                      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
                      addActivity('deleted', fileName, fileId);
                      
                      const { toast } = await import('sonner');
                      toast.warning(`File ${fileName} moved to bin!`);
                    }
                  } catch (error) {
                    console.error('Delete error:', error);
                    const { toast } = await import('sonner');
                    toast.error('Error moving file to bin...');
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Activity Section */}
      <RecentActivity activities={activities} />
      
      {/* Debug Storage Component */}
      <DebugStorage />
    </div>
  )
}

export default FirmWallet