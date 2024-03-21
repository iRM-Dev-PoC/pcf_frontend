import {
	Bar,
	Button,
	DynamicPage,
	DynamicPageTitle,
	Form,
	FormItem,
	Input,
	MessageStrip,
	Modals,
	Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import TypeOfControlDetails from "../components/TypeOfControlDetails";
import FileUpload from "../components/Sod/FileUpload";

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
							tooltip="Create"
							icon="create"
							onClick={() => {
								const { close } = showDialog({
									headerText: "Type of Controls Details",
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
			<TypeOfControlDetails />
			<div>

			<FileUpload/>
			</div>
		</DynamicPage>
	);
};

export default TypeOfControl;
