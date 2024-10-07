import { Card, CardHeader } from '@ui5/webcomponents-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TrendAnalysisChart = () => {
  const options = {
    title: {
      text: 'Yearly Trend Analysis with Monthly Drill-Down',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: 'Months'
      }
    },
    yAxis: {
      title: {
        text: 'Values'
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true
    },
    series: [
      {
        name: '2023',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        drilldown: '2023'
      },
      {
        name: '2024',
        data: [39.9, 61.5, 96.4, 119.2, 154.0, 166.0, 125.6, 138.5, 206.4, 184.1, 85.6, 64.4],
        drilldown: '2024'
      },
      // Add more years as needed
    ],
    drilldown: {
      series: [
        {
          id: '2023',
          data: [
            ['Jan', 29.9], ['Feb', 71.5], ['Mar', 106.4], ['Apr', 129.2],
            ['May', 144.0], ['Jun', 176.0], ['Jul', 135.6], ['Aug', 148.5],
            ['Sep', 216.4], ['Oct', 194.1], ['Nov', 95.6], ['Dec', 54.4]
          ]
        },
        {
          id: '2024',
          data: [
            ['Jan', 39.9], ['Feb', 61.5], ['Mar', 96.4], ['Apr', 119.2],
            ['May', 154.0], ['Jun', 166.0], ['Jul', 125.6], ['Aug', 138.5],
            ['Sep', 206.4], ['Oct', 184.1], ['Nov', 85.6], ['Dec', 64.4]
          ]
        },
        // Add drill-down data for more years as needed
      ]
    }
  };

  return (
    <Card
    header={
      <CardHeader
      className='p-6'
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

export default TrendAnalysisChart;
