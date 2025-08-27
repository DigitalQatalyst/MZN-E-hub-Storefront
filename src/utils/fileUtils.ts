import { FileType } from '@component/ui/DocumentFilter';

/**
 * Extract file extension from filename
 */
export function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  return filename.substring(lastDotIndex + 1).toLowerCase();
}

/**
 * Map file extension to FileType
 */
export function getFileType(filename: string): FileType {
  const extension = getFileExtension(filename);
  
  switch (extension) {
    case 'png':
      return 'png';
    case 'jpg':
    case 'jpeg':
      return 'jpeg';
    case 'pdf':
      return 'pdf';
    case 'doc':
    case 'docx':
      return 'docx';
    case 'xls':
    case 'xlsx':
      return 'xlsx';
    default:
      return 'all'; // For unsupported types, treat as 'all'
  }
}

/**
 * Filter files by type
 */
export function filterFilesByType<T extends { name: string }>(
  files: T[], 
  selectedType: FileType
): T[] {
  if (selectedType === 'all') {
    return files;
  }
  
  return files.filter(file => getFileType(file.name) === selectedType);
}

/**
 * Count files by type
 */
export function getFileTypeCounts<T extends { name: string }>(
  files: T[]
): Record<FileType, number> {
  const counts: Record<FileType, number> = {
    all: files.length,
    png: 0,
    jpeg: 0,
    pdf: 0,
    docx: 0,
    xlsx: 0
  };

  files.forEach(file => {
    const fileType = getFileType(file.name);
    if (fileType !== 'all') {
      counts[fileType]++;
    }
  });

  return counts;
}
