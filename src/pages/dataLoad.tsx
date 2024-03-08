import {
	Title,
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Button,
	Modals,
	Bar,
	FileUploader,
} from "@ui5/webcomponents-react";
import SimulationDetails from "../components/SimulationDetails";

import { ThemingParameters } from "@ui5/webcomponents-react-base";

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
									headerText: "Select a file to upload",
									children: (
										<FileUploader
											onChange={function _a() {}}
											valueState="None"
											placeholder="Upload Files"
										/>
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
			onPinnedStateChange={function _a() {}}
			onToggleHeaderContent={function _a() {}}
			style={{
				maxHeight: "700px",
				borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
			}}
			showHideHeaderButton={false}
			headerContentPinnable={false}>
			<SimulationDetails />
		</DynamicPage>
	);
};

export default DataLoad;
