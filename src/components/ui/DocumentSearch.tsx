import React, { useState, useEffect, useMemo, useCallback } from "react";
import Fuse from 'fuse.js';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  cid: string;
}

interface DocumentSearchProps {
  files: UploadedFile[];
  onSearchResults: (results: UploadedFile[]) => void;
  placeholder?: string;
}

export function DocumentSearch({ 
  files, 
  onSearchResults, 
  placeholder = "Search files by name..." 
}: DocumentSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Configure Fuse.js for fuzzy search
  const fuseOptions = {
    // Threshold: 0.0 = exact match, 1.0 = match anything
    threshold: 0.3,
    // Distance: Maximum distance to search
    distance: 100,
    // Minimum character length of search term
    minMatchCharLength: 1,
    // Keys to search in
    keys: [
      {
        name: 'name',
        weight: 0.8
      },
      {
        name: 'cid',
        weight: 0.2
      }
    ],
    // Include score and matches in results
    includeScore: true,
    includeMatches: true
  };

  // Create Fuse instance with current files
  const fuse = useMemo(() => {
    return new Fuse(files, fuseOptions);
  }, [files]);

  // Perform search when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If search is empty, return all files
      onSearchResults(files);
      return;
    }

    // Perform fuzzy search
    const results = fuse.search(searchTerm);
    
    // Extract the original items from Fuse results
    const searchResults = results.map(result => result.item);
    
    onSearchResults(searchResults);
  }, [searchTerm, fuse, files, onSearchResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex-1 max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
        />
        
        {/* Search icon or clear button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {searchTerm ? (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              title="Clear search"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          ) : (
            <span className="text-gray-400">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          )}
        </div>
      </div>
      
      {/* Search results indicator */}
      {searchTerm && (
        <div className="mt-2 text-xs text-gray-500">
          {files.length === 0 ? (
            "No files to search"
          ) : (
            `Searching in ${files.length} file${files.length === 1 ? '' : 's'}...`
          )}
        </div>
      )}
    </div>
  );
} 