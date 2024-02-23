import { Breadcrumbs, BreadcrumbsItem } from "@ui5/webcomponents-react";
import { useCurrentPath } from "../hooks/useCurrentPath";

const Breadcrumb = () => {
	const currentPath = useCurrentPath();
	console.log(currentPath);
	return (
		<div>
			<Breadcrumbs
				design="Standard"
				onItemClick={function _a() {}}
				separatorStyle="Slash">
				<BreadcrumbsItem>Products</BreadcrumbsItem>
				<BreadcrumbsItem>Hardware</BreadcrumbsItem>
				<BreadcrumbsItem>Notebooks</BreadcrumbsItem>
			</Breadcrumbs>
		</div>
	);
};

export default Breadcrumb;
