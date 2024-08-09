import { Card, AnalyticalTable } from "@ui5/webcomponents-react";

const UserTable = () => {
  
    const columns = [
      {
        Header: 'Service Name',
        accessor: 'service.name',
        autoResizable: true
      },
      {
        Header: 'User Login',
        accessor: 'user.login',
        autoResizable: true,
      },
      {
        Header: 'Privelege',
        accessor: 'privelge',
        autoResizable: true
      },
      {
        Header: 'Role Code',
        accessor: 'role.code',
        autoResizable: true
      },
      {
        Header: 'Role Name',
        accessor: 'role.name',
        autoResizable: true
      },
      {
        Header: 'Privelege Code',
        accessor: 'privelege.code',
        autoResizable: true,
      },
      {
        Header: 'Business Unit',
        accessor: 'business.unit',
        autoResizable: true,
      },
      {
        Header: 'Manager name',
        accessor: 'manager.name',
        autoResizable: true,
      },
      {
        Header: 'Cost Per User',
        accessor: 'cost.per.user',
        autoResizable: true,
      },
    ];
  
    const data = [
      {
        service: {
          name: 'Innovation Management Cloud Service - Hosted Named Users, Oracle Fusion Supply Chain Collaboration Cloud Service - Hosted Named Users'
        },
        user: {
            login: 'Bala Gupta'
          },
          
        
      },
      {
        user: {
          login: 'jennie.molina'
        },
        status: {
          rating: 'B'
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
  )
}

export default UserTable
