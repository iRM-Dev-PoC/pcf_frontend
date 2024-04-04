import { Card, FCLLayout } from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";

type RiskFactorProps = {
    layout: FCLLayout;
};
const RiskFactor = ({ layout }: RiskFactorProps) => {
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
                displayValue="50%"
                value={50}
            />
        </Card>
    );
};

export default RiskFactor;
