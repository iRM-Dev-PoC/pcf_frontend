import { AnalyticalTable,Card} from '@ui5/webcomponents-react';

const ChartTopRolesByActiveUserCount = ({ series }) => {
    console.log('series ' +series)
    const columns = series && series.length > 0 
    ? Object.keys(series[0]).map((key) => ({
        Header: key.replace(/_/g, ' '),  // Format the column names
        accessor: key,
        autoResizable: true,
      }))
    : [];

    // const columns = [
    //     {
    //         Header: "Sl No",  // Format the column names
    //         accessor: "Sl No",
    //         autoResizable: true,
    //     },
    //     {
    //         Header: "User Name",  // Format the column names
    //         accessor: "User Name",
    //         autoResizable: true,
    //       },
    //       {
    //         Header: "Full Name",  // Format the column names
    //         accessor: "Full Name",
    //         autoResizable: true,
    //       }

    //     ];

    console.log('columns ', columns);

  return (
    <Card>
      <AnalyticalTable
        columns={columns}
        data={series}
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

export default ChartTopRolesByActiveUserCount;


