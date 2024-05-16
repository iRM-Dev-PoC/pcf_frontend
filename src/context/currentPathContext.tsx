import { ReactNode, createContext, useEffect, useState } from "react";
import { PathContextType } from "@/lib/types";

type PathProviderProps = {
    children: ReactNode;
};

export const PathContext = createContext<PathContextType | null>(null);

export const PathProvider = ({ children }: PathProviderProps): JSX.Element => {
    const [path, setPath] = useState<PathContextType>("");

    useEffect(() => {
        const currentURL = window.location.href;

        const url = new URL(currentURL);

        const pathName = url.pathname;

        setPath(pathName);
    }, []);

    return <PathContext.Provider value={path}>{children}</PathContext.Provider>;
};
