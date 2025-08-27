'use client';
import React, { useState, useEffect, useCallback } from 'react'
import { Dropzone } from "@component/ui/DropZone";
import { Navbar } from "@component/ui/FirmWalletNavbar";
import { DocumentSearch } from "@component/ui/DocumentSearch";
import { DocumentFilter } from "@component/ui/DocumentFilter";
import { FileCard } from "@component/ui/FileCard";
import { RecentActivity, ActivityItem } from "@component/ui/RecentActivity";
// import { DebugStorage } from "@component/ui/DebugStorage";
import { PinataApiService } from "@lib/pinataApi";


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
  const [filteredFiles, setFilteredFiles] = useState<UploadedFile[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch files from Pinata API on page load
  useEffect(() => {
    const fetchFilesFromPinata = async () => {
      try {
        setIsLoading(true);
        setApiError(null);
        
        console.log('Fetching files from Pinata API...');
        const result = await PinataApiService.fetchFiles();
        
        if (result.success) {
          // Validate and transform Pinata files to our format
          const files = Array.isArray(result.data) ? result.data : [];
          console.log('Files to transform:', files);
          
          const transformedFiles = files.map(PinataApiService.transformPinataFile);
          
          // Store in localStorage
          PinataApiService.storeFilesInLocalStorage(transformedFiles, STORAGE_KEY);
          
          // Update state
          setUploadedFiles(transformedFiles);
          setFilteredFiles(transformedFiles);
          
          console.log(`Successfully fetched and stored ${transformedFiles.length} files from Pinata`);
        } else {
          // Handle API errors - result.success is false so result has error property
          const errorResult = result as { success: false; error: string; statusCode?: number };
          const errorMsg = `Failed to fetch files: ${errorResult.error}`;
          console.error(errorMsg);
          setApiError(errorResult.error);
          
          // Fallback to localStorage if API fails
          const localFiles = PinataApiService.getFilesFromLocalStorage(STORAGE_KEY);
          if (localFiles.length > 0) {
            const filesWithDates = localFiles.map((file: any) => ({
              ...file,
              uploadDate: new Date(file.uploadDate)
            }));
            setUploadedFiles(filesWithDates);
            setFilteredFiles(filesWithDates);
            console.log(`Loaded ${filesWithDates.length} files from localStorage as fallback`);
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching files:', error);
        setApiError('Unexpected error occurred while fetching files');
        
        // Fallback to localStorage
        try {
          const localFiles = PinataApiService.getFilesFromLocalStorage(STORAGE_KEY);
          if (localFiles.length > 0) {
            const filesWithDates = localFiles.map((file: any) => ({
              ...file,
              uploadDate: new Date(file.uploadDate)
            }));
            setUploadedFiles(filesWithDates);
            setFilteredFiles(filesWithDates);
          }
        } catch (localError) {
          console.error('Error loading from localStorage:', localError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilesFromPinata();
  }, []);

  // Load activities from localStorage on component mount
  useEffect(() => {
    try {
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
      console.error('Error loading activities from localStorage:', error);
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
        // console.log('Skipping save of empty array - localStorage has data');
        return;
      }
    }
    
    try {
      // console.log('Saving files to localStorage:', uploadedFiles.length, 'files');
      // console.log('Files being saved:', uploadedFiles.map(f => ({ id: f.id, name: f.name })));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedFiles));
      
      // Verify the save worked
      // const saved = localStorage.getItem(STORAGE_KEY);
      // if (saved) {
      //   const parsed = JSON.parse(saved);
      //   console.log('Verified save - localStorage now contains:', parsed.length, 'files');
      // }
    } catch (error) {
      // console.error('Error saving files to localStorage:', error);
    }
  }, [uploadedFiles]);


  // Debug: Check localStorage on component unmount
  // useEffect(() => {
  //   return () => {
  //     console.log('Component unmounting - checking localStorage...');
  //     const saved = localStorage.getItem(STORAGE_KEY);
  //     if (saved) {
  //       const parsed = JSON.parse(saved);
  //       console.log('On unmount - localStorage contains:', parsed.length, 'files');
  //     } else {
  //       console.log('On unmount - no localStorage data found');
  //     }
  //   };
  // }, []);

  // Save activities to localStorage whenever activities changes
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activities to localStorage:', error);
    }
  }, [activities]);

  // Handle search results from DocumentSearch component
  const handleSearchResults = useCallback((results: UploadedFile[]) => {
    setFilteredFiles(results);
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
      <Navbar active="Overview" />
      <Dropzone 
        uploadedFiles={uploadedFiles} 
        setUploadedFiles={(files) => {
          if (typeof files === 'function') {
            setUploadedFiles(prev => {
              const updated = files(prev);
              setFilteredFiles(updated);
              return updated;
            });
          } else {
            setUploadedFiles(files);
            setFilteredFiles(files);
          }
        }} 
        addActivity={addActivity} 
      />
      <div className="flex items-center justify-between mt-2 mb-4 gap-4 bg-[#F4F7FB] px-4 py-2 rounded-xl" style={{ width: '1116px' }}>
        <div className="flex-1 min-w-0">
          <DocumentSearch 
            files={uploadedFiles} 
            onSearchResults={handleSearchResults}
            placeholder="Search files by name or ID..."
          />
        </div>
        <div className="flex-shrink-0 ml-4">
          <DocumentFilter />
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading files from server...</span>
          </div>
        </div>
      )}
      
      {/* Error Display */}
      {apiError && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" style={{ width: '1116px' }}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error fetching files from server
              </h3>
              <div className="mt-2 text-sm text-red-700">
                {apiError}
              </div>
              <div className="mt-2 text-xs text-red-600">
                Showing cached files from local storage if available.
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* My Files Section */}
      {!isLoading && uploadedFiles.length > 0 && (
        <div className="mt-6" style={{ width: '1116px' }}>
          <h2 className="text-lg font-semibold mb-4 ml-1">
            My Files ({uploadedFiles.length})
            {filteredFiles.length !== uploadedFiles.length && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                - Showing {filteredFiles.length} result{filteredFiles.length === 1 ? '' : 's'}
              </span>
            )}
          </h2>
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-4 gap-4" id="myFiles">
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
                      setUploadedFiles(prev => {
                        const updated = prev.filter(f => f.id !== fileId);
                        setFilteredFiles(current => current.filter(f => f.id !== fileId));
                        return updated;
                      });
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
      )}
      
      {/* No Files Message */}
      {!isLoading && uploadedFiles.length === 0 && (
        <div className="text-center py-12 text-gray-500" style={{ width: '1116px' }}>
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
          <p className="text-gray-500">
            {apiError 
              ? "Unable to load files from server. Please check your connection or try again later." 
              : "Start by uploading some files to see them here."
            }
          </p>
        </div>
      )}
      
      {/* Recent Activity Section */}
      <RecentActivity activities={activities} />
      
      {/* Debug Storage Component - Commented out */}
      {/* <DebugStorage /> */}
    </div>
  )
}

export default FirmWallet