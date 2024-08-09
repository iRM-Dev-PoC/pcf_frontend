import MyAnalyticalTable from "@/components/LO/Tables/ReportTable"
import FilterBarReport from "@/components/LO/FilterBars/FilterBarReport"
import { DynamicPage, DynamicPageHeader, FilterBar, DynamicPageTitle, MessageStrip, Title } from "@ui5/webcomponents-react"
import { ThemingParameters } from "@ui5/webcomponents-react-base"

const ReportLO = () => {
  return (
    <DynamicPage
    className="dynamicPage"
    headerContent={
        <DynamicPageHeader>
          <FilterBarReport/>
        </DynamicPageHeader>
    }
    headerTitle={
        <DynamicPageTitle
            expandedContent={
                <MessageStrip>
                    The License Optimization Report page highlights software license usage and
                    offers actionable recommendations to maximize efficiency and cost-effectiveness.
                </MessageStrip>
            }
            header={<Title className="text-2xl font-bold">Report</Title>}
        ></DynamicPageTitle>
    }
    style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
    }}
    showHideHeaderButton={false}
    headerContentPinnable={false}
>
<MyAnalyticalTable/>
</DynamicPage>
  )
}

export default ReportLO
