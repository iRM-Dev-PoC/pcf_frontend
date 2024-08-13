import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
import { Modals } from '@ui5/webcomponents-react';
import SubscriptionEditForm from '../Forms/SubscriptionEditForm';

const SubscriptionTypeTable = () => {
  const showDialog = Modals.useShowDialog();

  const handleButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Add/Edit Subscription Type',
      children: <SubscriptionEditForm/>,
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
        Header: 'Plan',
        accessor: 'plan.name',
        autoResizable: true,
      },
     
      {
        Header: 'Is Active',
        accessor: 'is.active',
        autoResizable: true
      },
  ];

  const data = [
    {
      plan: {
        name: 'Monthly'
      },
      is: {
        active: "Y"
      },
    },
    {
        plan: {
          name: 'Annual'
        },
        is: {
          active: "Y"
        },
      },
      {
        plan: {
          name: 'Monthly'
        },
        is: {
          active: "Y"
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


