import { AnalyticalTable,Card} from '@ui5/webcomponents-react';

const TopUsersTable = () => {

  const columns = [
   
    {
        Header: 'Range Catagory',
        accessor: 'range.category',
        autoResizable: true,
      },
     
      {
        Header: 'Ratings',
        accessor: 'rating.name',
        autoResizable: true,
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

export default TopUsersTable;


