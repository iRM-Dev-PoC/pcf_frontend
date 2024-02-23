import { useContext } from "react";
import { PathContextType } from "../utils/types";
import { PathContext } from "../context/currentPathContext";

export const useCurrentPath = (): PathContextType => {
	const path = useContext(PathContext);
	if (path === null) {
		throw new Error("usePath must be used within a PathProvider");
	}
	return path;
};
