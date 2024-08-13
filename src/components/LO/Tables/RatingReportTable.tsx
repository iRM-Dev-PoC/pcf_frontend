import { AnalyticalTable,Card} from '@ui5/webcomponents-react';

const RatingReportTable = () => {


  const columns = [
   
    {
        Header: 'Range Catagory',
        accessor: 'range.category',
        autoResizable: true,
      },
     
      {
        Header: 'Ratings',
        accessor: 'rating.name',
        autoResizable: true
      },
  ];

  const data = [
    {
      range: {
        category: '>= 1.5 * median_price'
      },
      rating: {
        name: "Highly Critical"
      },
    },
      {
        range: {
          category: '>= 1.2 * median_price'
        },
        rating: {
          name: "Critical"
        },
      },
      {
        range: {
          category: '>= 0.8 * median_price'
        },
        rating: {
          name: "Low"
        },
      },
      {
        range: {
          category: '< 0.8 * median_price'
        },
        rating: {
          name: "Very Low"
        },
      },
  ];

  return (
    <Card>
      <AnalyticalTable
        columns={columns}
        data={data}
        filterable
        groupBy={[]}
        groupable
        infiniteScroll
        onAutoResize={() => { }}
        onColumnsReorder={() => { }}
        onGroup={() => { }}
        onLoadMore={() => { }}
        onRowClick={() => { }}
        onRowExpandChange={() => { }}
        onRowSelect={() => { }}
        onSort={() => { }}
        onTableScroll={() => { }}
      />
    </Card>
  );
};

export default RatingReportTable;


