import {
    Title,
    DynamicPage,
    DynamicPageTitle,
    MessageStrip,
    Button,
    Modals,
    Bar,
    Form,
    FormItem,
    Input,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import ControlAttributeDetails from "../components/ControlAttributeDetails";

const ControlAttribute = () => {
    const showDialog = Modals.useShowDialog();
    const showEditDialog = Modals.useShowDialog();
    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            Information (You can see the Control Attribute
                            Details and create ,update new details.)
                        </MessageStrip>
                    }
                    header={<Title>Control Attribute Details</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Create"
                            icon="create"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "User Information",
                                    children: (
                                        <Form
                                            style={{
                                                alignItems: "center",
                                            }}
                                        >
                                            <FormItem label="Name">
                                                <Input type="Text" />
                                            </FormItem>
                                            <FormItem label="Email">
                                                <Input type="Text" />
                                            </FormItem>
                                        </Form>
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
            <ControlAttributeDetails showEditDialog={showEditDialog} />
        </DynamicPage>
    );
};

export default ControlAttribute;
