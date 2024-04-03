import { useContext } from "react";
import { ProductSwitchType } from "../utils/types";
import { ProductSwitchContext } from "../context/productSwitchContext";

export const useSwitchProduct = (): ProductSwitchType => {
    const context = useContext(ProductSwitchContext);
    if (!context) {
        throw new Error(
            "useSwitchProduct must be used within a ProductSwitchProvider"
        );
    }
    return context;
};
