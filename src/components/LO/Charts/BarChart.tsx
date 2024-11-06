// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Card, CardHeader } from '@ui5/webcomponents-react';

// const processData = (data) => {
//   return data.series.map((series) => ({
//     name: series.name,
//     data: series.items.map((item) => item.value),  
//   }));
// };

// const BarChart = ({ data, title }) => {
//   const options = {
//     chart: {
//       type: 'column', 
//     },
//     title: {
//       text: null, 
//     },
//     xAxis: {
//       categories: data.series.map((series) => series.name),
//       title: {
//         text: 'Service',
//       },
//     },
//     yAxis: {
//       title: {
//         text: 'User Count',
//       },
//       min: 0,
//     },
//     series: processData(data),
//     plotOptions: {
//       column: {
//         dataLabels: {
//           enabled: true,
//         },
//       },
//     },
//   };

//   return (
//     <Card
//       header={
//         <CardHeader
//         className='p-6 font-bold'
//           titleText={title}
//         />
//       }
//     >
//       <HighchartsReact 
//       highcharts={Highcharts}
//        options={options}
//         />
//     </Card>
//   );
// };

// export default BarChart;




// comment
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Card, CardHeader } from '@ui5/webcomponents-react';

// const processData = (data) => {
//   return data.series ? data.series.map((series) => ({
//     name: series.name,
//     data: series.items.map((item) => item.value),  
//   })) : [];
// };

// const BarChart = ({ data, title }) => {
//   console.log(data,"sdata")
//   const options = {
//     chart: {
//       type: 'column', 
//     },
//     title: {
//       text: null, 
//     },
//     xAxis: {
//       // categories: data?.map((data) => data.name ) || [],
//       categories: data?.map((dat) => console.log(dat,'dst')) || [],

//       // ategories: data.map((e) => e.name) || [],
//       title: {
//         text: 'Service',
//       },
//     },
//     yAxis: {
//       title: {
//         text: 'User Count',
//       },
//       min: 0,
//     },
//     series: processData(data),
//     plotOptions: {
//       column: {
//         dataLabels: {
//           enabled: true,
//         },
//       },
//     },
//   };

//   return (
//     <Card
//       header={
//         <CardHeader
//           className="p-6 font-bold"
//           titleText={title}
//         />
//       }
//     >
//       <HighchartsReact 
//         highcharts={Highcharts}
//         options={options}
//       />
//     </Card>
//   );
// };

// export default BarChart;




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
