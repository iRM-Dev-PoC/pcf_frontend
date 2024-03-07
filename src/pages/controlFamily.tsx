// import Breadcrumb from "../components/Breadcrumb";

// const ControlFamily = () => {
// 	return (
// 		<div>
// 			<Breadcrumb />
// 			ControlFamily
// 		</div>
// 	);
// };

// export default ControlFamily;
import {
  Title,
  DynamicPage,
  DynamicPageTitle,
  DynamicPageHeader,
  MessageStrip,
  Button,
  Modals,
  Bar,
} from "@ui5/webcomponents-react";
import {
  ThemingParameters,
  CssSizeVariables,
  CompactSizes,
  CozySizes,
} from "@ui5/webcomponents-react-base";

import ControlFamilyDetails from "../components/ControlFamilyDetails";

const ControlFamily = () => {
  const showDialog = Modals.useShowDialog();
  return (
    <DynamicPage
      headerContent={<DynamicPageHeader></DynamicPageHeader>}
      headerTitle={
        <DynamicPageTitle
          expandedContent={
            <MessageStrip>
              Information (You can see the Control Family Details and when these are created & by whom.)
            </MessageStrip>
          }
          header={<Title>Control Family Details</Title>}
          actions={
						<div>
            <Button
  design="Emphasized"
  icon="create"
  onClick={function _a(){}}
>
  Create
</Button>
			    </div>
          }
          snappedContent={
            <MessageStrip>
              Information (only visible if header content is collapsed/snapped)
            </MessageStrip>
          }
        ></DynamicPageTitle>
      }
      onPinnedStateChange={function _a() {}}
      onToggleHeaderContent={function _a() {}}
      style={{
        maxHeight: "700px",
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
      }}
      showHideHeaderButton={false}
      headerContentPinnable={false}
    >
      <ControlFamilyDetails/>
    </DynamicPage>
  );
};

export default ControlFamily;