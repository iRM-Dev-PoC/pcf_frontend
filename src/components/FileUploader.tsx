import { UploadCollectionItemDeleteEventDetail } from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import {
    Button,
    ButtonDomRef,
    FileUploader,
    Icon,
    Text,
    Ui5CustomEvent,
    UploadCollection,
    UploadCollectionDomRef,
    UploadCollectionItem,
} from "@ui5/webcomponents-react";
import { useRef, useState } from "react";

const FileUploaderComonent = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [children] = useState<JSX.Element[]>([]);
    const uploadref = useRef<ButtonDomRef>(null);
    // const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
    // const [formData, setFormData] = useState<FormData | null>(null);

    // console.log("selectedFileNames", selectedFileNames);
    // console.log("formData", formData);

    const handleUpload = () => {
        // handleFileUpload();
    };
    console.log(files);

    const handleDelete = (
        event: Ui5CustomEvent<
            UploadCollectionDomRef,
            UploadCollectionItemDeleteEventDetail
        >
    ) => {
        const itemToDelete = event.detail.item;
        const updatedFiles = files.filter(
            (file) => file.name !== itemToDelete.textContent
        );
        setFiles(updatedFiles);
    };

    const handleDrop = (e: {
        preventDefault: () => void;
        dataTransfer: { files: Iterable<File> | ArrayLike<File> };
    }) => {
        e.preventDefault();
        const filesArray = Array.from(e.dataTransfer.files) as File[];
        setFiles(filesArray);
    };

    return (
        <>
            <FileUploader
                // hidden
                hideInput
                onChange={(event) => {
                    const files = event.target.files;
                    if (files !== null) {
                        setFiles(Array.from(files));
                    }
                }}
                valueState="None"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, application/xml"
            >
                <Button icon="upload" onClick={handleUpload} ref={uploadref}>
                    Upload file
                </Button>
            </FileUploader>

            <div>
                <UploadCollection
                    onDrop={handleDrop}
                    onItemDelete={handleDelete}
                >
                    {children}
                    {files.map((file, index) => (
                        <UploadCollectionItem
                            key={index}
                            fileNameClickable={false}
                            hideRetryButton
                            hideTerminateButton
                            uploadState="Ready"
                            thumbnail={<Icon name="document" />}
                        >
                            <Text>{file.name}</Text>
                        </UploadCollectionItem>
                    ))}
                </UploadCollection>
            </div>
        </>
    );
};

export default FileUploaderComonent;
