// import { FlexBox } from "@ui5/webcomponents-react";
// import Breadcrumb from "../components/Breadcrumb";
// import ControlDetails from "../components/ControlDetails";

// const ControlAttribute = () => {
// 	return (

// 		<>
// 		<div>
// 			<Breadcrumb />
// 		</div>
// 		<FlexBox
// 		style={{ paddingBlock: "1rem", paddingInline: "1rem", margin: "1rem" }}
// 			wrap="Wrap"
// 			className="flex-col gap-2 md:flex-row "
//         >
// 			<div>
//       <ControlDetails/>
//       </div>
			
// 			</FlexBox></>
// 	);
// };

// export default ControlAttribute;

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
  CssSizeVariablesNames,
} from "@ui5/webcomponents-react-base";
import ControlAttributeDetails from "../components/ControlAttributeDetails";

const ControlAttribute = () => {
  const showDialog = Modals.useShowDialog();
  return (
    <DynamicPage
      headerContent={<DynamicPageHeader></DynamicPageHeader>}
      headerTitle={
        <DynamicPageTitle
          expandedContent={
            <MessageStrip>
              Information (You can see the Control Attribute Details and create ,update new
              details.)
            </MessageStrip>
          }
          header={<Title>Control Attribute Details</Title>}
          actions={
						<div>
				 <Button
 design="Default"
 icon="create"
 onClick={function _a(){const { close } = showDialog({
	headerText: "Modal Title",
	children: "Dialog",
	footer: (
		<Bar
			endContent={
				<>
					<Button design="Emphasized">create</Button>
					<Button onClick={() => close()} design="Negative">
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
			 </div>
          }
          snappedContent={
            <MessageStrip>
              Information (only visible if header content is collapsed/snapped)
            </MessageStrip>
          }
          // subHeader={<Label>This is a sub header</Label>}
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
      <ControlAttributeDetails/>
    </DynamicPage>
  );
};

export default ControlAttribute;
