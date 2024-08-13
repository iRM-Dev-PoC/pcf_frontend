import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
import { Modals } from '@ui5/webcomponents-react';
import RecalculateModal from '../Forms/RecalculateModal';
import { Badge } from '../../ui/badge';

const MyAnalyticalTable = () => {
  const showDialog = Modals.useShowDialog();

  const handleButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Recalculate Price',
      children: <RecalculateModal />,
      footer: (
        <Bar
          startContent={
          <>
          <Button onClick={handleSubmit} design="Emphasized">Submit</Button>
          </>}
          endContent={
            <>
              <Button onClick={() => close()} design="Negative">Close</Button>
            </>
          }
        />
      )
    });
  };

  const handleSubmit = () => {
    // Handle the submit action here
    console.log('Submit button clicked');
  };

  const columns = [
    {
      Header: 'User Login',
      accessor: 'user.login',
      autoResizable: true,
    },
    {
      Header: 'Status Rating',
      accessor: 'status.rating',
      autoResizable: true,
      Cell: ({ cell }) => <Badge style={{ backgroundColor: "red", width: "50px" }}>{cell.value}</Badge>,
    },
    {
      Header: 'Service Name',
      accessor: 'service.name',
      autoResizable: true
    },
    {
      Header: 'Total Price',
      accessor: 'total.price',
      autoResizable: true
    },
    {
      Header: 'Sync ID',
      accessor: 'sync.id',
      autoResizable: true
    },
    {
      Header: 'Recalculated Price',
      accessor: 'recalculated.price',
      autoResizable: true
    },
    {
      Cell: ({ cell }) => <Button icon='collections-management' onClick={handleButtonClick}></Button>,
      Header: 'Actions',
      accessor: 'actions',
      disableFilters: true,
      disableGroupBy: true,
      disableResizing: true,
      disableSortBy: true,
      id: 'actions',
      minWidth: 100,
      width: 100
    }
  ];

  const data = [
    {
      user: {
        login: 'Bala Gupta'
      },
      status: {
        rating: "! Low"
      },
      service: {
        name: 'Innovation Management Cloud Service - Hosted Named Users, Oracle Fusion Supply Chain Collaboration Cloud Service - Hosted Named Users'
      },
      total: {
        price: '500 USD'
      },
      sync: {
        id: 'SYNC-1'
      },
      recalculated: {
        price: 'USD'
      },
    },
    {
      user: {
        login: 'jennie.molina'
      },
      status: {
        rating: '! Low'
      },
      service: {
        name: 'Service 2'
      },
      total: {
        price: '200 USD'
      },
      sync: {
        id: 'sync456'
      },
      recalculated: {
        price: '210 USD'
      },
    }
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

export default MyAnalyticalTable;
