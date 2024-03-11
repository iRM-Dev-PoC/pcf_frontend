import {
	AnalyticalTable,
	Button,
	Card,
	FlexBox,
	TextAlign,
} from "@ui5/webcomponents-react";
import { simulateData } from "../lib/simulateData";
import {
	SimulationDetailsDataType,
	webComponentsReactProps,
} from "../utils/types";

const SimulationDetails = () => {
	return (
		<Card>
			<AnalyticalTable
				columns={[
					{
						Header: "Sync ID",
						accessor: "id",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Control Attribute Name",
						accessor: "control_attribute_name",
						headerTooltip: "Control Attribute Name",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Report Name",
						accessor: "report_name",
						headerTooltip: "Report Name",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Synced By",
						headerTooltip: "Synced By",
						accessor: "synced_by",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Sync At",
						headerTooltip: "Sync At",
						accessor: "sync_at",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Simulated At",
						headerTooltip: "Simulated At",
						accessor: "simulate_at",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Simulated By",
						headerTooltip: "Simulated By",
						accessor: "simulated_by",
						hAlign: "center" as TextAlign,
					},

					{
						Cell: (instance: {
							cell: string;
							row: string;
							webComponentsReactProperties: webComponentsReactProps;
						}) => {
							const { webComponentsReactProperties } = instance;
							const isOverlay = webComponentsReactProperties.showOverlay;

							return (
								<FlexBox>
									<Button
										icon="detail-view"
										disabled={isOverlay}
									/>
								</FlexBox>
							);
						},
						Header: "Preview",
						accessor: ".",
						disableFilters: true,
						disableGroupBy: true,
						disableResizing: true,
						disableSortBy: true,
						id: "preview",
						width: 150,
						hAlign: "center" as TextAlign,
					},
					{
						Cell: (instance: {
							cell: string;
							row: Record<string, SimulationDetailsDataType>;
							webComponentsReactProperties: webComponentsReactProps;
						}) => {
							const { webComponentsReactProperties } = instance;
							const isOverlay = webComponentsReactProperties.showOverlay;
							const rowData = instance.row.original;
							const showDashboardButton = rowData.is_simulated;

							return (
								<FlexBox>
									{showDashboardButton && (
										<Button
											icon="performance"
											disabled={isOverlay}
										/>
									)}
								</FlexBox>
							);
						},
						Header: "View Dashboard",
						accessor: ".",
						disableFilters: true,
						disableGroupBy: true,
						disableResizing: true,
						disableSortBy: true,
						id: "viewDashboard",
						width: 150,
						hAlign: "center" as TextAlign,
					},
					{
						Cell: (instance: {
							cell: string;
							row: Record<string, SimulationDetailsDataType>;
							webComponentsReactProperties: webComponentsReactProps;
						}) => {
							const { webComponentsReactProperties } = instance;
							const isOverlay = webComponentsReactProperties.showOverlay;
							const rowData = instance.row.original;
							const showSimulateButton = !rowData.is_simulated;

							return (
								<FlexBox>
									{showSimulateButton && (
										<Button
											icon="synchronize"
											disabled={isOverlay}
										/>
									)}
								</FlexBox>
							);
						},
						Header: "Simulate",
						accessor: ".",
						disableFilters: true,
						disableGroupBy: true,
						disableResizing: true,
						disableSortBy: true,
						id: "simulate",
						width: 150,
						hAlign: "center" as TextAlign,
					},
				]}
				data={simulateData.map((item) => ({
					id: item.id,
					control_attribute_name: item.controlAttributeName,
					report_name: item.reportName,
					sync_at: item.syncAt,
					synced_by: item.syncedBy,
					is_simulated: item.isSimulated,
					simulate_at: item.simulateAt,
					simulated_by: item.simulatedBy,
				}))}
				filterable
				infiniteScroll
				alternateRowColor
				rowHeight={44}
				selectedRowIds={{
					3: true,
				}}
				selectionMode="None"
			/>
		</Card>
	);
};

export default SimulationDetails;
