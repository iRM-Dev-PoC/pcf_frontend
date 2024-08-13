import RatingReportTable from '@/components/LO/Tables/RatingReportTable'
import { DynamicPage, DynamicPageHeader, DynamicPageTitle, MessageStrip, Title } from '@ui5/webcomponents-react'
import { ThemingParameters } from '@ui5/webcomponents-react-base'

const RatingReport = () => {
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
            header={<Title className="text-2xl font-bold"> Rating Report</Title>}
        ></DynamicPageTitle>
    }
    style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
    }}
    showHideHeaderButton={false}
    headerContentPinnable={false}
>
    <RatingReportTable/>
</DynamicPage>
  )
}

export default RatingReport

