import { HeaderDataContext } from "@/context/headerDataContext";
import { useContext } from "react";

export const useHeaderData = () => {
    const context = useContext(HeaderDataContext);
    if (context === undefined) {
        throw new Error(
            "useHeaderData must be used within a HeaderDataProvider"
        );
    }
    return context;
};
