// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import ReactApexChart from 'react-apexcharts';

// const BoxPlot = () => {
//   const [chartState, setChartState] = useState({
//     series: [
//       {
//         data: [
//           {
//             x: 'Category A',
//             y: [54, 66, 69, 75, 88]
//           },
//           {
//             x: 'Category B',
//             y: [43, 65, 69, 76, 81]
//           },
//           {
//             x: 'Category C',
//             y: [31, 39, 45, 51, 59]
//           },
//           {
//             x: 'Category D',
//             y: [39, 46, 55, 65, 71]
//           },
//           {
//             x: 'Category E',
//             y: [29, 31, 35, 39, 44]
//           },
//           {
//             x: 'Category F',
//             y: [41, 49, 58, 61, 67]
//           },
//           {
//             x: 'Category G',
//             y: [54, 59, 66, 71, 88]
//           }
//         ]
//       }
//     ],
//     parameters: {
//       chart: {
//         type: 'boxPlot' as const, // Ensuring type is 'boxPlot'
//         height: 350
//       },
//       title: {
//         text: 'Horizontal BoxPlot Chart',
//         align: 'left'
//       },
//       plotOptions: {
//         bar: {
//           horizontal: true,
//           barHeight: '50%'
//         },
//         boxPlot: {
//           colors: {
//             upper: '#e9ecef',
//             lower: '#f8f9fa'
//           }
//         }
//       },
//       stroke: {
//         colors: ['#6c757d']
//       }
//     }
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart
//           parameters={chartState. parameters}
//           series={chartState.series}
//           type="boxPlot"
//           height={350}
//         />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default BoxPlot;

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Sample data
// const data = [
//   {
//     name: 'A',
//     min: 10,
//     q1: 20,
//     median: 30,
//     q3: 40,
//     max: 50
//   },
//   {
//     name: 'B',
//     min: 15,
//     q1: 25,
//     median: 35,
//     q3: 45,
//     max: 55
//   },
//   // Add more data points as needed
// ];

// const BoxPlotChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         {/* BoxPlot representation */}
//         <Bar dataKey="max" fill="#8884d8" />
//         <Bar dataKey="q3" fill="#82ca9d" />
//         <Bar dataKey="median" fill="#ffc658" />
//         <Bar dataKey="q1" fill="#d0ed57" />
//         <Bar dataKey="min" fill="#a4de6c" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default BoxPlotChart;


import { Card } from '@ui5/webcomponents-react';
import React from 'react';
import Plot from 'react-plotly.js';

// Sample data
const data = [
  {
    type: 'box',
    y: [10, 20, 30, 40, 50],
    name: 'Group A',
    marker: { color: 'rgb(219, 64, 82)' }
  },
  {
    type: 'box',
    y: [15, 25, 35, 45, 55],
    name: 'Group B',
    marker: { color: 'rgb(55, 128, 191)' }
  },
  {
    type: 'box',
    y: [20, 40, 60, 80, 100],
    name: 'Group C',
    marker: { color: '#8884d8' }
  },
  {
    type: 'box',
    y: [5, 10, 15, 20, 25],
    name: 'Group D',
    marker: { color: '#d0ed57' }
  },
];

const BoxPlotChart = () => {
  return (
    <Card
    style={{ width: '100%', height: '100%' }}
    >
    <Plot
      data={data}
      layout={{
        title: 'BoxPlot Chart',
        xaxis: { title: 'Group' },
        yaxis: { title: 'Values' },
      }}
      style={{ width: '90%', height: '90%' }}
    />
    </Card>
  );
};

export default BoxPlotChart;

