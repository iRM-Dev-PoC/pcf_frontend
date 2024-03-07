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
import { controlfamilyData } from "../lib/controlFamilyData";

const ControlFamilyDetails = () => {
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
							<Label>ID</Label>
						</TableColumn>

						<TableColumn>
							<Label>Control Family Name</Label>
						</TableColumn>

						<TableColumn>
							<Label>Details</Label>
						</TableColumn>

						<TableColumn>
							<Label>Created By</Label>
						</TableColumn>

						<TableColumn>
							<Label>Created At</Label>
						</TableColumn>
            <TableColumn>
							<Label>Edit</Label>
						</TableColumn>
            <TableColumn>
							<Label>Delete</Label>
						</TableColumn>
        </>
				}>
				{controlfamilyData.map((data, index) => (
					<TableRow
						style={{ padding: "5rem",margin:"3rem" }}
						key={index}>
						<TableCell
							className="center-tabledata"
							data-name="ID">
							{data.id}
						</TableCell>
						<TableCell
							data-name="controlFamilyName">
							{data.controlFamilyName}
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="details">
							{data.ControlFamilyDetails}
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="createdBy">
               {data.createdBy}
						</TableCell>
						<TableCell
							// className="center-tabledata"
							data-name="createdAt">
							<Button>
								<Icon name="create-entry-time" />
							</Button>
						</TableCell>
            <TableCell
							// className="center-tabledata"
							data-name="edit">
							<Button>
								<Icon name="edit" />
							</Button>
						</TableCell>
            <TableCell
							// className="center-tabledata"
							data-name="delete">
							<Button>
								<Icon name="delete" />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</Table>
		</div>

    </>
		
	);
};

export default ControlFamilyDetails;