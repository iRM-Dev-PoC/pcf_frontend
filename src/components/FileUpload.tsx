// import { Card, UploadCollection } from "@ui5/webcomponents-react";
// const FileUpload = () => {
// 	return (
// 		<Card>
// 			<UploadCollection
// 				hideDragOverlay={false}
// 				mode="SingleSelect"
// 				noDataDescription="Supported Formats CSV and XLSX"
// 				onDrop={function _a() {
// 					alert("File Dropped");
// 				}}
// 				onItemDelete={function _a() {}}
// 				onSelectionChange={function _a() {}}
// 			/>
// 		</Card>
// 	);
// };

// export default FileUpload;

import { DragEvent, useState } from "react";
import {
	Icon,
	Text,
	UploadCollection,
	UploadCollectionItem,
	UploadCollectionDomRef,
} from "@ui5/webcomponents-react";

const FileUpload = () => {
	const [children, setChildren] = useState<JSX.Element[]>([]);
	const handleDrop = (e: DragEvent<UploadCollectionDomRef>) => {
		e.preventDefault();
		const files = e.dataTransfer?.files;
		if (files) {
			Array.from(files).forEach((file) => {
				setChildren((prev) => [
					...prev,
					<UploadCollectionItem
						key={file.name}
						fileName={file.name}
						thumbnail={<Icon name="document" />}>
						<Text>Uploaded On: Right now</Text>
					</UploadCollectionItem>,
				]);
			});
		}
	};
	return (
		<UploadCollection onDrop={(e) => handleDrop(e)}>
			{children}
		</UploadCollection>
	);
};
export default FileUpload;
