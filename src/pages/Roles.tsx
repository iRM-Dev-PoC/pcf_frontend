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
import AddRoles from "../components/AddRoles";

const Roles = () => {
	const showDialog = Modals.useShowDialog();
	return (
		<DynamicPage
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
							tooltip="Create"
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
			style={{
				borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
			}}
			showHideHeaderButton={false}
			headerContentPinnable={false}>
			<AddRoles />
		</DynamicPage>
	);
};

export default Roles;
