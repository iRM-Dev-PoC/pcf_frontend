import FilterBarReport from "@/components/LO/FilterBars/FilterBarReport"
import UserDrillDownTemplate from "@/components/LO/Tables/UserDrillDownTemplate"
import UserDrill from "@/components/LO/Tables/xyz"
import { DynamicPage, DynamicPageHeader, DynamicPageTitle, MessageStrip, Title } from "@ui5/webcomponents-react"
import { ThemingParameters } from "@ui5/webcomponents-react-base"

const userDrillDown = () => {
  return (
    <DynamicPage
    className="dynamicPage"
    headerTitle={
        <DynamicPageTitle
            // expandedContent={
            //     <MessageStrip>
            //         The License Optimization Report page highlights software license usage and
            //         offers actionable recommendations to maximize efficiency and cost-effectiveness.
            //     </MessageStrip>
            // }
            header={<Title className="text-2xl font-bold">User Drill Down Report</Title>}
        ></DynamicPageTitle>
    }
    style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
    }}
    showHideHeaderButton={false}
    headerContentPinnable={false}
>
  <UserDrillDownTemplate/>
  {/* <UserDrill/> */}
</DynamicPage>
  )
}

export default userDrillDown


