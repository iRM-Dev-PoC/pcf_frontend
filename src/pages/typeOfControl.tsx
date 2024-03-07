import {
	Bar,
	Button,
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Modals,
	Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import TypeOfControlDetails from "../components/TypeOfControlDetails";

const TypeOfControl = () => {
	const showDialog = Modals.useShowDialog();
	return (
		<DynamicPage
			headerTitle={
				<DynamicPageTitle
					expandedContent={
						<MessageStrip>
							Information (You can see the type of controls you have here.)
						</MessageStrip>
					}
					header={<Title>Type Of Controls</Title>}
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
			<TypeOfControlDetails />
		</DynamicPage>
	);
};

export default TypeOfControl;
