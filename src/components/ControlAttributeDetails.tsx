import {
	Label,
	Table,
	TableCell,
	TableColumn,
	TableRow,
	Button,
	Icon,
	TableGrowingMode,

} from "@ui5/webcomponents-react";
import { controlAttributeData } from "../lib/controlAttributeData";

const ControlAttributeDetails = () => {
	return (
    <>
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
							<Label>Serial No.</Label>
						</TableColumn>

						<TableColumn>
							<Label>Control Attribute Name</Label>
						</TableColumn>

						<TableColumn>
							<Label>Control Family</Label>
						</TableColumn>

						<TableColumn>
							<Label>Edit</Label>
						</TableColumn>

						<TableColumn>
							<Label>Delete</Label>
						</TableColumn>

						<TableColumn>
							<Label>Assign Logic</Label>
						</TableColumn>

					</>
				}>
				{controlAttributeData.map((data, index) => (
					<TableRow
						style={{ padding: "5rem",margin:"3rem" }}
						key={index}>
						<TableCell
							className="center-tabledata"
							data-name="ID">
							{data.id}
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="controlAttribute">
							{data.controlAttributeName}
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="controlFamilyname">
							{data.ControlFamily}
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="edit">
							<Button>
								<Icon name="write-new-document" />
							</Button>
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="delete">
							<Button>
								<Icon name="delete" />
							</Button>
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="assignLogic">
							 <Button>
								<Icon name="information" />
							</Button>
						</TableCell>
						
					</TableRow>
				))}
			</Table>
		</div>

    </>
		
	);
};

export default ControlAttributeDetails;