import {
	Title,
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Button,
	Modals,
	Bar,
	FileUploader,
	IllustratedMessage,
} from "@ui5/webcomponents-react";
import SimulationDetails from "../components/SimulationDetails";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";

const DataLoad = () => {
	const showDialog = Modals.useShowDialog();

	return (
		<DynamicPage
			headerTitle={
				<DynamicPageTitle
					expandedContent={
						<MessageStrip>
							Information (You can see the Syned Details and Upload new
							transactional data.)
						</MessageStrip>
					}
					header={<Title>Data Synchronization Details</Title>}
					actions={
						<Button
							design="Emphasized"
							tooltip="Upload"
							icon="upload-to-cloud"
							onClick={() => {
								const { close } = showDialog({
									headerText: "Click to select a file",
									children: (
										<FileUploader
											hideInput
											accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls"
											onChange={function _a() {}}
											valueState="None">
											<IllustratedMessage name="UploadToCloud" />
										</FileUploader>
									),
									footer: (
										<Bar
											endContent={
												<>
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
							Upload
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
			<SimulationDetails />
		</DynamicPage>
	);
};

export default DataLoad;
