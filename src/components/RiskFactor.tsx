import { formatNumber } from "@/lib/utils";
import { Card } from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";

type RiskFactorProps = {
    value: number;
};
const RiskFactor = ({ value }: RiskFactorProps) => {
    const getFillColor = (value: number) => {
        if (value >= 75) {
            return "#FF8042";
        } else if (value >= 50) {
            return "#FFBB28";
        } else {
            return "#00C49F";
        }
    };
    return (
        <Card className="h-full">
            <h1 className="p-8 text-xl font-bold">Risk Score</h1>
            <RadialChart
                chartConfig={{
                    endAngle: 0,
                    startAngle: 180,
                    innerRadius: 200,
                    outerRadius: 140,
                }}
                color={getFillColor(value)}
                displayValue={`${String(formatNumber(value))}%`}
                value={formatNumber(value)}
            />
        </Card>
    );
};

export default RiskFactor;
