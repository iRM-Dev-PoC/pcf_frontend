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
import { useState, useEffect } from "react";
import { Card, CardHeader, FileUploader } from "@ui5/webcomponents-react";
import JSZip from "jszip";

const FileUpload = () => {
  const [extractedFiles, setExtractedFiles] = useState<
    { name: string; content: string }[]
  >([]);

  const handleFileUpload = (event: CustomEvent) => {
    const files: File[] = event.detail.files;

    if (files.length > 0) {
      const uploadedFile = files[0];
      const fileType = uploadedFile.type;

      if (fileType === "application/zip") {
        const reader = new FileReader();
        reader.onload = function (event) {
          if (event.target) {
            const arrayBuffer = event.target.result;

            const zip = new JSZip();
            const extractedFilesData: { name: string; content: string }[] = [];

            zip.loadAsync(arrayBuffer).then(function (zip) {
              const promises: Promise<void>[] = [];

              zip.forEach((relativePath, zipEntry) => {
                const promise = zipEntry.async("text").then(function (content) {
                  extractedFilesData.push({ name: relativePath, content });
                });
                promises.push(promise);
              });

              Promise.all(promises)
                .then(() => {
                  setExtractedFiles(extractedFilesData);
                })
                .catch((error) => {
                  console.error("Error extracting zip file:", error);
                });
            });
          }
        };
        reader.readAsArrayBuffer(uploadedFile);
      } else {
        console.log("Uploaded file is of type:", fileType);
      }
    }
  };

  useEffect(() => {
    console.log("useffect triggered with extractedFiles:",extractedFiles); 
  }, [extractedFiles]); 

  return (
    <Card
      header={<CardHeader titleText="File Upload" />}
      style={{ width: "300px", height: "200px" }}
      className="m-5"
    >
      <FileUploader
        accept=".csv,.zip,.xls,.xml,.xlsx"
        onChange={handleFileUpload}
        valueState="None"
        className="m-5"
        placeholder="Drop file for upload"
      />
      <ul>
        {extractedFiles.map((file, index) => (
          <li key={file.name + index}>
            <strong>{file.name}</strong>
            <pre>{file.content}</pre>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default FileUpload;
