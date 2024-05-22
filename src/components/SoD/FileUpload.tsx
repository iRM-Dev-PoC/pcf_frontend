import { Card, CardHeader, FileUploader } from "@ui5/webcomponents-react";
import JSZip from "jszip";
import { useState } from "react";

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
                        const extractedFilesData: {
                            name: string;
                            content: string;
                        }[] = [];

                        if (!arrayBuffer) {
                            throw new Error("Array buffer is empty");
                        }

                        zip.loadAsync(arrayBuffer).then(function (zip) {
                            const promises: Promise<void>[] = [];

                            zip.forEach((relativePath, zipEntry) => {
                                const promise = zipEntry
                                    .async("text")
                                    .then(function (content) {
                                        extractedFilesData.push({
                                            name: relativePath,
                                            content,
                                        });
                                    });
                                promises.push(promise);
                            });

                            Promise.all(promises)
                                .then(() => {
                                    setExtractedFiles(extractedFilesData);
                                })
                                .catch((error) => {
                                    console.error(
                                        "Error extracting zip file:",
                                        error
                                    );
                                });
                        });
                    }
                };
                reader.readAsArrayBuffer(uploadedFile);
            }
        }
    };

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
