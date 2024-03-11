import {
	AnalyticalTable,
	Button,
	Card,
	FlexBox,
	TextAlign,
} from "@ui5/webcomponents-react";
import { controlfamilyData } from "../lib/controlFamilyData";
import { webComponentsReactProps } from "../utils/types";

const ControlFamilyDetails = () => {
	return (
		<Card>
			<AnalyticalTable
				columns={[
					{
						Header: "ID",
						accessor: "id",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Control Family Name",
						accessor: "control_family_name",
						headerTooltip: "Control Family Name",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Details",
						accessor: "details",
						headerTooltip: "Details",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Created By",
						accessor: "created_By",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Created At",
						accessor: "created_At",
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
										icon="edit"
										disabled={isOverlay}
									/>
									<Button
										icon="delete"
										disabled={isOverlay}
									/>
								</FlexBox>
							);
						},
						Header: "Actions",
						accessor: ".",
						disableFilters: true,
						disableGroupBy: true,
						disableResizing: true,
						disableSortBy: true,
						id: "actions",
						width: 150,
						hAlign: "center" as TextAlign,
					},
				]}
				data={controlfamilyData.map((item) => ({
					id: item.id,
					control_family_name: item.controlFamilyName,
					details: item.ControlFamilyDetails,
					created_By: item.createdBy,
					created_At: item.createdAt,
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

export default ControlFamilyDetails;
