import {
	Title,
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Button,
	Modals,
	Bar,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import ControlAttributeDetails from "../components/ControlAttributeDetails";

const ControlAttribute = () => {
	const showDialog = Modals.useShowDialog();
	return (
		<DynamicPage
			headerTitle={
				<DynamicPageTitle
					expandedContent={
						<MessageStrip>
							Information (You can see the Control Attribute Details and create
							,update new details.)
						</MessageStrip>
					}
					header={<Title>Control Attribute Details</Title>}
					actions={
						<div>
							<Button
								design="Default"
								icon="create"
								onClick={function _a() {
									const { close } = showDialog({
										headerText: "Modal Title",
										children: "Dialog",
										footer: (
											<Bar
												endContent={
													<>
														<Button design="Emphasized">create</Button>
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
						</div>
					}
					snappedContent={
						<MessageStrip>
							Information (only visible if header content is collapsed/snapped)
						</MessageStrip>
					}></DynamicPageTitle>
			}
			style={{
				borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
			}}
			showHideHeaderButton={false}
			headerContentPinnable={false}>
			<ControlAttributeDetails />
		</DynamicPage>
	);
};

export default ControlAttribute;
