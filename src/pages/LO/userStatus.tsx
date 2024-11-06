// import FilterBarUserReport from '@/components/LO/FilterBars/FilterBarUserReport'
import { DynamicPage, DynamicPageHeader, DynamicPageTitle, MessageStrip, Title } from '@ui5/webcomponents-react'
import { ThemingParameters } from '@ui5/webcomponents-react-base'
import UserTable from '@/components/LO/Tables/UserStatusTable'

const userStatus = () => {
  return (
    <DynamicPage
    className="dynamicPage"
    headerContent={
      <DynamicPageHeader>
        {/* <FilterBarUserReport/> */}
      </DynamicPageHeader>
  }
    headerTitle={
        <DynamicPageTitle
            expandedContent={
                <MessageStrip>
                    The License Optimization User Status page details individual license usage
                    and recommends actions for efficiency and cost savings.
                </MessageStrip>
            }
            header={<Title className="text-2xl font-bold"> User Status</Title>}
        ></DynamicPageTitle>
    }
    style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
    }}
    showHideHeaderButton={false}
    headerContentPinnable={false}
>
  <UserTable/>
</DynamicPage>
  )
}

export default userStatus
