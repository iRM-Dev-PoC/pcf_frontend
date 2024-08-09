import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_exporting from 'highcharts/modules/exporting';
import { Card, CardHeader } from '@ui5/webcomponents-react';

// Initialize exporting module
HC_exporting(Highcharts);

const StackedColumnChart = ({ data, categories, title }) => {
  const options = {
    chart: {
      type: 'column'  // Use 'column' for vertical stacked bars
    },
    title: {
      text: null
    },
    xAxis: {
      categories: categories  // Use imported categories
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total amount'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.defaultOptions.legend?.backgroundColor || '#FFFFFF'),
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal'  // Enable stacking
      }
    },
    series: data  // Use imported series data
  };

  return (
    <Card
      header={
        <CardHeader
        className='p-6'
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

export default StackedColumnChart;
