import RiskCard from "@/components/v2/RiskCard";
import type { getAllCardDataType } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Fragment } from "react";
type DashboardCardListProps = {
    dataCard: getAllCardDataType[];
    onClick: (id: number) => void;
};
const DashboardCardList = ({ dataCard, onClick }: DashboardCardListProps) => {
    return (
        <>
            {dataCard?.map((card) => (
                <Fragment key={card?.ID}>
                    <RiskCard
                        title={card?.CHECK_POINT_NAME}
                        riskScore={formatNumber(card?.RISK_SCORE)}
                        desc={card?.CHECK_POINT_DESC}
                        info={card?.CHECK_POINT_DESC}
                        onClick={() => onClick(card.ID)}
                    />
                </Fragment>
            ))}
        </>
    );
};

export default DashboardCardList;
