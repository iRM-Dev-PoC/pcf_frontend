// import FileUploaderComponent from "@/components/FileUploader";
import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";
import {
    Bar,
    Button,
    ButtonDomRef,
    DynamicPage,
    DynamicPageTitle,
    MessageStrip,
    Modals,
    Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { useRef } from "react";

const syncUserData = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonref = useRef<ButtonDomRef>(null);

    return (
        <DynamicPage
            className="dynamicPage"
            headerTitle={
                <DynamicPageTitle
                    header={<Title>Sync User Details</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Upload"
                            icon="upload-to-cloud"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Click to select a file",
                                    // children: (
                                    //     <FileUploaderComponent
                                    //         closeButtonref={closeButtonref}
                                    //     />
                                    // ),
                                    footer: (
                                        <Bar
                                            endContent={
                                                <>
                                                    <Button
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
                           The SAP BTP License Optimization sync reports retrieve user details, roles, activity logs, and license consumption data from SAP BTP to ensure accurate and up-to-date license allocations within the License Optimization app.
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
           
        </DynamicPage>
    );
};

export default syncUserData;
