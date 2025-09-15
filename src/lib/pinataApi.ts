// Pinata API service for fetching uploaded files

export interface PinataFile {
  id: string;
  name: string;
  size: number;
  cid: string;
  created_at: string;
  mime_type?: string;
  group_id?: string | null;
  number_of_files?: number;
}

export interface PinataApiResponse {
  data?: {
    files: PinataFile[];
    next_page_token?: string;
  };
  files?: PinataFile[]; // Fallback for direct files array
  [key: string]: any; // Allow for other response formats
}

export interface PinataError {
  error: {
    reason: string;
    details: string;
  };
}

export class PinataApiService {
  private static readonly BASE_URL = 'https://api.pinata.cloud/v3/files';
  private static readonly JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

  /**
   * Fetch all public files from Pinata
   */
  static async fetchFiles(): Promise<{ success: true; data: PinataFile[] } | { success: false; error: string; statusCode?: number }> {
    try {
      if (!this.JWT) {
        const errorMsg = 'Pinata JWT not configured. Please create a .env.local file in your project root with: NEXT_PUBLIC_PINATA_JWT=your_jwt_token_here';
        console.error('❌ Environment Setup Required:', errorMsg);
        throw new Error(errorMsg);
      }

      const url = `${this.BASE_URL}/public`;
      
      console.log('Fetching files from Pinata API...');
      
      const request = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.JWT}`,
          'Content-Type': 'application/json',
        }
      });

      if (!request.ok) {
        const errorData = await request.json().catch(() => null);
        const errorMessage = errorData?.error?.reason || `HTTP ${request.status}: ${request.statusText}`;
        
        console.error('Pinata API Error:', {
          status: request.status,
          statusText: request.statusText,
          errorData
        });

        return {
          success: false,
          error: errorMessage,
          statusCode: request.status
        };
      }

      const response: PinataApiResponse = await request.json();
      console.log('Pinata API Response:', response);

      // Extract files from the nested structure: response.data.files
      const files = response.data?.files || response.files || [];
      const fileArray = Array.isArray(files) ? files : [];
      
      console.log('Extracted files array:', fileArray);

      return {
        success: true,
        data: fileArray
      };

    } catch (error) {
      console.error('Pinata API Service Error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred while fetching files';

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Transform Pinata file to our UploadedFile interface
   */
  static transformPinataFile(pinataFile: PinataFile) {
    return {
      id: pinataFile.id,
      name: pinataFile.name,
      size: pinataFile.size,
      uploadDate: new Date(pinataFile.created_at),
      cid: pinataFile.cid,
      mimeType: pinataFile.mime_type
    };
  }

  /**
   * Store files in localStorage with error handling
   */
  static storeFilesInLocalStorage(files: any[], storageKey: string = 'firm-wallet-uploaded-files'): boolean {
    try {
      const serializedFiles = JSON.stringify(files);
      localStorage.setItem(storageKey, serializedFiles);
      console.log(`Stored ${files.length} files in localStorage`);
      return true;
    } catch (error) {
      console.error('Error storing files in localStorage:', error);
      return false;
    }
  }

  /**
   * Get files from localStorage
   */
  static getFilesFromLocalStorage(storageKey: string = 'firm-wallet-uploaded-files'): any[] {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error reading files from localStorage:', error);
      return [];
    }
  }
}
