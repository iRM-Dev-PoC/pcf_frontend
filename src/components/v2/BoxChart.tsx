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
