// import { formatNumber } from "@/lib/utils";
// import { Card } from "@ui5/webcomponents-react";
// import { RadialChart } from "@ui5/webcomponents-react-charts";
// import RiskInfoCard from "./v2/RiskInfoCard";
// import { Info } from "lucide-react";

// type RiskFactorProps = {
//     value: number;
// };
// const RiskFactor = ({ value }: RiskFactorProps) => {
//     const getFillColor = (value: number) => {
//         if (value >= 75) {
//             return "#FF8042";
//         } else if (value >= 50) {
//             return "#FFBB28";
//         } else {
//             return "#00C49F";
//         }
//     };
//     return (
//         <Card className="h-full">
//             {/* <h1 className="p-8 text-xl font-bold">Risk Score</h1> */}
//                    <div className="flex justify-start p-8 gap-1 align-middle">
//                    <h1 className=" text-xl font-bold">Risk Score</h1>
//                         <RiskInfoCard desc={"The risk score is the percentage of exception data points relative to the total data points.This percentage indicates the level of risk, with higher values representing more exceptions and higher risk."}>
//                             <Info className="text-sky-600 hover:text-sky-900" />
//                         </RiskInfoCard>
//                     </div>
//             <RadialChart
//                 chartConfig={{
//                     endAngle: 0,
//                     startAngle: 180,
//                     innerRadius: 200,
//                     outerRadius: 140,
//                 }}
//                 color={getFillColor(value)}
//                 displayValue={`${String(formatNumber(value))}%`}
//                 value={formatNumber(value)}
//             />
//         </Card>
//     );
// };

// export default RiskFactor;

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more'; 
import { Card } from "@ui5/webcomponents-react";
import RiskInfoCard from "./v2/RiskInfoCard";
import { Info } from "lucide-react";


HighchartsMore(Highcharts);

type RiskFactorProps = {
    value: number;
};

const RiskFactor = ({ value }: RiskFactorProps) => {
    const getFillColor = (value: number) => {
        if (value >= 75) {
            return "#FF8042";
        } else if (value >= 20) {
            return "#FFBB28";
        } else {
            return "#00C49F";
        }
    };

    const options: Highcharts.Options = {
        chart: {
            type: 'gauge',
            height: '400px'
        },
        title: {
            text: ''
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: '#EEE', // Default background color
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            tickAmount: 3, // Adjust the number of ticks
            labels: {
                formatter: function () {
                    const value = this.value as number; // Explicitly cast to number
                    if (typeof value === 'number') {
                        if (value >= 75) {
                            return 'High Risk';
                        } else if (value >= 20) {
                            return 'Medium Risk';
                        } else {
                            return 'Low Risk';
                        }
                    }
                    return ''; // Fallback if value is not a number
                }
            },
            plotBands: [
                {
                    from: 0,
                    to: 20,
                    color: '#00C49F', // Low risk color
                    innerRadius: '60%',
                    outerRadius: '100%',
                    thickness: '40%'
                },
                {
                    from: 20,
                    to: 75,
                    color: '#FFBB28', // Medium risk color
                    innerRadius: '60%',
                    outerRadius: '100%',
                    thickness: '40%'
                },
                {
                    from: 75,
                    to: 500,
                    color: '#FF8042', // High risk color
                    innerRadius: '60%',
                    outerRadius: '100%',
                    thickness: '40%'
                }
            ]
        },
        series: [{
            type: 'gauge', // Specify the type of series
            data: [value],
            dial: {
                backgroundColor: getFillColor(value),
                radius: '80%'
            },
            pivot: {
                radius: 10
            }
        }],
        plotOptions: {
            gauge: {
                dataLabels: {
                    enabled: true,
                    format: '{y:.2f}%'
                }
            }
        }
    };

    return (
        <Card className="h-full">
            <div className="flex justify-start p-8 gap-1 align-middle">
                <h1 className="text-xl font-bold">Risk Score</h1>
                <RiskInfoCard desc={"The risk score is the percentage of exception data points relative to the total data points. This percentage indicates the level of risk, with higher values representing more exceptions and higher risk."}>
                    <Info className="text-sky-600 hover:text-sky-900" />
                </RiskInfoCard>
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </Card>
    );
};

export default RiskFactor;
