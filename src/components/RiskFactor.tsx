import { formatNumber } from "@/lib/utils";
import { Card } from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";

type RiskFactorProps = {
    value: number;
};
const RiskFactor = ({ value }: RiskFactorProps) => {
    return (
        <Card className="h-min">
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
