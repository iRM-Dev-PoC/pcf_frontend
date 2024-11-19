import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardHeader } from '@ui5/webcomponents-react';

interface DataItem {
  name: string;
  value: number;
}

const processData = (data: DataItem[]) => {
  return [{
    name: 'User Data', 
    data: data.map(item => item.value),
  }];
};

const BarChart = ({ data = [], title }: { data: DataItem[]; title: string }) => {
  const options = {
    chart: {
      type: 'column', 
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: data.map(item => item.name),
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
          className="p-6 font-bold"
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
