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
import TypeOfControlDetails from "../components/TypeOfControlDetails";
// import FileUpload from "../components/SoD/FileUpload";
import ControlCreationForm from "../components/ControlCreationForm";
import { useRef } from "react";

const TypeOfControl = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);

    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            Information (You can see the type of controls you
                            have here.)
                        </MessageStrip>
                    }
                    header={<Title>Type Of Controls</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Create"
                            icon="create"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Type of Controls Details",
                                    children: (
                                        <>
                                            <ControlCreationForm
                                                closeButtonref={
                                                    closeButtonRoleref
                                                }
                                            />
                                        </>
                                    ),
                                    footer: (
                                        <Bar
                                            endContent={
                                                <>
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
            <TypeOfControlDetails />
            {/* <div>
                <FileUpload />
            </div> */}
        </DynamicPage>
    );
};

export default TypeOfControl;
