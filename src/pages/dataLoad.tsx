import { FlexBox } from "@ui5/webcomponents-react";
import SimulationDetails from "../components/SimulationDetails";
import FileUpload from "../components/FileUpload";
import Breadcrumb from "../components/Breadcrumb";

const DataLoad = () => {
	return (
		<>
			<Breadcrumb />
			<FlexBox
				style={{ paddingBlock: "1rem", paddingInline: "1rem", margin: "1rem" }}
				wrap="Wrap"
				className="flex-col gap-2 md:flex-row">
				<div>
					<SimulationDetails />
				</div>
				<div>
					<FileUpload />
				</div>
			</FlexBox>
		</>
	);
};

export default DataLoad;
