import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import { Card, CardHeader } from '@ui5/webcomponents-react';

// Initialize the Highcharts 3D module
Highcharts3D(Highcharts);

const PieChart = ({ data, title }) => {
  const transformedData = data.series.map(item => ({
    name: item.name,
    y: item.items[0].value
  })); 

  // const options = {
  //   chart: {
  //     type: 'pie',
  //     options3d: {
  //       enabled: true,
  //       alpha: 45,
  //       beta: 0
  //     }
  //   },
  //   title: {
  //     text: null, 
  //   },
  //   plotOptions: {
  //     pie: {
  //       depth: 45
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'Roles',
  //       data: transformedData,
  //     },
  //   ],
  // };
  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      },
    },
    title: {
      text: null,
    },
    colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A5', '#A533FF'], // Custom colors array
    plotOptions: {
      pie: {
        depth: 45,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}'
        }
      }
    },
    series: [
      {
        name: 'Roles',
        data: transformedData.map((item, index) => ({
          ...item,
          color: ['#FF5733', '#33FF57', '#3357FF', '#FF33A5', '#A533FF','#00FFFF','#F0FFFF','#7FFFD4'][index % 8] // Assign color by index
        }))
      },
    ],
  };
  

  return (
    <Card
      header={
        <CardHeader
        // className='p-6'
        style={{ padding: '6px' }}
          titleText={title}
        />
      }
    >
      <HighchartsReact
       highcharts={Highcharts}
       options={options}
      />
    </Card>
  );
};

export default PieChart;


// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import { Card, CardHeader } from '@ui5/webcomponents-react';

// // Initialize the Highcharts 3D module
// Highcharts3D(Highcharts);

// const PieChart = ({ data, title }) => {
//   const transformedData = data.series.map(item => ({
//     name: item.name,
//     y: item.items[0].value
//   })); 

//   const options = {
//     chart: {
//       type: 'pie',
//       options3d: {
//         enabled: true,
//         alpha: 45,
//         beta: 0
//       },
//       animation: {
//         duration: 1000, // Smooth entry animations
//         easing: 'easeOutBounce' // Ease effect for the animation
//       },
//       responsive: {
//         rules: [
//           {
//             condition: {
//               maxWidth: 500 // If the width is less than 500px
//             },
//             chartOptions: {
//               legend: {
//                 align: 'center',
//                 verticalAlign: 'bottom',
//                 layout: 'horizontal'
//               },
//               plotOptions: {
//                 pie: {
//                   size: '70%' // Reduce pie size on small screens
//                 }
//               }
//             }
//           }
//         ]
//       }
//     },
//     title: {
//       text: null,
//     },
//     plotOptions: {
//       pie: {
//         depth: 45,
//         allowPointSelect: true, // Enable slice selection
//         cursor: 'pointer',
//         animation: {
//           duration: 1500, // Smooth expand/shrink animations
//           easing: 'easeOutExpo'
//         },
//         dataLabels: {
//           enabled: true,
//           format: '{point.name}: {point.y:.1f}' // Display values on the chart
//         }
//       }
//     },
//     tooltip: {
//       pointFormat: '{series.name}: <b>{point.y:.1f}</b>', // Tooltip with animation
//       animation: true
//     },
//     series: [
//       {
//         name: 'Roles',
//         data: transformedData,
//       },
//     ],
//   };

//   return (
//     <Card
//       header={
//         <CardHeader
//           style={{ padding: '6px' }}
//           titleText={title}
//         />
//       }
//     >
//       <HighchartsReact
//        highcharts={Highcharts}
//        options={options}
//       />
//     </Card>
//   );
// };

// export default PieChart;
