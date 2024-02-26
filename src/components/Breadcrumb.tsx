import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbsItem } from "@ui5/webcomponents-react";
import { useCurrentPath } from "../hooks/useCurrentPath";
import { breadcrumbList } from "../lib/breadcrumbsList";

interface BreadcrumbItem {
	id: string;
	name: string;
	path: string;
}

const Breadcrumb = () => {
	const currentPath = useCurrentPath();
	const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

	useEffect(() => {
		const currentBreadcrumb = breadcrumbList.find(
			(breadcrumb) => breadcrumb.path === currentPath
		);

		const indexOfCurrentBreadcrumb = currentBreadcrumb
			? breadcrumbList.indexOf(currentBreadcrumb) + 1
			: 0;

		const newBreadcrumbItems = breadcrumbList.slice(
			0,
			indexOfCurrentBreadcrumb
		);
		setBreadcrumbItems(newBreadcrumbItems);
	}, [currentPath]);
	// console.log(breadcrumbItems);
	// const navigateToPath = (path: string) => {
	// 	console.log("path", path);
	// };

	return (
		<div>
			<Breadcrumbs
				design="Standard"
				separatorStyle="Slash">
				{breadcrumbItems.map((item, index) => (
					<BreadcrumbsItem
						key={index}
						// onClick={() => navigateToPath(item.path)}
					>
						{item.name}
					</BreadcrumbsItem>
				))}
			</Breadcrumbs>
		</div>
	);
};

export default Breadcrumb;
