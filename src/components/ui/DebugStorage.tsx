'use client';
import React, { useState, useEffect } from 'react';

export const DebugStorage: React.FC = () => {
  const [storageData, setStorageData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const checkStorage = () => {
      try {
        const files = localStorage.getItem('firm-wallet-uploaded-files');
        const activities = localStorage.getItem('firm-wallet-activities');
        
        setStorageData({
          files: files ? JSON.parse(files) : null,
          activities: activities ? JSON.parse(activities) : null,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error reading localStorage:', error);
        setStorageData({ error: error.message });
      }
    };

    checkStorage();
  }, [refreshKey]);

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const clearStorage = () => {
    localStorage.removeItem('firm-wallet-uploaded-files');
    localStorage.removeItem('firm-wallet-activities');
    refresh();
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">Debug Storage</h3>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
          >
            Refresh
          </button>
          <button
            onClick={clearStorage}
            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="text-xs space-y-2">
        <div>
          <strong>Files:</strong> {storageData?.files?.length || 0} items
        </div>
        <div>
          <strong>Activities:</strong> {storageData?.activities?.length || 0} items
        </div>
        <div>
          <strong>Last Check:</strong> {storageData?.timestamp && new Date(storageData.timestamp).toLocaleTimeString()}
        </div>
        
        {storageData?.files && storageData.files.length > 0 && (
          <div className="max-h-20 overflow-y-auto">
            <strong>File Names:</strong>
            <ul className="list-disc list-inside">
              {storageData.files.map((file: any, idx: number) => (
                <li key={idx} className="truncate">{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        
        {storageData?.error && (
          <div className="text-red-600">
            <strong>Error:</strong> {storageData.error}
          </div>
        )}
      </div>
    </div>
  );
};
