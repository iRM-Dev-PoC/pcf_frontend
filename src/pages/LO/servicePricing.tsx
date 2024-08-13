import ServicePricingTable from '@/components/LO/Tables/ServicePricingTable'
import { DynamicPage, DynamicPageHeader, DynamicPageTitle, MessageStrip, Title } from '@ui5/webcomponents-react'
import { ThemingParameters } from '@ui5/webcomponents-react-base'

const ServicePricing = () => {
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
            header={<Title className="text-2xl font-bold">Service Pricing</Title>}
        ></DynamicPageTitle>
    }
    style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
    }}
    showHideHeaderButton={false}
    headerContentPinnable={false}
>
    <ServicePricingTable/>
</DynamicPage>
  )
}

export default ServicePricing
