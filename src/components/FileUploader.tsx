import { UploadCollectionItemDeleteEventDetail } from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import {
    Icon,
    Text,
    Ui5CustomEvent,
    UploadCollection,
    UploadCollectionDomRef,
    UploadCollectionItem,
} from "@ui5/webcomponents-react";
import { useState } from "react";

const FileUploader = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [children] = useState<JSX.Element[]>([]);

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
        <UploadCollection onDrop={handleDrop} onItemDelete={handleDelete}>
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
    );
};

export default FileUploader;
