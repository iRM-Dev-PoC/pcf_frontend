import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Drilldown from "highcharts/modules/drilldown";
import { Dialog, Title, Button } from "@ui5/webcomponents-react";
import { Point } from "highcharts"; // Import the correct type for points

Drilldown(Highcharts);

const DrillDownBarChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Column Chart with Drilldown",
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
    tooltip: {
      shared: false,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        return `<b>${this.series.name}</b>: ${this.y}`;
      },
    },
    series: [
      {
        name: "Main Data",
        data: [
          {
            name: "Category 1",
            y: 55,
            drilldown: "cat1",
          },
          {
            name: "Category 2",
            y: 35,
            drilldown: "cat2",
          },
          {
            name: "Category 3",
            y: 40,
            drilldown: "cat3",
          },
          {
            name: "Category 4",
            y: 70,
            drilldown: "cat4",
          },
        ],
      },
    ],
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        point: {
          events: {
            click: function (this: Point, event: any) {
              openModal(`You clicked on ${this.name} with value ${this.y}`);
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      {isModalOpen && (
        <Dialog open={isModalOpen} onAfterClose={closeModal}>
          <div style={{ padding: "1rem" }}>{modalContent}</div>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
            <Button design="Emphasized" onClick={closeModal}>
              Close
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default DrillDownBarChart;
