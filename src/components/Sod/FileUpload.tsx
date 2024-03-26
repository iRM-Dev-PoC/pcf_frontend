// import { Card, CardHeader, FileUploader } from "@ui5/webcomponents-react";
// const FileUpload = () => {
//   const handleFileUpload = (event :CustomEvent) => {
//     const files = event.detail.files;

//     if (files.length > 0) {
//       const uploadedFile = files[0];
//       const fileType = uploadedFile.type;

//       if (fileType === "application/zip") {
//         console.log("Uploaded file is a zip file.");
//       } else {
//         console.log("Uploaded file is of type:", fileType);
//       }
//     }
//   };
//   return (
//     <Card
//       header={<CardHeader titleText="File Upload"/>}
//       style={{ width: '300px', height: "200px" }}
//       className="m-5"
//     >
//       <FileUploader
//         accept=".csv,.zip,.xls,.xml,.xlsx"
//         onChange={handleFileUpload}
//         valueState="None"
//         className="m-5"
//         placeholder="Drop file for upload"
//       />
//     </Card>
//   );
// };

// export default FileUpload;
import React, { useState } from 'react';
import { Card, CardHeader, FileUploader } from '@ui5/webcomponents-react';
import JSZip from 'jszip';

const FileUpload = () => {
  const [extractedFiles, setExtractedFiles] = useState<{ name: string, content: string }[]>([]);

  const handleFileUpload = (event: CustomEvent) => {
    const files: File[] = event.detail.files;

    if (files.length > 0) {
      const uploadedFile = files[0];
      const fileType = uploadedFile.type;

      if (fileType === 'application/zip') {
        const reader = new FileReader();
        reader.onload = function (event) {
          if (event.target) {
            const arrayBuffer = event.target.result;

            const zip = new JSZip();
            zip.loadAsync(arrayBuffer).then(function (zip) {
              const files: React.SetStateAction<{ name: string; content: string; }[]> = [];

              zip.forEach((relativePath, zipEntry) => {
                zipEntry.async('text').then(function (content) {
                  files.push({ name: relativePath, content });
                  if (files.length === Object.keys(zip.files).length) {
                    setExtractedFiles(files);
                  }
                });
              });
            });
          }
        };
        reader.readAsArrayBuffer(uploadedFile);
      } else {
        console.log('Uploaded file is of type:', fileType);
      }
    }
  };

  return (
    <Card
      header={<CardHeader titleText='File Upload' />}
      style={{ width: '300px', height: '200px' }}
      className='m-5'
    >
      <FileUploader
        accept='.csv,.zip,.xls,.xml,.xlsx'
        onChange={handleFileUpload}
        valueState='None'
        className='m-5'
        placeholder='Drop file for upload'
      />

      <div>
        <h2>Extracted Files:</h2>
        <ul>
          {extractedFiles.map((file, index) => (
            <li key={index}>
              <strong>{file.name}</strong>
              <pre>{file.content}</pre>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default FileUpload;
