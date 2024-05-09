import { Card, FCLLayout } from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";
import { formatNumber } from "../lib/formatNumber";

type RiskFactorProps = {
    layout: FCLLayout;
    value: number;
};
const RiskFactor = ({ layout, value }: RiskFactorProps) => {
    const isFullScreen = layout === FCLLayout.MidColumnFullScreen;

    return (
        <Card
            className={`${isFullScreen ? `h-[14.8rem] w-[27.7rem] ` : `h-[16.5rem] w-[25rem] `}mt-[0.9rem]   `}
        >
            <RadialChart
                chartConfig={{
                    endAngle: 0,
                    startAngle: 180,
                    innerRadius: 200,
                    outerRadius: 140,
                }}
                color="#f0ab00"
                displayValue={`${String(formatNumber(value))}%`}
                value={formatNumber(value)}
            />
        </Card>
    );
};

export default RiskFactor;
