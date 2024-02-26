import { useState } from "react";
import { Breadcrumbs, BreadcrumbsItem } from "@ui5/webcomponents-react";
import { useCurrentPath } from "../hooks/useCurrentPath";
import { breadcrumbList } from "../lib/breadcrumbsList";

const Breadcrumb = () => {
	const currentPath = useCurrentPath();
	const pathList = currentPath.split("/");
	console.log(pathList);
	const [breadcrumbLabel, setBreadcrumbLabel] = useState("");
	// setBreadcrumbLabel(breadcrumbList[pathList[1]]);
	return (
		<div>
			<div>
				{breadcrumbLabel && (
					<Breadcrumbs
						design="Standard"
						separatorStyle="Slash">
						<BreadcrumbsItem>
							{/* {breadcrumbLabel} */}
						</BreadcrumbsItem>
					</Breadcrumbs>
				)}
			</div>
		</div>
	);
};

export default Breadcrumb;
