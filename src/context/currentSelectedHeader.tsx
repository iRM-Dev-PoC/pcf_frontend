import { getHeaderTypes } from "@/types";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";

type SelectedItemContextProps = {
    selectedItem: getHeaderTypes | null;
    setSelectedItem: Dispatch<SetStateAction<getHeaderTypes | null>>;
};

const SelectedItemContext = createContext<SelectedItemContextProps | undefined>(
    undefined
);

const SelectedItemProvider = ({ children }: { children: ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState<getHeaderTypes | null>(
        null
    );

    return (
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SelectedItemContext.Provider>
    );
};

export { SelectedItemContext, SelectedItemProvider };
