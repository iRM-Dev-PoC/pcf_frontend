import { useContext } from "react";
import { PathContext } from "../context/currentPathContext";
import { PathContextType } from "../lib/types";

export const useCurrentPath = (): PathContextType => {
    const path = useContext(PathContext);
    if (path === null) {
        throw new Error("usePath must be used within a PathProvider");
    }
    return path;
};
