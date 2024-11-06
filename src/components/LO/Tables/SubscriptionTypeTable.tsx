// import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
// import { Modals } from '@ui5/webcomponents-react';
// import SubscriptionEditForm from '../Forms/SubscriptionEditForm';

// const SubscriptionTypeTable = () => {
//   const showDialog = Modals.useShowDialog();

//   const handleButtonClick = () => {
//     const { close } = showDialog({
//       headerText: 'Edit Subscription Type',
//       children: <SubscriptionEditForm/>,
//       footer: (
//         <Bar
//           startContent={
//           <>
//           <Button onClick={handleSubmit} design="Positive">Update</Button>
//           </>}
//           endContent={
//             <>
//               <Button onClick={() => close()} design="Negative">Close</Button>
//             </>
//           }
//         />
//       )
//     });
//   };

//   const handleSubmit = () => {
//     // Handle the submit action here
//     console.log('Submit button clicked');
//   };

//   const columns = [
//     {
//       Cell: ({ cell }) => <Button icon='edit' onClick={handleButtonClick}></Button>,
//       Header: 'Actions',
//       accessor: 'actions',
//       disableFilters: true,
//       disableGroupBy: true,
//       disableResizing: true,
//       disableSortBy: true,
//       autoResizable: true,
//       id: 'actions',
//       minWidth: 100,
//       width: 100
//     },
//     // {
//     //   Cell: ({ cell }) => <Button icon='delete'></Button>,
//     //   Header: 'Actions',
//     //   accessor: 'actions',
//     //   disableFilters: true,
//     //   disableGroupBy: true,
//     //   disableResizing: true,
//     //   disableSortBy: true,
//     //   autoResizable: true,
//     //   id: 'actions',
//     //   minWidth: 100,
//     //   width: 100
//     // },
//     {
//         Header: 'Plan',
//         accessor: 'plan.name',
//         autoResizable: true,
//       },
     
//       {
//         Header: 'Is Active',
//         accessor: 'is.active',
//         autoResizable: true
//       },
//   ];

//   const data = [
//     {
//       plan: {
//         name: 'Monthly'
//       },
//       is: {
//         active: "Y"
//       },
//     },
//     {
//         plan: {
//           name: 'Annual'
//         },
//         is: {
//           active: "Y"
//         },
//       },
//       {
//         plan: {
//           name: 'Monthly'
//         },
//         is: {
//           active: "Y"
//         },
//       },
//   ];

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

// export default SubscriptionTypeTable;



// import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
// import { Modals } from '@ui5/webcomponents-react';
// import SubscriptionEditForm from '../Forms/SubscriptionEditForm';
// import { useState } from 'react';

// const SubscriptionTypeTable = () => {
//   const showDialog = Modals.useShowDialog();
//   const [tableData, setTableData] = useState([
//     {
//       plan: { name: 'Monthly' },
//       is: { active: 'Y' },
//     },
//     {
//       plan: { name: 'Annual' },
//       is: { active: 'Y' },
//     },
//     {
//       plan: { name: 'Monthly' },
//       is: { active: 'Y' },
//     },
//   ]);

//   const handleButtonClick = () => {
//     const { close } = showDialog({
//       headerText: 'Edit Subscription Type',
//       children: <SubscriptionEditForm />,
//       footer: (
//         <Bar
//           startContent={
//             <>
//               <Button onClick={handleSubmit} design="Positive">
//                 Update
//               </Button>
//             </>
//           }
//           endContent={
//             <>
//               <Button onClick={() => close()} design="Negative">
//                 Close
//               </Button>
//             </>
//           }
//         />
//       ),
//     });
//   };

//   const handleSubmit = () => {
//     // Handle the submit action here
//     console.log('Submit button clicked');
//   };

//   const handleDelete = (rowIndex) => {
//     const newData = tableData.filter((_, index) => index !== rowIndex);
//     setTableData(newData);
//     console.log(`Row ${rowIndex} deleted`);
//   };

//   const columns = [
//     {
//       Cell: ({ cell }) => (
//         <Button icon="edit" onClick={handleButtonClick}></Button>
//       ),
//       Header: 'Actions',
//       accessor: 'actions',
//       disableFilters: true,
//       disableGroupBy: true,
//       disableResizing: true,
//       disableSortBy: true,
//       autoResizable: true,
//       id: 'actions',
//       minWidth: 100,
//       width: 100,
//     },
//     {
//       Cell: ({ row }) => (
//         <Button icon="delete" onClick={() => handleDelete(row.index)}></Button>
//       ),
//       Header: 'Delete',
//       accessor: 'delete',
//       disableFilters: true,
//       disableGroupBy: true,
//       disableResizing: true,
//       disableSortBy: true,
//       autoResizable: true,
//       id: 'delete',
//       minWidth: 100,
//       width: 100,
//     },
//     {
//       Header: 'Plan',
//       accessor: 'plan.name',
//       autoResizable: true,
//     },
//     {
//       Header: 'Is Active',
//       accessor: 'is.active',
//       autoResizable: true,
//     },
//   ];

//   return (
//     <Card>
//       <AnalyticalTable
//         columns={columns}
//         data={tableData}
//         filterable
//         groupBy={[]}
//         groupable
//         infiniteScroll
//         onAutoResize={() => {}}
//         onColumnsReorder={() => {}}
//         onGroup={() => {}}
//         onLoadMore={() => {}}
//         onRowClick={() => {}}
//         onRowExpandChange={() => {}}
//         onRowSelect={() => {}}
//         onSort={() => {}}
//         onTableScroll={() => {}}
//       />
//     </Card>
//   );
// };

// export default SubscriptionTypeTable;



import { AnalyticalTable, Button, Card, Bar, FlexBox } from '@ui5/webcomponents-react';
import { Modals } from '@ui5/webcomponents-react';
import SubscriptionEditForm from '../Forms/SubscriptionEditForm';
import { useState } from 'react';

const SubscriptionTypeTable = () => {
  const showDialog = Modals.useShowDialog();
  
  const [tableData, setTableData] = useState([
    { plan: { name: 'Monthly' }, is: { active: 'Y' } },
    { plan: { name: 'Annual' }, is: { active: 'Y' } },
    { plan: { name: 'Weekly' }, is: { active: 'N' } },
    { plan: { name: 'Daily' }, is: { active: 'Y' } },
    { plan: { name: 'Quarterly' }, is: { active: 'N' } },
    { plan: { name: 'Weekly' }, is: { active: 'N' } },
    { plan: { name: 'Daily' }, is: { active: 'Y' } },
    { plan: { name: 'Quarterly' }, is: { active: 'N' } },
  ]);
  
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5; // Number of items per page

  const handleButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Edit Subscription Type',
      children: <SubscriptionEditForm />,
      footer: (
        <Bar
          startContent={
            <Button onClick={handleSubmit} design="Positive">Update</Button>
          }
          endContent={
            <Button onClick={() => close()} design="Negative">Close</Button>
          }
        />
      ),
    });
  };

  const handleSubmit = () => {
    // Handle the submit action here
    console.log('Submit button clicked');
  };

  const handleDelete = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
    console.log(`Row ${rowIndex} deleted`);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(tableData.length / pageSize) - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const columns = [
    {
      Cell: ({ cell }) => (
        <Button icon="edit" onClick={handleButtonClick}></Button>
      ),
      Header: 'Actions',
      accessor: 'actions',
      disableFilters: true,
      disableGroupBy: true,
      disableResizing: true,
      disableSortBy: true,
      autoResizable: true,
      id: 'actions',
      minWidth: 100,
      width: 100,
    },
    {
      Cell: ({ row }) => (
        <Button icon="delete" onClick={() => handleDelete(row.index)}></Button>
      ),
      Header: 'Delete',
      accessor: 'delete',
      disableFilters: true,
      disableGroupBy: true,
      disableResizing: true,
      disableSortBy: true,
      autoResizable: true,
      id: 'delete',
      minWidth: 100,
      width: 100,
    },
    {
      Header: 'Plan',
      accessor: 'plan.name',
      autoResizable: true,
    },
    {
      Header: 'Is Active',
      accessor: 'is.active',
      autoResizable: true,
    },
  ];

  // Paginate data
  const paginatedData = tableData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <Card>
      <AnalyticalTable
        columns={columns}
        data={paginatedData}
        filterable
        groupBy={[]}
        groupable
        infiniteScroll
        onAutoResize={() => {}}
      />
      <FlexBox justifyContent="SpaceBetween" alignItems="Center" style={{ marginTop: '1rem' }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 0}>Previous</Button>
        <Button onClick={handleNextPage} disabled={(currentPage + 1) * pageSize >= tableData.length}>Next</Button>
      </FlexBox>
    </Card>
  );
};

export default SubscriptionTypeTable;

