import {
	Label,
	Table,
	TableCell,
	TableColumn,
	TableRow,
	Button,
	Icon,
	TableGrowingMode,
	Input,
} from "@ui5/webcomponents-react";
import { simulateData } from "../lib/simulateData";
import { useState } from "react";
// import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
type SimulationDataProps = {
	id: string | number;
	controlAttributeName: string;
	reportName: string;
	syncAt: string;
	syncedBy: string;
	simulateAt?: string;
	simulatedBy?: string;
	isSimulated: boolean;
};

const SimulationDetails = () => {
	const [searchQuery, setSearchQuery] = useState("");
	// const currentTheme = getTheme();
	// const isDarkTheme =
	// 	currentTheme === "sap_horizon_dark" || currentTheme === "sap_horizon_hcb";

	const filteredData: SimulationDataProps[] = simulateData.filter((data) => {
		const searchData: (string | undefined)[] = [
			data.id.toString(),
			data.controlAttributeName.toLowerCase(),
			data.reportName.toLowerCase(),
			data.syncAt.toLowerCase(),
			data.syncedBy.toLowerCase(),
			data.isSimulated ? data.simulateAt?.toLowerCase() : undefined,
			data.isSimulated ? data.simulatedBy?.toLowerCase() : undefined,
		];
		const searchTerm = searchQuery.toLowerCase();
		return searchData.some((field) => field && field.includes(searchTerm));
	});

	return (
		<>
			<div className="mb-1">
				{/* ui5 searchBox */}
				<Input
					onChange={(e) => {
						const searchTerm = e.target.value;
						console.log(searchTerm);

						setSearchQuery(searchTerm);
					}}
					type="Text"
					value={searchQuery}
					style={{ height: "2rem", width: "50%", position: "relative" }}
					icon={
						<Icon
							name="search"
							className="text-center absolute z-10 inset-y-0 right-0 px-3 py-2"
						/>
					}
					placeholder="Search"
				/>

				{/* normal input */}
				{/* <input
					className={`{${isDarkTheme} ? "bg-[#12171C] text-green-400 border " : "text-black bg-gray-300 border-blue-300 text-black"} `}
					type="text"
					onChange={(e) => {
						const searchTerm = e.target.value;
						console.log(searchTerm);

						setSearchQuery(searchTerm);
					}}
				/> */}
			</div>
			<div
				style={{
					height: "25rem",
					width: "100%",
					overflow: "auto",
					margin: "0",
					borderRadius: "0.5rem",
				}}>
				<Table
					growing={TableGrowingMode.Scroll}
					className="h-full"
					onLoadMore={() => {
						console.log("Load More");
					}}
					stickyColumnHeader
					columns={
						<>
							<TableColumn>
								<Label>Sync ID</Label>
							</TableColumn>

							<TableColumn>
								<Label>Control Attribute Name</Label>
							</TableColumn>

							<TableColumn>
								<Label>Report Name</Label>
							</TableColumn>

							<TableColumn>
								<Label>Synced At</Label>
							</TableColumn>

							<TableColumn>
								<Label>Synced By</Label>
							</TableColumn>

							<TableColumn>
								<Label>Simulated At</Label>
							</TableColumn>

							<TableColumn>
								<Label>Simulated By</Label>
							</TableColumn>

							<TableColumn>
								<Label>Preview</Label>
							</TableColumn>

							<TableColumn>
								<Label>View Dashboard</Label>
							</TableColumn>

							<TableColumn>
								<Label>Simulate</Label>
							</TableColumn>
						</>
					}>
					{filteredData.map((data: SimulationDataProps, index: number) => (
						<TableRow
							style={{ padding: "1rem" }}
							key={index}>
							<TableCell
								className="center-tabledata"
								data-name="ID">
								{data.id}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="controlAttribute">
								{data.controlAttributeName}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="reportname">
								{data.reportName}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="syncAt">
								{data.syncAt}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="syncBy">
								{data.syncedBy}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="simulatedAt">
								{data.isSimulated && data.simulateAt}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="simulatedBy">
								{data.isSimulated && data.simulatedBy}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="previewBtn">
								<Button>
									<Icon name="detail-view" />
								</Button>
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="dashboardBtn">
								{data.isSimulated && (
									<Button>
										<Icon name="performance" />
									</Button>
								)}
							</TableCell>
							<TableCell
								className="center-tabledata"
								data-name="simulatedBtn">
								{!data.isSimulated && (
									<Button>
										<Icon name="synchronize" />
									</Button>
								)}
							</TableCell>
						</TableRow>
					))}
				</Table>
			</div>
		</>
	);
};

export default SimulationDetails;
