"use client";
import React, {useCallback, useState} from 'react';
import {FileRejection, useDropzone} from 'react-dropzone';
import { Button } from './FirmWalletButton';
import { toast } from 'sonner';
import { pinata } from '@lib/pinata';
import { Loader2, Trash2Icon, CloudUpload } from 'lucide-react';
// import { cn } from '@lib/actions';
import { deleteImage } from '@lib/actions';
import { UploadedFile } from '../../app/(layout-2)/(customer-dashboard)/documents/page';
import { ActivityItem } from './RecentActivity';

interface DropzoneProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  addActivity: (type: ActivityItem['type'], fileName: string, fileId?: string) => void;
}

export function Dropzone({ uploadedFiles, setUploadedFiles, addActivity }: DropzoneProps) {
  const [uploadingFiles, setUploadingFiles] = useState<Array<{file:File; uploading: boolean}>>([]);


  const uploadFile = useCallback(async (file: File) => {
  try {
     //set uploading to true
    const keyRequest = await fetch('/api/key');
    const keyData = await keyRequest.json();
    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await fetch('/api/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${keyData.JWT}`,
      },
      body: formData,
    });
    // Parse the response to get the uploaded file's ID
    const uploadData = await uploadResponse.json();
    console.log(`This is the upload data: ${uploadData}`)

    // Remove from uploading state
    setUploadingFiles((prevFiles) => 
      prevFiles.filter((f) => f.file !== file)
    );

    // Add to uploaded files (new files appear first)
    const newUploadedFile: UploadedFile = {
      id: uploadData.cid,
      name: file.name,
      size: file.size,
      uploadDate: new Date(),
      cid: uploadData.cid
    };

    setUploadedFiles((prevFiles) => [newUploadedFile, ...prevFiles]);
    addActivity('uploaded', file.name, uploadData.cid);
    toast.success(`File ${file.name} uploaded successfully`);

  } catch (error) {
    // Remove from uploading state on error
    setUploadingFiles((prevFiles) => prevFiles.filter((f) => f.file !== file));
    console.log(error);
    toast.error("Something went wrong");
  }
}, [setUploadedFiles, addActivity]);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    
    // Do something with the files
    if(acceptedFiles){
      setUploadingFiles((prevFiles)=>[...prevFiles,
        ...acceptedFiles
        .map((file)=>({file, uploading:true}))
      ])

      acceptedFiles.forEach(uploadFile)
    }

  }, [uploadFile]);

 const rejectedFiles = useCallback((fileRejection:FileRejection[])=> {
if(fileRejection.length){
  const tooManyFiles = fileRejection.find((rejection)=> 
    rejection.errors[0].code === "too-many-files" );
  if(tooManyFiles){
    toast.error('Too many files selected, max is 5.');
  }
  const fileSize = fileRejection.find((rejection)=>
    rejection.errors[0].code === "file-too-large");
  if(fileSize){
    toast.error('File exceeds 5mb limit!')
  }

  const invalidType = fileRejection.find((rejection) =>
  rejection.errors[0].code === "file-invalid-type"
);
if (invalidType) {
  toast.error('Invalid file type! Only images and common document types are allowed.');
}


}
 },[])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    onDropRejected:rejectedFiles,
    maxFiles:5,
    maxSize: 1024 * 1024 * 5, //5mb
    accept: {
      "image/*": [],
    "application/pdf": [],
    "application/msword": [], // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [], // .docx
    "application/vnd.ms-excel": [], // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [], // .xlsx
    "application/vnd.ms-powerpoint": [], // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": [], // .pptx
    "text/csv": [],
    "text/plain": [],
    }
  })

  return (
    <div className="w-full flex flex-col items-start">
      <h1 className="font-sans text-[24px] font-medium mb-8 ml-2" style={{ fontFamily: 'Inter, sans-serif' }}>My Wallet</h1>
      <div
        {...getRootProps({
          className:
            'bg-white border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-12 shadow-sm',
        })}
        style={{ width: '1116px', height: '280px' }}
      >
        <input {...getInputProps()} />
        <CloudUpload className="w-12 h-12 text-gray-400 mb-6" />
        <p className="text-lg font-medium text-gray-700 mb-2 text-center">
          Drag & drop some files here, or click to select files
        </p>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Support various file types (PDF, DOCX, Images, etc.)
        </p>
        <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-8 py-2 rounded-md shadow-none">
          Select Files
        </Button>
      </div>
      
      {/* Show uploading files */}
      {uploadingFiles.length > 0 && (
        <div className="mt-4 w-full" style={{ width: '1116px' }}>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Uploading files...</h3>
          <div className="space-y-2">
            {uploadingFiles.map((fileItem, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-sm text-gray-700">{fileItem.file.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {(fileItem.file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}