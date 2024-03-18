import {
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Button,
	Bar,
	Modals,
	Form,
	FormItem,
	Input,
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
							tooltip="Create"
							icon="create"
							onClick={() => {
								const { close } = showDialog({
									headerText: "User Information",
									children:(
										<Form
										style={{
											alignItems: 'center'
										}}>
										<FormItem label="Name">
												<Input type="Text" />
											</FormItem>
											<FormItem label="Email">
											<Input type="Text" />
											</FormItem>		
									</Form>
									),
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
			style={{
				borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
			}}
			showHideHeaderButton={false}
			headerContentPinnable={false}>
			<ControlLogicDetails />
		</DynamicPage>
	);
};

export default ControlLogic;
