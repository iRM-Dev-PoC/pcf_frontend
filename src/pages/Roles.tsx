// import AddRoles from "../components/AddRoles";
// import Breadcrumb from "../components/Breadcrumb";

// const Role = () => {
// 	return (
// 		<div>
// 			<Breadcrumb />
// 			<AddRoles />
// 		</div>
// 	);
// };

// export default Role;

import { Bar, Button, DynamicPage, DynamicPageHeader, DynamicPageTitle, MessageStrip, Modals, Title } from "@ui5/webcomponents-react";
// import Breadcrumb from "../components/Breadcrumb";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import AddRoles from "../components/AddRoles";

const Roles = () => {
	const showDialog = Modals.useShowDialog();
	return (

    <DynamicPage
      headerContent={<DynamicPageHeader></DynamicPageHeader>}
      headerTitle={
        <DynamicPageTitle
          expandedContent={
            <MessageStrip>
              Information (You can see the Report Details here.)
            </MessageStrip>
          }
          header={<Title>Report</Title>}
          actions={
						<Button
						design="Emphasized"
						tooltip="Upload"
						icon="create"
						onClick={() => {
							const { close } = showDialog({
								headerText: "Modal Title",
								children: "Dialog",
								footer: (
									<Bar
										endContent={
											<>
												<Button design="Emphasized">Create</Button>
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
			<AddRoles />
		</DynamicPage>

	);
};

export default Roles;
