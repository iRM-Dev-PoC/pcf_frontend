import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, createContext } from "react";
import { getHeaderTypes } from "../lib/types";

type HeaderDataContextProps = {
    data: getHeaderTypes[] | undefined;
    error: boolean;
    isLoading: boolean;
};

const HeaderDataContext = createContext<HeaderDataContextProps | undefined>(
    undefined
);

const fetchHeaderData = async () => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/data-sync/get-all-headers`;
    const res = await axios.get(endPoint);
    if (res.data?.statuscode === 200) {
        return res.data.data;
    } else {
        throw new Error("Error fetching data");
    }
};

const HeaderDataProvider = ({ children }: { children: ReactNode }) => {
    const { data, error, isLoading } = useQuery<getHeaderTypes[]>({
        queryKey: ["allHeaderDataContext"],
        queryFn: fetchHeaderData,
        retry: 3,
    });

    return (
        <HeaderDataContext.Provider value={{ data, error: !!error, isLoading }}>
            {children}
        </HeaderDataContext.Provider>
    );
};

export { HeaderDataContext, HeaderDataProvider };
