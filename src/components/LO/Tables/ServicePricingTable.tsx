import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
import { Modals } from '@ui5/webcomponents-react';
import ServicePricingEditForm from '../Forms/ServicePricingEditForm';

const SubscriptionTypeTable = () => {
  const showDialog = Modals.useShowDialog();

  const handleButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Edit Service Pricing',
      children: <ServicePricingEditForm/>,
      footer: (
        <Bar
          startContent={
          <>
          <Button onClick={handleSubmit} design="Positive">Update</Button>
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
      Cell: ({ cell }) => <Button icon='edit' onClick={handleButtonClick}></Button>,
      Header: 'Actions',
      accessor: 'actions',
      disableFilters: true,
      disableGroupBy: true,
      disableResizing: true,
      disableSortBy: true,
      autoResizable: true,
      id: 'actions',
      minWidth: 100,
      width: 100
    },
    {
        Header: 'Service Name',
        accessor: 'service.name',
        autoResizable: true,
      },
     
      {
        Header: 'Subscription Type',
        accessor: 'subscription.type',
        autoResizable: true
      },
      {
        Header: 'Subscription Price (In USD)',
        accessor: 'subscriptions.price',
        autoResizable: true
      },
  ];

  const data = [
    {
      service: {
        name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
      },
      subscription: {
        type: 'Monthly'
      },
      subscriptions: {
        price: '150'
      },
    },
      {
        service: {
          name: 'Enterprise Resource Planning Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Annual'
        },
        subscriptions: {
          price: '2400'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Monthly'
        },
        subscriptions: {
          price: '200'
        },
      },
      {
        service: {
          name: 'Enterprise Resource Planning Cloud for Midsize Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Annual'
        },
        subscriptions: {
          price: '4800'
        },
      },
      {
        service: {
          name: 'Goal Management Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Monthly'
        },
        subscriptions: {
          price: '120'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Supply Planning Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Annual'
        },
        subscriptions: {
          price: '8400'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Sales and Operations Planning Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Annual'
        },
        subscriptions: {
          price: '6000'
        },
      },
      {
        service: {
          name: 'Innovation Management Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Annual'
        },
        subscriptions: {
          price: '3600'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Product Management Cloud Service - Hosted Named Users'
        },
        subscription: {
          type: 'Monthly'
        },
        subscriptions: {
          price: '200'
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

export default SubscriptionTypeTable;


