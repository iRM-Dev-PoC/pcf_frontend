import {
	Title,
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Button,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";

import ControlFamilyDetails from "../components/ControlFamilyDetails";

const ControlFamily = () => {
	return (
		<DynamicPage
			headerTitle={
				<DynamicPageTitle
					expandedContent={
						<MessageStrip>
							Information (You can see the Control Family Details and when these
							are created & by whom.)
						</MessageStrip>
					}
					header={<Title>Control Family Details</Title>}
					actions={
						<div>
							<Button
								design="Emphasized"
								icon="create"
								onClick={function _a() {}}>
								Create
							</Button>
						</div>
					}
					snappedContent={
						<MessageStrip>
							Information (only visible if header content is collapsed/snapped)
						</MessageStrip>
					}></DynamicPageTitle>
			}
			onPinnedStateChange={function _a() {}}
			onToggleHeaderContent={function _a() {}}
			style={{
				maxHeight: "700px",
				borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
			}}
			showHideHeaderButton={false}
			headerContentPinnable={false}>
			<ControlFamilyDetails />
		</DynamicPage>
	);
};

export default ControlFamily;
