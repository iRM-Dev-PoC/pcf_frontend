import { SidebarContextType } from "@/types";
import { ReactNode, createContext, useState } from "react";

export const SidebarContext = createContext<SidebarContextType | undefined>(
    undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);

    return (
        <SidebarContext.Provider
            value={{ isSidebarCollapsed, setSidebarCollapsed }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
