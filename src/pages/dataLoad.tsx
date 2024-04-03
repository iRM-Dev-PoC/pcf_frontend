//! Working but to display the file name in the modal, modal has to be reopened

import { useState } from "react";
import {
    Title,
    DynamicPage,
    DynamicPageTitle,
    MessageStrip,
    Button,
    Modals,
    Bar,
    FileUploader,
    IllustratedMessage,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";
import SimulationDetails from "../components/SimulationDetails";
import fileUpload from "../lib/fileUpload";
import { uploadFileType } from "../utils/types";

const DataLoad = () => {
    const showDialog = Modals.useShowDialog();
    const showToast = Modals.useShowToast();
    const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData | null>(null);

    const handleClear = () => {
        setSelectedFileNames([]);
        setFormData(null);
    };

    async function uploadFile(uploadData: uploadFileType) {
        const response = await fileUpload(uploadData);
        if (response) {
            showToast({
                children: "File(s) uploaded successfully",
            });
            handleClear();
        } else {
            showToast({
                children: "Error uploading file(s)",
            });
        }
    }

    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            Information (You can see the Syned Details and
                            Upload new transactional data.)
                        </MessageStrip>
                    }
                    header={<Title>Data Synchronization Details</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Upload"
                            icon="upload-to-cloud"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Click to select a file",
                                    children: (
                                        <>
                                            <FileUploader
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
                                                        className="ml-2 mr-2 gap-x-4"
                                                        icon="upload-to-cloud"
                                                        design="Positive"
                                                        onClick={() => {
                                                            if (formData) {
                                                                uploadFile({
                                                                    data: formData,
                                                                });
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
                                                        className="ml-3 mr-3 gap-x-4"
                                                        design="Attention"
                                                        onClick={handleClear}
                                                    >
                                                        Clear
                                                    </Button>
                                                    <Button
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
        </DynamicPage>
    );
};

export default DataLoad;
