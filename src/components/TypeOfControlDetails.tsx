import {
	AnalyticalTable,
	Bar,
	Button,
	Card,
	FlexBox,
	Form,
	FormItem,
	Input,
	TextAlign,
} from "@ui5/webcomponents-react";
import { typeOfControlData } from "../lib/typeOfControlData";
import { webComponentsReactProps } from "../utils/types";

type TypeOfControlDetailsProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	showEditDialog: any;
};

const TypeOfControlDetails = ({
	showEditDialog,
}: TypeOfControlDetailsProps) => {
	return (
		<Card>
			<AnalyticalTable
				columns={[
					{
						Header: "ID",
						accessor: "ID",
						hAlign: "center" as TextAlign,
					},
					{
						Header: "Control Name",
						accessor: "control_name",
						headerTooltip: "Full Name",
						hAlign: "center" as TextAlign,
					},

					{
						Header: "Created By",
						accessor: "created_By",
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
										icon="create-entry-time"
										disabled={isOverlay}
									/>
								</FlexBox>
							);
						},
						Header: "Created At",
						accessor: ".",
						disableFilters: true,
						disableGroupBy: true,
						disableResizing: true,
						disableSortBy: true,
						id: "created_at",
						width: 100,
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
										icon="add-document"
										disabled={isOverlay}
									/>
									<Button
										icon="edit"
										onClick={() => {
											const { close } = showEditDialog({
												headerText: "Type of Controls Details",
												children: (
													<Form
														style={{
															alignItems: "center",
														}}>
														<FormItem label="Control Name">
															<Input
																type="Text"
																value=""
															/>
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
				data={typeOfControlData.map((item) => ({
					ID: item.ID,
					control_name: item.control_name,
					created_By: item.created_By,
				}))}
				filterable
				infiniteScroll
				rowHeight={44}
				alternateRowColor
				selectedRowIds={{
					3: true,
				}}
				selectionMode="SingleSelect"
				withRowHighlight
			/>
		</Card>
	);
};

export default TypeOfControlDetails;
