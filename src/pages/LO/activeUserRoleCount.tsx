import ActiveUserRoleCountTable from '@/components/LO/Tables/ActiveUserRoleCountTable'
import { DynamicPage, DynamicPageHeader, DynamicPageTitle, MessageStrip, Title } from '@ui5/webcomponents-react'
import { ThemingParameters } from '@ui5/webcomponents-react-base'

const ActiveUserRoleCount = () => {
  return (
    <DynamicPage
    className="dynamicPage"
    headerContent={
        <></>
    }
    // headerTitle={
    //     <DynamicPageTitle
    //         expandedContent={
    //             <MessageStrip>
    //                 The License Optimization User Report page details individual license usage
    //                 and recommends actions for efficiency and cost savings.
    //             </MessageStrip>
    //         }
    //         header={<Title className="text-2xl font-bold"> Active User Role Count</Title>}
    //     ></DynamicPageTitle>
    // }
    style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
    }}
    showHideHeaderButton={false}
    headerContentPinnable={false}
>
    <ActiveUserRoleCountTable/>
</DynamicPage>
  )
}

export default ActiveUserRoleCount
