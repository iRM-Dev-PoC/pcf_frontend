import { AnalyticalTable, Button, Card, Bar } from '@ui5/webcomponents-react';
import { Modals } from '@ui5/webcomponents-react';
import CostConversionEditForm from '../Forms/CostConversionEditForm';

const CostConversionTable = () => {
  const showDialog = Modals.useShowDialog();

  const handleButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Edit Cost-Conversion',
      children: <CostConversionEditForm/>,
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
        Header: 'Currency',
        accessor: 'currency.name',
        autoResizable: true,
      },
     
      {
        Header: 'Code',
        accessor: 'code.rate',
        autoResizable: true
      },
      {
        Header: 'Exchange Rate',
        accessor: 'exchange.rate',
        autoResizable: true
      },
  ];

  const data = [
    {
      currency: {
        name: 'Euro'
      },
      code: {
        rate: "EUR"
      },
      exchange: {
        rate: "0.90"
      },
    },
    {
        currency: {
          name: 'Canadian Dollar'
        },
        code: {
          rate: "CAD"
        },
        exchange: {
          rate: "1.22"
        },
      },
      {
        currency: {
          name: 'Chinese Yuan'
        },
        code: {
          rate: "CNY"
        },
        exchange: {
          rate: "6.39"
        },
      },
      {
        currency: {
          name: 'Brazilian Real'
        },
        code: {
          rate: "BRL"
        },
        exchange: {
          rate: "5.22"
        },
      },
      {
        currency: {
          name: 'US Dollar'
        },
        code: {
          rate: "USD"
        },
        exchange: {
          rate: "1.00"
        },
      },
      {
        currency: {
          name: 'British Pound'
        },
        code: {
          rate: "GBP"
        },
        exchange: {
          rate: "0.72"
        },
      },
      {
        currency: {
          name: 'Japanese Yen'
        },
        code: {
          rate: "JPY"
        },
        exchange: {
          rate: "109.53"
        },
      },
      {
        currency: {
          name: 'Australian Dollar'
        },
        code: {
          rate: "AUD"
        },
        exchange: {
          rate: "1.29"
        },
      },
      {
        currency: {
          name: 'Swiss Franc'
        },
        code: {
          rate: "CHF"
        },
        exchange: {
          rate: "74.21"
        },
      },
      {
        currency: {
          name: 'Indian Rupee'
        },
        code: {
          rate: "INR"
        },
        exchange: {
          rate: "74.21"
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

export default CostConversionTable;


