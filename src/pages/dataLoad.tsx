// import { FlexBox } from "@ui5/webcomponents-react";
// import SimulationDetails from "../components/SimulationDetails";
// import FileUpload from "../components/FileUpload";
// import Breadcrumb from "../components/Breadcrumb";

// const DataLoad = () => {
// 	return (
// 		<>
// 			<Breadcrumb />
// 			<FlexBox
// 				style={{ paddingBlock: "1rem", paddingInline: "1rem", margin: "1rem" }}
// 				wrap="Wrap"
// 				className="flex-col gap-2 md:flex-row">
// 				<div>
// 					<SimulationDetails />
// 				</div>
// 				<div>
// 					<FileUpload />
// 				</div>
// 			</FlexBox>
// 		</>
// 	);
// };

// export default DataLoad;

import {
	Title,
	DynamicPage,
	DynamicPageTitle,
	DynamicPageHeader,
	MessageStrip,
	Button,
	Modals,
	Bar,
	FileUploader,
} from "@ui5/webcomponents-react";
import SimulationDetails from "../components/SimulationDetails";
// import FileUpload from "../components/FileUpload";

import { ThemingParameters } from "@ui5/webcomponents-react-base";

const DataLoad = () => {
	const showDialog = Modals.useShowDialog();
	return (
		<DynamicPage
			headerContent={<DynamicPageHeader></DynamicPageHeader>}
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
									headerText: "Modal Title",
									children: "Dialog",
									footer: (
										<Bar
											endContent={
												<>
													<FileUploader
														onChange={function _a() {}}
														valueState="None"
														placeholder="Upload Files"
													/>
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
					}
					// subHeader={<Label>This is a sub header</Label>}
				></DynamicPageTitle>
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
