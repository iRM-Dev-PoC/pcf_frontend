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

  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    title: {
      text: null, 
    },
    plotOptions: {
      pie: {
        depth: 45
      }
    },
    series: [
      {
        name: 'Roles',
        data: transformedData,
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
