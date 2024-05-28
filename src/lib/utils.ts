import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const deleteCookie = (cookieName: string): void => {
    Cookies.remove(cookieName);
};

export const getCookie = (cookieName: string): string | undefined => {
    return Cookies.get(cookieName);
};

export const setCookie = (cookieName: string, cookieValue: string): void => {
    Cookies.set(cookieName, cookieValue);
};

export const calcPercentage = (num: number, num2: number) => {
    const total = num + num2;

    const value = ((num / total) * 100).toFixed(2);
    return `${value}%`;
};

export const getCurrentDatetime = (): string => {
    const date: Date = new Date();
    let hours: number = date.getHours();
    const period: string = hours < 12 ? "AM" : "PM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const datetime: string =
        (date.getDate() < 10 ? "0" : "") +
        date.getDate() +
        "/" +
        (date.getMonth() + 1 < 10 ? "0" : "") +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes() +
        ":" +
        (date.getSeconds() < 10 ? "0" : "") +
        date.getSeconds() +
        " " +
        period;

    return datetime;
};

export const formatNumber = (value: number) => {
    const formatedNumber = Math.round((value + Number.EPSILON) * 100) / 100;
    return formatedNumber;
};

export const formatDate = (timestamp: string) => {
    const formatedDate = format(parseISO(timestamp), "yyyy-MM-dd HH:mm:ss");
    return formatedDate;
};

export const calcRisk = (val: number) => {
    const riskMap = {
        highMargin: 60,
        MidMargin: 20,
        lowMargin: 0,
    };

    if (val > riskMap.highMargin) {
        return "High";
    } else if (val > riskMap.MidMargin && val < riskMap.highMargin) {
        return "Medium";
    } else {
        return "Low";
    }
};
