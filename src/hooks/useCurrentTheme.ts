import { useEffect, useState } from "react";

export function useCurrentTheme() {
    const [currentTheme, setCurrentTheme] = useState("light");
    const theme = localStorage.getItem("Theme");
    useEffect(() => {
        if (theme === undefined || theme === null) {
            setCurrentTheme("light");
        } else if (theme === "sap_horizon" || theme === "sap_horizon_hcw") {
            setCurrentTheme("light");
        } else if (
            theme === "sap_horizon_dark" ||
            theme === "sap_horizon_hcb"
        ) {
            setCurrentTheme("dark");
        } else {
            setCurrentTheme("light");
        }
    }, [theme]);

    return { currentTheme };
}
