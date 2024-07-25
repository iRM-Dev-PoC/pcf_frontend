import { Card } from '@ui5/webcomponents-react';
import React from 'react';
import Plot from 'react-plotly.js';

// Sample data
const data = [
  {
    type: 'box',
    y: [54, 66, 69, 75, 88],
    name: 'Category A',
    boxmean: 'sd',
    marker: { color: 'rgb(219, 64, 82)' }
  },
  {
    type: 'box',
    y: [43, 65, 69, 76, 81],
    name: 'Category B',
    boxmean: 'sd',
    marker: { color: 'rgb(55, 128, 191)' }
  },
  {
    type: 'box',
    y: [31, 39, 45, 51, 59],
    name: 'Category C',
    boxmean: 'sd',
    marker: { color: 'rgb(0, 128, 0)' }
  },
  {
    type: 'box',
    y: [39, 46, 55, 65, 71],
    name: 'Category D',
    boxmean: 'sd',
    marker: { color: 'rgb(255, 165, 0)' }
  },
  {
    type: 'box',
    y: [29, 31, 35, 39, 44],
    name: 'Category E',
    boxmean: 'sd',
    marker: { color: 'rgb(128, 0, 128)' }
  },
  {
    type: 'box',
    y: [41, 49, 58, 61, 67],
    name: 'Category F',
    boxmean: 'sd',
    marker: { color: 'rgb(0, 255, 255)' }
  },
  {
    type: 'box',
    y: [54, 59, 66, 71, 88],
    name: 'Category G',
    boxmean: 'sd',
    marker: { color: 'rgb(255, 20, 147)' }
  }
];

const HorizontalBoxPlotChart = () => {
  return (
    <Card 
    style={{ width: '100%', height: '100%' }}
    >
    <Plot
      data={data}
      layout={{
        title: 'Horizontal BoxPlot Chart',
        xaxis: { title: 'Values' },
        yaxis: {
          title: 'Categories',
          categoryorder: 'total ascending'
        },
        boxmode: 'group'
      }}
      style={{ width: '90%', height: '90%' }}
    />
    </Card>
  );
};

export default HorizontalBoxPlotChart;