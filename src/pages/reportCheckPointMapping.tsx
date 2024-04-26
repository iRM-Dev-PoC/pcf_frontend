import {
	Bar,
	Button,
	ButtonDomRef,
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Modals,
	Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import AddReportCheckPointMapping from "../components/AddReportCheckPointMapping";
import { useRef } from "react";
// import ReportCheckPointMappingCreationForm from "../components/ReportCheckPointMappingCreationForm";

const ReportCheckPointMapping = () => {
	const showDialog = Modals.useShowDialog();
	const closeButtonMappingref = useRef<ButtonDomRef>(null);
	return (
		<DynamicPage
			headerTitle={
				<DynamicPageTitle
					expandedContent={
						<MessageStrip>
							Information (You can see the ReportCheckPointMapping Details
							here.)
						</MessageStrip>
					}
					header={<Title>Report Check-Point Mapping</Title>}
					actions={
						<Button
							design="Emphasized"
							tooltip="Create"
							icon="create"
							onClick={() => {
								const { close } = showDialog({
									headerText: "Report Check-Point Mapping Information",
									children: (
										// <ReportCheckPointMappingCreationForm closeButtonMappingref={closeButtonMappingref} />
										<div>Hi</div>
									),
									footer: (
										<Bar
											endContent={
												<>
													<Button
														onClick={() => close()}
														design="Negative"
														ref={closeButtonMappingref}>
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
			<AddReportCheckPointMapping />
		</DynamicPage>
	);
};

export default ReportCheckPointMapping;
