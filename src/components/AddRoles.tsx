import { BusyIndicator, Tree, TreeItem } from "@ui5/webcomponents-react";

const AddRoles = () => {
	return (
		<div>
			<BusyIndicator
				style={{
					width: "100%",
				}}>
				<Tree
					mode="None"
					onItemClick={function _a() {}}
					onItemDelete={function _a() {}}
					onItemMouseout={function _a() {}}
					onItemMouseover={function _a() {}}
					onItemToggle={function _a() {}}
					onSelectionChange={function _a() {}}>
					<TreeItem text="Has pre-loaded children">
						<TreeItem text="Tree 1.1" />
						<TreeItem text="Tree 1.2" />
					</TreeItem>
					<TreeItem text="Has no children" />
					<TreeItem
						data-id="lazychildren"
						hasChildren
						icon="download-from-cloud"
						text="Has children but not yet loaded"
					/>
				</Tree>
			</BusyIndicator>
		</div>
	);
};

export default AddRoles;
