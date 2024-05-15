import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { SidebarContextType } from "../lib/types";

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
