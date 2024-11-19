import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


interface BarChartProps {
    categories: string[]; 
    data: number[];       
    title?: string;       
  }

const VerticalBarChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: "column", 
    },
    title: {
      text: "Vertical Bar Chart Example",
    },
    xAxis: {
      categories: ["Apples", "Bananas", "Oranges", "Grapes", "Peaches"],
      title: {
        text: "Fruits",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Quantity",
      },
      labels: {
        formatter: function () {
          return `${this.value}`;
        },
      },
    },
    series: [
      {
        name: "2023 Sales",
        type: "column",
        data: [34, 78, 90, 140, 130],
        color: "#434348",
      },
    ],
    tooltip: {
      shared: true,
      valueSuffix: " units",
    },
    legend: {
      enabled: true,
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default VerticalBarChart;
