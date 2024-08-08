"use client";

import React, { useState } from 'react'
import FireUpload from './fire-upload/page'

export default function page() {

  const [downloadUrl, setDownloadUrl] = useState<string|null>("");

  return (
    <div className="px-10 py-5">
      <h1 className="text-2xl font-medium">Firebase Upload File Demo</h1>
      <FireUpload
        setDownloadUrl={setDownloadUrl}
      />
      <p className="mt-5">
        Download URL: {downloadUrl}
      </p>
    </div>
  )
}
