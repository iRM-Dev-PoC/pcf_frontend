import { Card, FlexBox } from "@ui5/webcomponents-react";
import DataCard from "./DataCard";
import DataTable from "./DataTable";
import { ApiResponse } from "../../utils/types";
import { calcPercentage } from "../../utils/calcPercentage";
import TableHeader from "./TableHeader";
import { useState, useEffect } from "react";
import executiveSoDData from "../../mockSoDData/executiveData.json";

const ExecutiveSummary = () => {
    const [, setSod] = useState<boolean>(false);
    const [, setSensitive] = useState<boolean>(false);
    const [, setAll] = useState<boolean>(false);
    const [executiveData, setexecutiveData] = useState<ApiResponse | undefined>(
        undefined
    );

    useEffect(() => {
        const getExecutiveData = async () => {
            try {
                const response = await JSON.parse(
                    JSON.stringify(executiveSoDData)
                );
                setexecutiveData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getExecutiveData();
    }, []);

    if (executiveData === undefined) return null;

    const dataItems: ApiResponse = executiveData;

    const infoTechValue = Number(dataItems.exdata?.[1025][0]?.count || 0);
    const procureToPayValue = Number(dataItems.exdata?.[1025][1]?.count || 0);

    const informationTechnology = calcPercentage(
        infoTechValue,
        procureToPayValue
    );

    const procureToPay = calcPercentage(procureToPayValue, infoTechValue);

    return (
        <Card className="my-3 p-3">
            <TableHeader
                setAll={setAll}
                setSensitive={setSensitive}
                setSod={setSod}
                title="Executive Summary"
            />
            <FlexBox alignItems="Center" justifyContent="Center">
                <DataCard
                    header="Information Technology"
                    icon="Monitor"
                    value={informationTechnology}
                />
                <DataCard
                    header="Procure to Pay"
                    icon="Cart"
                    value={procureToPay}
                />
            </FlexBox>
            <DataTable data={dataItems} />
        </Card>
    );
};

export default ExecutiveSummary;
