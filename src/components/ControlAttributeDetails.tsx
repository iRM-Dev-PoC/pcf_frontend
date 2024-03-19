import {
	AnalyticalTable,
	Bar,
	Button,
	Card,
	ComboBox,
	ComboBoxItem,
	FlexBox,
	Form,
	FormItem,
	Input,
	TextAlign,
} from "@ui5/webcomponents-react";
import { controlAttributeData } from "../lib/controlAttributeData";
import { webComponentsReactProps } from "../utils/types";
import { controlfamilyData } from "../lib/controlFamilyData";

type ControlAttributeProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	showEditDialog: any;
};

const controlFamilyNames = [
	...new Set(controlfamilyData.map((item) => item.controlFamilyName)),
];

const ControlFamilyEnum: { [key: string]: string } = {};

controlFamilyNames.forEach((name) => {
	ControlFamilyEnum[name] = name;
});

const ControlAttributeDetails = ({ showEditDialog }: ControlAttributeProps) => {
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
										onClick={() => {
											const { close } = showEditDialog({
												headerText: "Control Attribute Details",
												children: (
													<Form
														style={{
															alignItems: "center",
														}}>
														<FormItem label="Control Attribute Name">
															<Input
																type="Text"
																value=""
															/>
														</FormItem>
														<FormItem label="Control Family">
															<ComboBox filter="Contains">
																{Object.keys(ControlFamilyEnum).map((key) => (
																	<ComboBoxItem
																		key={key}
																		text={ControlFamilyEnum[key]}
																	/>
																))}
															</ComboBox>
														</FormItem>
													</Form>
												),
												footer: (
													<Bar
														endContent={
															<>
																<Button design="Emphasized">Update</Button>
																<Button
																	onClick={() => close()}
																	design="Negative">
																	Close
																</Button>
															</>
														}></Bar>
												),
											});
										}}
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
