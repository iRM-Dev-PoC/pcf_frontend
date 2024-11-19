// import { AnalyticalTable,Card} from '@ui5/webcomponents-react';

// const TopUsersTable = ({ data, title }) => {
//   const columns = [
//     { Header: 'Role Name', accessor: 'ROLE NAME' },
//     { Header: 'User Count', accessor: 'USER COUNT' },
//   ];

//   return (
//     <Card header={title}>
//       <AnalyticalTable columns={columns} data={data} />
//     </Card>
//   );

//   return (
//     <Card>
//       <AnalyticalTable
//         columns={columns}
//         data={data}
//         filterable
//         groupBy={[]}
//         groupable
//         infiniteScroll
//         onAutoResize={() => { }}
//         onColumnsReorder={() => { }}
//         onGroup={() => { }}
//         onLoadMore={() => { }}
//         onRowClick={() => { }}
//         onRowExpandChange={() => { }}
//         onRowSelect={() => { }}
//         onSort={() => { }}
//         onTableScroll={() => { }}
//       />
//     </Card>
//   );
// };

// export default TopUsersTable;

import { AnalyticalTable, Card } from '@ui5/webcomponents-react';

const TopUsersTable = ({ data, title }) => {
  const columns = data && data.length > 0 
    ? Object.keys(data[0]).map((key) => ({
        Header: key.replace(/_/g, ' '), 
        accessor: key,
        autoResizable: true,
      }))
    : [];

  return (
    <Card>
      <AnalyticalTable
        className='p-5'
        header={title}
        columns={columns}
        data={data}
        filterable
        groupable
        infiniteScroll
      />
     </Card>
  );
};

export default TopUsersTable;
