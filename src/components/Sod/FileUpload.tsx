// import { Card, CardHeader, FileUploader } from "@ui5/webcomponents-react"


// const FileUpload = () => {
//   return (
// <Card
//   header={<CardHeader   titleText="File Upload"/>}
//   style={{
//     width: '300px', height:"200px"
//   }}
//   className="m-5 "
// >

// <FileUploader
//       accept=".csv,.zip,.xls,.xml,.xlsx"
//   onChange={function _a(){}}
//    valueState="None"
//    className="m-5"
//    placeholder="Drop file for upload"
//    />
// </Card>
//   )
// }
// export default FileUpload;

import { Card, CardHeader, FileUploader } from "@ui5/webcomponents-react";
const FileUpload = () => {
  const handleFileUpload = (event :CustomEvent) => {
    const files = event.detail.files;

    if (files.length > 0) {
      const uploadedFile = files[0];
      const fileType = uploadedFile.type;

      if (fileType === "application/zip") {
        console.log("Uploaded file is a zip file.");
      } else {
        console.log("Uploaded file is of type:", fileType);
      }
    }
  };
  return (
    <Card
      header={<CardHeader titleText="File Upload"/>}
      style={{ width: '300px', height: "200px" }}
      className="m-5"
    >
      <FileUploader
        accept=".csv,.zip,.xls,.xml,.xlsx"
        onChange={handleFileUpload}
        valueState="None"
        className="m-5"
        placeholder="Drop file for upload"
      />
    </Card>
  );
};

export default FileUpload;



