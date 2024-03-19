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
import { controlLogicData } from "../lib/controlLogicData";
type webComponentsReactProps = {
	showOverlay: boolean;
};

type ControlLogicProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	showEditDialog: any;
};

const ControlLogicDetails = ({ showEditDialog }: ControlLogicProps) => {
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
						Header: "Logic",
						accessor: "logic_name",
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
										disabled={isOverlay}
										onClick={() => {
											const { close } = showEditDialog({
												headerText: "Control Logic Details",
												children: (
													<Form
														style={{
															alignItems: "center",
														}}>
														<FormItem label="Logic">
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
				data={controlLogicData.map((item) => ({
					ID: item.ID,
					logic_name: item.logic_name,
					created_By: item.created_By,
				}))}
				filterable
				infiniteScroll
				alternateRowColor
				rowHeight={44}
				selectedRowIds={{
					3: true,
				}}
				selectionMode="None"
				withRowHighlight
			/>
		</Card>
	);
};

export default ControlLogicDetails;
