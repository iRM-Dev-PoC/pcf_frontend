import { useState } from "react";
import {
	List,
	StandardListItem,
	Toolbar,
	Title,
	ToolbarSpacer,
	Button,
	Avatar,
	FlexBox,
	Label,
	Text,
	ToolbarDesign,
	AvatarSize,
	FCLLayout,
	FlexibleColumnLayout,
	ButtonDesign,
	FlexBoxDirection,
	Table,
	TableGrowingMode,
	TableColumn,
} from "@ui5/webcomponents-react";
import { userData } from "../lib/userList";
import { User } from "../utils/types";

const Users = () => {
	const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
	const [selectedUser, setSelectedUser] = useState<User>(userData[0]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onStartColumnClick = (e: any) => {
		const userId = parseInt(e.detail.item.dataset.userId);
		setSelectedUser(userData.find((user) => user.id === userId)!);
		setLayout(FCLLayout.TwoColumnsMidExpanded);
	};

	return (
		<FlexibleColumnLayout
			style={{ height: "100%", marginTop: "0.5rem", marginBottom: "0.5rem" }}
			layout={layout}
			startColumn={
				<Table
					onClick={onStartColumnClick}
					growing={TableGrowingMode.Scroll}
					columns={
						<>
							<TableColumn>
								<Label>Column 1</Label>
							</TableColumn>
							<TableColumn>
								<Label>Column 2</Label>
							</TableColumn>
						</>
					}></Table>
			}
			midColumn={
				<>
					<Toolbar design={ToolbarDesign.Solid}>
						<Title>{selectedUser.name}</Title>
						<ToolbarSpacer />
						<Button
							icon="decline"
							design={ButtonDesign.Transparent}
							onClick={() => {
								setLayout(FCLLayout.OneColumn);
							}}
						/>
					</Toolbar>
					<Toolbar style={{ height: "200px" }}>
						<Avatar
							icon="person-placeholder"
							size={AvatarSize.XL}
							style={{ marginLeft: "12px" }}
						/>
						<FlexBox
							direction={FlexBoxDirection.Column}
							style={{ marginLeft: "6px" }}>
							<FlexBox>
								<Label>Name:</Label>
								<Text style={{ marginLeft: "2px" }}>{selectedUser.name}</Text>
							</FlexBox>
							<FlexBox>
								<Label>Email:</Label>
								<Text style={{ marginLeft: "2px" }}>{selectedUser.email}</Text>
							</FlexBox>
							<FlexBox>
								<Label>User Type:</Label>
								<Text style={{ marginLeft: "2px" }}>{selectedUser.role}</Text>
							</FlexBox>
						</FlexBox>
					</Toolbar>

					<List
						headerText="Permissions"
						growing="Scroll">
						{Object.entries(selectedUser.permissions).map(([key, value]) => (
							<StandardListItem key={key}>
								{key}: {value.toString()}
							</StandardListItem>
						))}
					</List>
				</>
			}
		/>
	);
};

export default Users;
