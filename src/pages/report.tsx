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
import ReportDetails from "../components/ReportDetails";
import { useRef } from "react";
import ReportCreationForm from "../components/ReportCreationForm";

const Report = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);
    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            Information (You can see the Report Details here.)
                        </MessageStrip>
                    }
                    header={<Title>Report</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Create"
                            icon="create"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Report Information",
                                    children: (
                                        <ReportCreationForm
                                        closeButtonref={closeButtonRoleref}
                                        />
                                    ),
                                    footer: (
                                        <Bar
                                            endContent={
                                                <>
                                                    <Button design="Emphasized">
                                                        Create
                                                    </Button>
                                                    <Button
                                                        onClick={() => close()}
                                                        design="Negative"
                                                        ref={closeButtonRoleref}
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
                            Create
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
            <ReportDetails />
        </DynamicPage>
    );
};

export default Report;
