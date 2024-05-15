import { useContext } from "react";
import { SelectedItemContext } from "../context/currentSelectedHeader";

export const useSelectedItem = () => {
    const context = useContext(SelectedItemContext);
    if (!context) {
        throw new Error(
            "useSelectedItem must be used within a SelectedItemProvider"
        );
    }
    return context;
};
