import { useContext } from "react";
import { getAllSyncData } from "../utils/types";
import { ProductSwitchContext } from "../context/productSwitchContext";

export const useSyncHeader = (): getAllSyncData => {
    const context = useContext(ProductSwitchContext);
    if (!context) {
        throw new Error(
            "useSwitchProduct must be used within a ProductSwitchProvider"
        );
    }
    return context;
};
