import { useContext } from "react";
import { HeaderDataContext } from "../context/headerDataContext";

export const useHeaderData = () => {
    const context = useContext(HeaderDataContext);
    if (context === undefined) {
        throw new Error(
            "useHeaderData must be used within a HeaderDataProvider"
        );
    }
    return context;
};
