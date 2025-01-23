import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ChartsRotatedLabels = () => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Column Chart with Rotated Labels",
    },
    xAxis: {
      categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
      labels: {
        rotation: -45, 
        style: {
          fontSize: "13px",
          fontFamily: "Arial, sans-serif",
        },
      },
      title: {
        text: "Categories",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Values",
      },
    },
    series: [
      {
        name: "Series 1",
        data: [29.9, 71.5, 106.4, 129.2],
      },
      {
        name: "Series 2",
        data: [83.6, 78.8, 98.5, 93.4],
      },
    ],
    tooltip: {
      shared: true,
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
export default ChartsRotatedLabels;
