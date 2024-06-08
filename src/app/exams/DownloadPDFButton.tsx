"use client"

import React from 'react';
import { saveAs } from 'file-saver';
import { Button } from '../../components/ui/button';
import { marks } from '@/lib/data';
const DownloadPDFButton: React.FC = () => {
  const handleDownload = async () => {
    const data = marks
    
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    saveAs(blob, 'generated.pdf');
  };

  return (
    <Button onClick={handleDownload}>Download PDF</Button>
  );
};

export default DownloadPDFButton;
