import {
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Button,
	Bar,
	Modals,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import ControlLogicDetails from "../components/ControlLogicDetails";

const ControlLogic = () => {
	const showDialog = Modals.useShowDialog();

	return (
		<DynamicPage
			headerTitle={
				<DynamicPageTitle
					expandedContent={
						<MessageStrip>
							Information (You can see the control logic here.)
						</MessageStrip>
					}
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
													<Button
														onClick={() => close()}
														design="Negative">
														Close
													</Button>
												</>
											}></Bar>
									),
								});
							}}>
							Create
						</Button>
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
			<ControlLogicDetails />
		</DynamicPage>
	);
};

export default ControlLogic;
