'use client';
import React, { useState, useEffect } from 'react'
import { Navbar } from "@component/ui/FirmWalletNavbar";
import { DocumentSearch } from "@component/ui/DocumentSearch";
import { DocumentFilter } from "@component/ui/DocumentFilter";
import { FileCard } from "@component/ui/FileCard";
import { RecentActivity, ActivityItem } from "@component/ui/RecentActivity";

export interface DeletedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  deletedDate: Date;
  cid: string;
}

const DELETED_FILES_STORAGE_KEY = 'firm-wallet-deleted-files';
const ACTIVITIES_STORAGE_KEY = 'firm-wallet-activities';

const MyBinPage = () => {
  const [deletedFiles, setDeletedFiles] = useState<DeletedFile[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Load deleted files and activities from localStorage
  useEffect(() => {
    try {
      const savedDeletedFiles = localStorage.getItem(DELETED_FILES_STORAGE_KEY);
      if (savedDeletedFiles) {
        const parsedFiles = JSON.parse(savedDeletedFiles);
        // Convert date strings back to Date objects
        const filesWithDates = parsedFiles.map((file: any) => ({
          ...file,
          uploadDate: new Date(file.uploadDate),
          deletedDate: new Date(file.deletedDate)
        }));
        setDeletedFiles(filesWithDates);
      }

      const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (savedActivities) {
        const parsedActivities = JSON.parse(savedActivities);
        // Convert timestamp strings back to Date objects and filter for delete activities
        const activitiesWithDates = parsedActivities
          .map((activity: any) => ({
            ...activity,
            timestamp: new Date(activity.timestamp)
          }))
          .filter((activity: ActivityItem) => activity.type === 'deleted');
        setActivities(activitiesWithDates);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save deleted files to localStorage whenever deletedFiles changes
  useEffect(() => {
    try {
      localStorage.setItem(DELETED_FILES_STORAGE_KEY, JSON.stringify(deletedFiles));
    } catch (error) {
      console.error('Error saving deleted files to localStorage:', error);
    }
  }, [deletedFiles]);

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

  const restoreFile = async (fileId: string) => {
    try {
      const fileToRestore = deletedFiles.find(f => f.id === fileId);
      if (!fileToRestore) return;

      // Remove from deleted files
      setDeletedFiles(prev => prev.filter(f => f.id !== fileId));
      
      // Add back to uploaded files
      const STORAGE_KEY = 'firm-wallet-uploaded-files';
      const savedFiles = localStorage.getItem(STORAGE_KEY);
      const parsedFiles = savedFiles ? JSON.parse(savedFiles) : [];
      
      const restoredFile = {
        id: fileToRestore.id,
        name: fileToRestore.name,
        size: fileToRestore.size,
        uploadDate: fileToRestore.uploadDate,
        cid: fileToRestore.cid
      };
      
      parsedFiles.push(restoredFile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedFiles));
      
      addActivity('restored', fileToRestore.name, fileId);
      
      const { toast } = await import('sonner');
      toast.success(`File ${fileToRestore.name} restored!`);
    } catch (error) {
      console.error('Restore error:', error);
      const { toast } = await import('sonner');
      toast.error('Error restoring file...');
    }
  };

  const permanentlyDelete = async (fileId: string) => {
    if (confirm('Are you sure you want to permanently delete this file? This action cannot be undone.')) {
      try {
        const fileToDelete = deletedFiles.find(f => f.id === fileId);
        if (!fileToDelete) return;

        // Remove from deleted files
        setDeletedFiles(prev => prev.filter(f => f.id !== fileId));
        addActivity('permanently_deleted', fileToDelete.name, fileId);
        
        const { toast } = await import('sonner');
        toast.error(`File ${fileToDelete.name} permanently deleted!`);
      } catch (error) {
        console.error('Permanent delete error:', error);
        const { toast } = await import('sonner');
        toast.error('Error permanently deleting file...');
      }
    }
  };

  const emptyBin = async () => {
    if (confirm('Are you sure you want to empty the bin? All files will be permanently deleted and cannot be recovered.')) {
      try {
        deletedFiles.forEach(file => {
          addActivity('permanently_deleted', file.name, file.id);
        });
        
        setDeletedFiles([]);
        
        const { toast } = await import('sonner');
        toast.error('Bin emptied - all files permanently deleted!');
      } catch (error) {
        console.error('Empty bin error:', error);
        const { toast } = await import('sonner');
        toast.error('Error emptying bin...');
      }
    }
  };

  return (
    <div className="p-6">
      <Navbar active="My Bin" />
      
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-sans text-[24px] font-medium mb-2 ml-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              My Bin
            </h1>
            <p className="text-gray-600 ml-2">
              View and restore deleted files or permanently delete them
            </p>
          </div>
          {deletedFiles.length > 0 && (
            <button
              onClick={emptyBin}
              className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-md transition-colors"
            >
              Empty Bin
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mt-2 mb-4 gap-4 bg-[#F4F7FB] px-4 py-2 rounded-xl" style={{ width: '1116px' }}>
        <div className="flex-1 min-w-0">
          <DocumentSearch 
            files={[]} 
            onSearchResults={() => {}}
            placeholder="Search deleted files..."
          />
        </div>
        <div className="flex-shrink-0 ml-4">
          <DocumentFilter />
        </div>
      </div>

      {/* Deleted Files Section */}
      {deletedFiles.length > 0 ? (
        <div className="mt-6" style={{ width: '1116px' }}>
          <h2 className="text-lg font-semibold mb-4 ml-1">Deleted Files ({deletedFiles.length})</h2>
          <div className="grid grid-cols-4 gap-4" id="myDeletedFiles">
            {deletedFiles.map((file) => (
              <div key={file.id} className="relative">
                <FileCard 
                  fileName={file.name}
                  uploadDate={`Deleted: ${formatDate(file.deletedDate)}`}
                  fileSize={formatFileSize(file.size)}
                  fileId={file.id}
                  onDownload={() => {}} // Disabled for deleted files
                  onShare={() => {}} // Disabled for deleted files
                  onDelete={() => permanentlyDelete(file.id)}
                />
                {/* Restore Button Overlay */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => restoreFile(file.id)}
                    className="bg-green-100 text-green-700 hover:bg-green-200 p-1 rounded text-xs transition-colors"
                    title="Restore file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center py-12" style={{ width: '1116px' }}>
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Bin is empty</h3>
          <p className="text-gray-500">Deleted files will appear here for recovery</p>
        </div>
      )}
      
      {/* Recent Delete Activity Section */}
      <RecentActivity activities={activities} />
    </div>
  )
}

export default MyBinPage
