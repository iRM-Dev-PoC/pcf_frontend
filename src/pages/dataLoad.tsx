import FileUploaderComponent from "@/components/FileUploader";
import SimulationDetails from "@/components/SimulationDetails";
import BoxPlotChart from "@/components/v2/BoxPlotChart";
import HorizontalBoxPlotChart from "@/components/v2/HorizontalBoxPlotChart";
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

const DataLoad = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonref = useRef<ButtonDomRef>(null);

    return (
        <DynamicPage
            className="dynamicPage"
            headerTitle={
                <DynamicPageTitle
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
                                        <FileUploaderComponent
                                            closeButtonref={closeButtonref}
                                        />
                                    ),
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
                            Data synchronization is the process of ensuring that
                            data is consistent and up-to-date across multiple
                            locations or systems.
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
            {/* <BoxPlotChart/>
            <HorizontalBoxPlotChart/> */}
        </DynamicPage>
    );
};

export default DataLoad;
