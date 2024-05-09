import { format, parseISO } from "date-fns";

export const formatDate = (timestamp: string) => {
    const formatedDate = format(parseISO(timestamp), "yyyy-MM-dd HH:mm:ss");
    return formatedDate;
};


