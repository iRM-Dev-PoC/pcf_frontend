//! Working but to display the file name in the modal, modal has to be reopened

import { useQueryClient } from "@tanstack/react-query";
import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";
import {
    Bar,
    Button,
    ButtonDomRef,
    DynamicPage,
    DynamicPageTitle,
    FileUploader,
    IllustratedMessage,
    MessageStrip,
    Modals,
    Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import SimulationDetails from "../components/SimulationDetails";
import SimulateUploadComponent from "../components/FileUploader";

const DataLoad = () => {
    const showDialog = Modals.useShowDialog();
    const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const closeButtonref = useRef<ButtonDomRef>(null);
    const queryClient = useQueryClient();

    const handleClear = () => {
        setSelectedFileNames([]);
        setFormData(null);
    };

    async function uploadFile(uploadData: FormData) {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dataload/upload-and-store`;
        try {
            setIsLoading(true);
            const reqBody = uploadData;
            reqBody.append("CUST_ID", "1");
            const response = await axios.post(endPoint, reqBody);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
            closeButtonref.current?.click();
        }
    }

    const handleFileUpload = async (uploadData: FormData) => {
        await toast.promise(uploadFile(uploadData), {
            loading: "Uploading file(s)...",
            success: "File(s) uploaded successfully!",
            error: (error) => `Failed to upload file(s): ${error.message}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allHeaderData"],
        });
    };

    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            Information (You can see the Synced Details and
                            Upload new transactional data.)
                        </MessageStrip>
                    }
                    header={<Title>Data Synchronization Details</Title>}
                    actions={
                        <Button
                            disabled={isLoading}
                            design="Emphasized"
                            tooltip="Upload"
                            icon="upload-to-cloud"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Click to select a file",
                                    children: (
                                        <>
                                            <FileUploader
                                                disabled={isLoading}
                                                key={selectedFileNames.join(
                                                    ","
                                                )}
                                                hideInput
                                                multiple={true}
                                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, application/xml"
                                                onChange={(event) => {
                                                    const files =
                                                        event.target.files;

                                                    if (
                                                        files &&
                                                        files.length > 0
                                                    ) {
                                                        const fileNames =
                                                            Array.from(
                                                                files
                                                            ).map(
                                                                (file) =>
                                                                    file.name
                                                            );

                                                        setSelectedFileNames(
                                                            fileNames
                                                        );
                                                        const formData =
                                                            new FormData();
                                                        Array.from(
                                                            files
                                                        ).forEach((file) => {
                                                            formData.append(
                                                                "files",
                                                                file
                                                            );
                                                        });
                                                        setFormData(formData);
                                                    } else {
                                                        setSelectedFileNames(
                                                            []
                                                        );
                                                        setFormData(null);
                                                    }
                                                }}
                                                valueState="None"
                                            >
                                                <IllustratedMessage name="UploadToCloud">
                                                    <h4 slot="title">
                                                        Select file(s) to
                                                        upload. Accepted file
                                                        types are: .csv, .xls,
                                                        .xlsx, .xml
                                                    </h4>
                                                    <p
                                                        className="text-wrap text-sm font-bold"
                                                        slot="subtitle"
                                                    >
                                                        {selectedFileNames.length >
                                                        0
                                                            ? selectedFileNames.join(
                                                                  ", "
                                                              )
                                                            : "Select file(s)"}
                                                    </p>
                                                </IllustratedMessage>
                                            </FileUploader>
                                        </>
                                    ),
                                    footer: (
                                        <Bar
                                            endContent={
                                                <>
                                                    <Button
                                                        disabled={isLoading}
                                                        className="mx-2 gap-x-4"
                                                        icon="upload-to-cloud"
                                                        design="Positive"
                                                        onClick={() => {
                                                            if (formData) {
                                                                handleFileUpload(
                                                                    formData
                                                                );
                                                            } else {
                                                                console.error(
                                                                    "No files selected"
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Upload
                                                    </Button>
                                                    <Button
                                                        disabled={isLoading}
                                                        className="mx-3 gap-x-4"
                                                        design="Attention"
                                                        onClick={handleClear}
                                                    >
                                                        Clear
                                                    </Button>
                                                    <Button
                                                        disabled={isLoading}
                                                        ref={closeButtonref}
                                                        onClick={() => close()}
                                                        design="Negative"
                                                    >
                                                        Close
                                                    </Button>
                                                </>
                                            }
                                        ></Bar>
                                    ),
                                });
                            }}
                        >
                            Upload
                        </Button>
                    }
                    snappedContent={
                        <MessageStrip>
                            Information (only visible if header content is
                            collapsed/snapped)
                        </MessageStrip>
                    }
                ></DynamicPageTitle>
            }
            style={{
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <SimulationDetails />
            <SimulateUploadComponent />
        </DynamicPage>
    );
};

export default DataLoad;
