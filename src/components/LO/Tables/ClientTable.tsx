// import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
// import { Modals } from '@ui5/webcomponents-react';
// import ClientEditForm from '../Forms/ClientEditForm';
// import ClientLinkForm from '../Forms/ClientLinkForm';

// const ClientTable = () => {
//   const showDialog = Modals.useShowDialog();

//   const handleButtonClick = () => {
//     const { close } = showDialog({
//       headerText: 'Edit Client',
//       children: <ClientEditForm/>,
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
//   const handleLinkButtonClick = () => {
//     const { close } = showDialog({
//       headerText: 'Edit Client Link',
//       children: <ClientLinkForm/>,
//       footer: (
//         <Bar
//           startContent={
//           <>
//           <Button onClick={handleSubmit} design="Emphasized">Submit</Button>
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
//     {
//         Header: 'CLient Name',
//         accessor: 'client.name',
//         autoResizable: true,
//       },
     
//       {
//         Header: 'Description',
//         accessor: 'description.client',
//         autoResizable: true
//       },
//       {
//         Header: 'Functional Currency',
//         accessor: 'functional.currency',
//         autoResizable: true
//       },
//       {
//         Header: 'Start Date',
//         accessor: 'start.date',
//         autoResizable: true
//       },
//       {
//         Header: 'End Date',
//         accessor: 'end.date',
//         autoResizable: true
//       },
//       {
//         Cell: ({ cell }) => <Button icon='chain-link' onClick={handleLinkButtonClick}></Button>,
//         Header: 'Link',
//         accessor: 'link',
//         disableFilters: true,
//         disableGroupBy: true,
//         disableResizing: true,
//         disableSortBy: true,
//         autoResizable: true,
//         id: 'link',
//         minWidth: 100,
//         width: 100
//       },
//   ];

//   const data = [
//     {
//       client: {
//         name: 'Demo'
//       },
//       description: {
//         client: 'Demo 1'
//       },
//       functional: {
//         currency: 'USD'
//       },
//       end: {
//         date: '3/26/2024'
//       },
//       start: {
//         date: '3/31/2024'
//       },
//     },
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

// export default ClientTable;





import { useState } from 'react';
import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
import { Modals } from '@ui5/webcomponents-react';
import ClientEditForm from '../Forms/ClientEditForm';
import ClientLinkForm from '../Forms/ClientLinkForm';
import ClientCreationForm from '../Forms/ClientCreationForm'; // Import client creation form

const ClientTable = () => {
  const [clients, setClients] = useState([
    {
      client: {
        name: 'Demo'
      },
      description: {
        client: 'Demo 1'
      },
      functional: {
        currency: 'USD'
      },
      end: {
        date: '3/26/2024'
      },
      start: {
        date: '3/31/2024'
      },
    },
  ]);

  const showDialog = Modals.useShowDialog();

  // Function to handle client creation form submission
  const handleCreateSubmit = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]); // Add new client to the table data
  };

  // Function to handle deleting a client
  const handleDeleteClient = (index) => {
    setClients((prevClients) => prevClients.filter((_, i) => i !== index)); // Remove client by index
  };

  const handleButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Edit Client',
      children: <ClientEditForm />,
      footer: (
        <Bar
          startContent={
            <>
              <Button onClick={() => close()} design="Positive">Update</Button>
            </>
          }
          endContent={
            <>
              <Button onClick={() => close()} design="Negative">Close</Button>
            </>
          }
        />
      )
    });
  };

  const handleLinkButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Edit Client Link',
      children: <ClientLinkForm />,
      footer: (
        <Bar
          startContent={
            <>
              <Button onClick={() => close()} design="Emphasized">Submit</Button>
            </>
          }
          endContent={
            <>
              <Button onClick={() => close()} design="Negative">Close</Button>
            </>
          }
        />
      )
    });
  };

  const handleCreateButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Create New Client',
      children: <ClientCreationForm onSubmit={handleCreateSubmit} />, // Pass the onSubmit handler to form
      footer: (
        <Bar
          startContent={
            <>
              <Button design="Positive" onClick={() => close()}>Create</Button>
            </>
          }
          endContent={
            <>
              <Button onClick={() => close()} design="Negative">Close</Button>
            </>
          }
        />
      )
    });
  };

  const columns = [
    {
      Cell: ({ row }) => (
        <>
          <Button icon="edit" onClick={handleButtonClick}></Button>
          {/* New delete button */}
          <Button icon="delete" design="Negative" onClick={() => handleDeleteClient(row.index)}></Button>
        </>
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
      width: 150
    },
    {
      Header: 'Client Name',
      accessor: 'client.name',
      autoResizable: true,
    },
    {
      Header: 'Description',
      accessor: 'description.client',
      autoResizable: true
    },
    {
      Header: 'Functional Currency',
      accessor: 'functional.currency',
      autoResizable: true
    },
    {
      Header: 'Start Date',
      accessor: 'start.date',
      autoResizable: true
    },
    {
      Header: 'End Date',
      accessor: 'end.date',
      autoResizable: true
    },
    {
      Cell: () => <Button icon="chain-link" onClick={handleLinkButtonClick}></Button>,
      Header: 'Link',
      accessor: 'link',
      disableFilters: true,
      disableGroupBy: true,
      disableResizing: true,
      disableSortBy: true,
      autoResizable: true,
      id: 'link',
      minWidth: 100,
      width: 100
    },
  ];

  return (
    <Card>
      {/* Bar with Create Client button */}
      <Bar
        startContent={<Button design="Emphasized" onClick={handleCreateButtonClick}>Create Client</Button>}
      />
      <AnalyticalTable
        columns={columns}
        data={clients} // Table data is now dynamic, based on state
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

export default ClientTable;

