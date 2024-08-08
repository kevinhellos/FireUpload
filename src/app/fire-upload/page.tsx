"use client";

import React, { useState } from 'react';
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function FireUpload({
    setDownloadUrl
} : {
    setDownloadUrl:React.Dispatch<React.SetStateAction<string | null>>
}) {

  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
    } 
    else {
      setFileName(null);
      setUploadedFile(null);
    }
  };

  const handleFileUpload = () => {
    setIsLoading(true);
    if (uploadedFile) {
      const imageRef = ref(storage, `images/${fileName}_${Date.now()}`);
      uploadBytes(imageRef, uploadedFile).then(() => {
        getDownloadURL(imageRef).then((url: any) => {
          setDownloadUrl(url);
          handleDeleteFile();
          setIsLoading(false);
        });
      });
    }
  };

  const handleDeleteFile = () => {
    setIsLoading(false);
    setFileName(null);
    setUploadedFile(null);
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="mt-5">
      <label 
        htmlFor="file"
        className={`
          text-sm border px-5 py-3 rounded-md cursor-pointer hover:bg-gray-50
          ${fileName ? "bg-gray-200 hover:bg-gray-200" : ""}
        `}
      >
        Upload file
      </label>
      <input 
        type="file" 
        className="opacity-0 overflow-hidden"
        name="file" 
        id="file"
        onChange={handleFileChange}
        disabled={!!fileName}
      />
      {fileName && (
        <>
          <p className="text-sm text-gray-900 mt-3">{fileName}</p>
          <button 
            type="button"
            className="text-sm text-red-600 mt-2 border border-red-300 hover:bg-red-50 cursor-pointer rounded-md px-3 py-2"
            onClick={handleDeleteFile}
          >
            Delete
          </button>
          <button 
            type="button"
            className="text-sm text-blue-600 mt-2 border border-blue-500 hover:bg-blue-50 cursor-pointer rounded-md px-3 py-2 ms-2 disabled:cursor-not-allowed"
            onClick={handleFileUpload}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Confirm"}
          </button>
        </>
      )}
    </div>
  );
}