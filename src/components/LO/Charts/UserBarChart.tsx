// import React, { useState } from 'react';
// import { Card, Dialog, Button, Modals } from '@ui5/webcomponents-react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import ChartTopRolesByActiveUserCount from '../Tables/ChartTopRolesByActiveUserCount';
// import { Modal } from '@mui/material';

// interface BarChartProps {
//   categories: string[];
//   data: number[];
//   title?: string;
//   barChartTableData : any[]
// }

// const UserBarChart: React.FC<BarChartProps> = ({ categories, data, title, barChartTableData}) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [clickedBarCategory, setClickedBarCategory] = useState<string | null>(null);
//   const [barChartTableDataModified, setbarChartTableDataModified] = useState<string | null>(null);

//   // const [clickedBarCategory1, setClickedBarCategory1] = useState<string | null>(null);

//   console.log('barChartTableData ', barChartTableData);


//   const options: Highcharts.Options = {
//     chart: {
//       type: 'column',
//     },
//     title: {
//       text: title,
//     },
//     xAxis: {
//       categories,
//       title: {
//         text: null,
//       },
//       labels: {
//         rotation: -45,
//         style: {
//           fontSize: '13px',
//           fontFamily: 'Arial, sans-serif',
//         },
//       },
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: 'Value',
//         align: 'high',
//       },
//       labels: {
//         overflow: 'allow',
//       },
//     },
//     plotOptions: {
//       column: {
//         dataLabels: {
//           enabled: true,
//         },
//         events: {
//           click: (event) => {
//             const point = event.point;
//             const category = categories[point.index];
//             const barChartTableDataEachIndex = barChartTableData[point.index];

//             console.log('barChartTableDataEachIndex ' , barChartTableDataEachIndex)
//             if (category) {
//               setClickedBarCategory(category);
//               setbarChartTableDataModified(barChartTableDataEachIndex);

//               setIsModalOpen(true);
//             }
//           },
//         },
//       },
//     },
//     series: [
//       {
//         name: 'Value',
//         data,
//         type: 'column',
//       },
//     ],
//     credits: {
//       enabled: false,
//     },
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setClickedBarCategory(null);
//   };

//   return (
//     <>
//       <Card>
//         <HighchartsReact highcharts={Highcharts} options={options} />
//       </Card>
//       {isModalOpen && clickedBarCategory && (
//         <Dialog open={isModalOpen} onAfterClose={closeModal}>
//           <div style={{ padding: '16px' }}>
//             <h2>Details for User Role: {clickedBarCategory}</h2>
//             <ChartTopRolesByActiveUserCount series={barChartTableDataModified} /> 
//             <Button onClick={closeModal}>Close</Button>
//           </div>
//         </Dialog>
//       )}
//     </>
//   );
// };

// export default UserBarChart;


import React, { useState } from "react";
import { Card, Bar, Button, Modals } from "@ui5/webcomponents-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ChartTopRolesByActiveUserCount from "../Tables/ChartTopRolesByActiveUserCount";

interface BarChartProps {
  categories: string[];
  data: number[];
  title?: string;
  barChartTableData: any[];
}

const UserBarChart: React.FC<BarChartProps> = ({
  categories,
  data,
  title,
  barChartTableData,
}) => {
  const showDialog = Modals.useShowDialog();

  const openModal = (category: string, barChartData: any) => {
    const { close } = showDialog({
      style: { padding: "6px", width: "50%" },
      headerText: `Details for User Role: ${category}`,
      children: <ChartTopRolesByActiveUserCount series={barChartData} />,
      footer: (
        <Bar
          endContent={
            <Button onClick={() => close()} design="Negative">
              Close
            </Button>
          }
        />
      ),
    });
  };

  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: title,
    },
    xAxis: {
      categories,
      title: {
        text: "Roles",
      },
      // labels: {
      //   rotation: -45,
      //   style: {
      //     fontSize: "13px",
      //     fontFamily: "Arial, sans-serif",
      //   },
      // },
    },
    yAxis: {
      min: 0,
      title: {
        text: "User Count",
        align: "high",
      },
      labels: {
        overflow: "allow",
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
        events: {
          click: (event) => {
            const point = event.point;
            const category = categories[point.index];
            const barChartData = barChartTableData[point.index];

            if (category && barChartData) {
              openModal(category, barChartData);
            }
          },
        },
      },
    },
    series: [
      {
        name: "Value",
        data,
        type: "column",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Card>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
};

export default UserBarChart;
