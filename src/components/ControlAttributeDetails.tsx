import {
	AnalyticalTable,
	Button,
	Card,
	FlexBox,
	TextAlign,
} from "@ui5/webcomponents-react";
import { controlAttributeData } from "../lib/controlAttributeData";
import { webComponentsReactProps } from "../utils/types";

const ControlAttributeDetails = () => {
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
						Header: "Control Attribute Name",
						accessor: "control_attribute_name",
						headerTooltip: "Control Attribute Name",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Control Family",
						accessor: "control_family",
						headerTooltip: "Control Family",
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
										icon="information"
										disabled={isOverlay}
									/>
								</FlexBox>
							);
						},
						Header: "Assign Logic",
						accessor: ".",
						disableFilters: true,
						disableGroupBy: true,
						disableResizing: true,
						disableSortBy: true,
						id: "assign_logic",
						width: 150,
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
				data={controlAttributeData.map((item) => ({
					id: item.id,
					control_attribute_name: item.controlAttributeName,
					control_family: item.ControlFamily,
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

export default ControlAttributeDetails;
