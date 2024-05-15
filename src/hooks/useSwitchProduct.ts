import { useContext } from "react";
import { ProductSwitchContext } from "../context/productSwitchContext";
import { ProductSwitchType } from "../lib/types";

export const useSwitchProduct = (): ProductSwitchType => {
    const context = useContext(ProductSwitchContext);
    if (!context) {
        throw new Error(
            "useSwitchProduct must be used within a ProductSwitchProvider"
        );
    }
    return context;
};
