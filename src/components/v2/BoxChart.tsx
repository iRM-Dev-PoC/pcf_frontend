// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import HighchartsMore from 'highcharts/highcharts-more';

// // Initialize the HighchartsMore module
// HighchartsMore(Highcharts);

// const BoxChart = () => {
//   const options = {
//     chart: {
//       type: 'boxplot'
//     },
//     title: {
//       text: 'Box Plot Chart'
//     },
//     xAxis: {
//       categories: ['A', 'B', 'C', 'D', 'E'],
//       title: {
//         text: 'Categories'
//       }
//     },
//     yAxis: {
//       title: {
//         text: 'Values'
//       }
//     },
//     series: [{
//       name: 'Observations',
//       data: [
//         [1, 5, 7, 10, 12],
//         [2, 6, 9, 11, 14],
//         [3, 7, 8, 12, 15],
//         [4, 6, 10, 13, 16],
//         [5, 7, 11, 14, 18]
//       ],
//       tooltip: {
//         headerFormat: '<em>Category {point.key}</em><br/>'
//       }
//     }]
//   };

//   return (
//     <HighchartsReact
//       highcharts={Highcharts}
//       options={options}
//     />
//   );
// };

// export default BoxChart;import Highcharts from 'highcharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { useEffect, useState } from 'react';

HighchartsMore(Highcharts);

type BoxChartProps = {
  title?: string;
  boxPloting: {
    categories: string[];
    data: number[];
  };
};

const BoxChart = ({
  title = 'Box Plot Chart',
  boxPloting
}: BoxChartProps) => {
  const { categories, data } = boxPloting;
//   console.log('box data', data);

  const [options, setOptions] = useState({
    chart: {
      type: 'boxplot'
    },
    title: {
      text: title
    },
    xAxis: {
      categories: categories,
      title: {
        text: 'Categories'
      }
    },
    yAxis: {
      title: {
        text: 'Values'
      }
    },
    series: [{
      name: 'Observations',
      data: data,
      tooltip: {
        headerFormat: '<em>Category {point.key}</em><br/>'
      }
    }]
  });

  // Update options dynamically when props change
  useEffect(() => {
    setOptions({
      chart: {
        type: 'boxplot'
      },
      title: {
        text: title
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Categories'
        }
      },
      yAxis: {
        title: {
          text: 'Values'
        }
      },
      series: [{
        name: 'Observations',
        data: data,
        tooltip: {
          headerFormat: '<em>Category {point.key}</em><br/>'
        }
      }]
    });
  }, [title, categories, data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default BoxChart;
