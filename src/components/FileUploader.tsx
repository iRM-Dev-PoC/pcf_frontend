/* eslint-disable no-useless-catch */
import { useQueryClient } from "@tanstack/react-query";
import { Button, ButtonDomRef } from "@ui5/webcomponents-react";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const FileUploaderComponent = ({
    closeButtonref,
}: {
    closeButtonref: React.RefObject<ButtonDomRef>;
}) => {
    // const [files, setFiles] = useState<File[]>([]);
    // const [children] = useState<JSX.Element[]>([]);
    // const [data, setData] = useState<FormData | null>(null);
    // const uploadref = useRef<ButtonDomRef>(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(false);
    const queryClient = useQueryClient();

    // added by Racktim Guin
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };
    // ends

    // const handleDelete = (
    //     event: Ui5CustomEvent<
    //         UploadCollectionDomRef,
    //         UploadCollectionItemDeleteEventDetail
    //     >
    // ) => {
    //     const itemToDelete = event.detail.item;
    //     const updatedFiles = files.filter(
    //         (file) => file.name !== itemToDelete.textContent
    //     );
    //     setFiles(updatedFiles);
    // };

    // const handleDrop = (e: {
    //     preventDefault: () => void;
    //     dataTransfer: { files: Iterable<File> | ArrayLike<File> };
    // }) => {
    //     e.preventDefault();
    //     const filesArray = Array.from(e.dataTransfer.files) as File[];
    //     setFiles(filesArray);
    // };

    const handleUpload = async () => {
        try {
            // setIsLoading(true);
            if (!selectedFiles) {
                throw "Please select at least one file!";
            }
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                console.log(selectedFiles[i]);
                formData.append(
                    `files`,
                    selectedFiles[i],
                    selectedFiles[i].name
                );
            }

            await uploadFile(formData);
        } catch (error) {
            throw error;
        }
    };

    async function uploadFile(uploadData: FormData) {
        console.log("uploading");

        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dataload/upload-and-store`;
        try {
            // setIsLoading(true);
            const reqBody = uploadData;
            reqBody.append("CUST_ID", "1");
            const response = await axios.post(endPoint, reqBody);
            return response.data;
        } catch (error) {
            console.error(error);
            throw "Please select at least one file!";
        }
    }

    const upload = async () => {
        await toast.promise(handleUpload(), {
            loading: "Uploading file...",
            success: "File uploaded successfully!",
            error: (error) => `${error}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allHeaderData", "allHeaderDataContext"],
        });
        await queryClient.invalidateQueries({
            queryKey: ["allHeaderDataContext"],
        });
        closeButtonref.current?.click();
    };

    return (
        <>
            {/* <FileUploader
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
                <Button icon="upload" disabled={isLoading} ref={uploadref}>
                    Upload file
                </Button>
            </FileUploader>

            <div>
                <UploadCollection
                    onChange={handleFileChange}
                    onDrop={handleDrop}
                    onItemDelete={handleDelete}
                >
                    {children}
                    {files.map((file, index) => (
                        <UploadCollectionItem
                            onChange={handleFileChange}
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
            </div> */}
            <input type="file" multiple onChange={handleFileChange} />
            <Button onClick={upload}>Upload Files</Button>
            {/* <div>
                <Button disabled={isLoading} onClick={() => handleUpload}>
                    Test Upload
                </Button>
            </div> */}
        </>
    );
};

export default FileUploaderComponent;
