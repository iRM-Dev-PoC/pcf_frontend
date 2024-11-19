import { Card } from '@ui5/webcomponents-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface BarChartProps {
  categories: string[]; 
  data: number[];       
  title?: string;      
}

const HorizontalBarChart: React.FC<BarChartProps> = ({ categories, data, title  }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: title,
    },
    xAxis: {
      categories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Value',
        align: 'high',
      },
      labels: {
        overflow:'allow'
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Value',
        data,
        type: 'bar',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <Card> <HighchartsReact highcharts={Highcharts} options={options} /> </Card>;
};

export default HorizontalBarChart;
