import { useContext } from "react";
// import { getAllSyncData } from "../utils/types";
import { HeaderDataContext } from "../context/headerDataContext";

export const useSyncHeader = () => {
    const context = useContext(HeaderDataContext);
    if (!context) {
        throw new Error(
            "useSwitchProduct must be used within a ProductSwitchProvider"
        );
    }
    // return context;
};
