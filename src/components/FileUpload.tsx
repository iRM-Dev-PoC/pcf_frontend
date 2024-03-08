import { DragEvent, useState } from "react";
import {
	Text,
	UploadCollection,
	UploadCollectionItem,
	UploadCollectionDomRef,
	Icon,
} from "@ui5/webcomponents-react";
import getCurrentDatetime from "../utils/getCurrentDatetime";

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
						<Text>Uploaded On: {getCurrentDatetime()} </Text>
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
