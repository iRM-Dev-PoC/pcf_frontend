import { SelectedItemContext } from "@/context/currentSelectedHeader";
import { useContext } from "react";

export const useSelectedItem = () => {
    const context = useContext(SelectedItemContext);
    if (!context) {
        throw new Error(
            "useSelectedItem must be used within a SelectedItemProvider"
        );
    }
    return context;
};
