import SubscriptionCreationForm from '@/components/LO/Forms/SubscriptionCreationForm';
import SubscriptionTypeTable from '@/components/LO/Tables/SubscriptionTypeTable'
import { Bar, Button, ButtonDomRef, DynamicPage, DynamicPageHeader, DynamicPageTitle, MessageStrip, Modals, Title } from '@ui5/webcomponents-react'
import { ThemingParameters } from '@ui5/webcomponents-react-base'
import { useRef } from 'react';

const SubscriptionType = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonref = useRef<ButtonDomRef>(null);
  return (
    <DynamicPage
    className="dynamicPage"
    headerContent={
        <DynamicPageHeader>
        </DynamicPageHeader>
    }
    headerTitle={
        <DynamicPageTitle
            expandedContent={
                <MessageStrip>
                    The License Optimization User Report page details individual license usage
                    and recommends actions for efficiency and cost savings.
                </MessageStrip>
            }
            header={<Title className="text-2xl font-bold">Subscription Type</Title>}
            actions={
                <Button
                    design="Emphasized"
                    tooltip="Upload"
                    icon="create-session"
                    onClick={() => {
                        const { close } = showDialog({
                            headerText: "Create Subscription",
                            children:<SubscriptionCreationForm/>,
                            footer: (
                                <Bar
                                startContent={<> 
                                <Button
                                    design="Positive"
                                > 
                                Create
                                </Button></>}
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
                    Create
                </Button>
            }
        ></DynamicPageTitle>
    }
    style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
    }}
    showHideHeaderButton={false}
    headerContentPinnable={false}
>
    <SubscriptionTypeTable/>
</DynamicPage>
  )
}

export default SubscriptionType
