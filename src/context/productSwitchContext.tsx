import { ReactNode, createContext, useState } from "react";
import { ProductSwitchType } from "../utils/types";

export const ProductSwitchContext = createContext<
    ProductSwitchType | undefined
>(undefined);

export const ProductSwitchProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isSwitchProduct, setIsSwitchProduct] = useState(false);

    return (
        <ProductSwitchContext.Provider
            value={{ isSwitchProduct, setIsSwitchProduct }}
        >
            {children}
        </ProductSwitchContext.Provider>
    );
};
