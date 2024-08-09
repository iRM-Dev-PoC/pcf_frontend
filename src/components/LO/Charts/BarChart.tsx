import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardHeader } from '@ui5/webcomponents-react';

const processData = (data) => {
  return data.series.map((series) => ({
    name: series.name,
    data: series.items.map((item) => item.value),
  }));
};

const BarChart = ({ data, title }) => {
  const options = {
    chart: {
      type: 'column', 
    },
    title: {
      text: null, 
    },
    xAxis: {
      categories: data.series.map((series) => series.name),
      title: {
        text: 'Service',
      },
    },
    yAxis: {
      title: {
        text: 'User Count',
      },
      min: 0,
    },
    series: processData(data),
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
  };

  return (
    <Card
      header={
        <CardHeader
        className='p-6 font-bold'
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

export default BarChart;
