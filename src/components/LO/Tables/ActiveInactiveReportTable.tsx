import { AnalyticalTable, Card, TabContainer, Tab } from '@ui5/webcomponents-react';

const ActiveInactiveReportTable = () => {

  const columns = [
    {
      Header: 'Service Name',
      accessor: 'service.name',
      autoResizable: true,
    },
    {
      Header: 'User Login',
      accessor: 'user.login',
      autoResizable: true
    },
    {
      Header: 'Privilege',
      accessor: 'privilege.name',
      autoResizable: true
    },
    {
      Header: 'Role Code',
      accessor: 'role.code',
      autoResizable: true
    },
    {
      Header: 'Last Name',
      accessor: 'last.name',
      autoResizable: true
    },
    {
        Header: 'First Name',
        accessor: 'first.name',
        autoResizable: true,
      },
      {
        Header: 'Role Name',
        accessor: 'roles.name',
        autoResizable: true
      },
      {
        Header: 'Privilege Code',
        accessor: 'privileges.code',
        autoResizable: true
      },
      {
        Header: 'Manager Name',
        accessor: 'manager.name',
        autoResizable: true
      },
      {
        Header: 'Cost Per User',
        accessor: 'cost.peruser',
        autoResizable: true
      },
      {
        Header: 'Business Unit',
        accessor: 'business.unit',
        autoResizable: true
      },
  ];

  const data = [
    {
      service: {
        name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
      },
      user: {
        login: "MANDY.STEWARD"
      },
      privilege: {
        name: 'Review Product Ideas'
      },
      role: {
        code: 'PER_EMPLOYEE_ABSTRACT'
      },
      last: {
        name: 'Steward'
      },
      first: {
        name: 'Mandy'
      },
      roles: {
        name: 'Employee'
      },
      privileges: {
        code: 'ACN_REVIEW_PRODUCT_IDEAS_PRIV'
      },
      manager: {
        name: 'Jane Stubbington'
      },
      cost: {
        peruser: '150'
      },
      business: {
        unit: 'Accounting UK'
      },
    },
    {
        service: {
          name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
        },
        user: {
          login: "MANDY.STEWARD"
        },
        privilege: {
            name: 'Review Product Ideas'
          },
        role: {
          code: 'PER_EMPLOYEE_ABSTRACT'
        },
        last: {
          name: 'Steward'
        },
        first: {
          name: 'Mandy'
        },
        roles: {
          name: 'Employee'
        },
        privileges: {
          code: 'ACN_REVIEW_PRODUCT_IDEAS_PRIV'
        },
        manager: {
          name: 'James Chubb'
        },
        cost: {
            peruser: '150'
          },
        business: {
          unit: 'Accounting UK'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
        },
        user: {
          login: "MANDY.STEWARD"
        },
        privilege: {
            name: 'Review Product Ideas'
          },
        role: {
          code: 'PER_EMPLOYEE_ABSTRACT'
        },
        last: {
          name: 'Steward'
        },
        first: {
          name: 'Mandy'
        },
        roles: {
          name: 'Employee'
        },
        privileges: {
          code: 'ACN_REVIEW_PRODUCT_IDEAS_PRIV'
        },
        manager: {
          name: 'Andrea Haute'
        },
        cost: {
            peruser: '150'
          },
        business: {
          unit: 'Accounting UK'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
        },
        user: {
          login: "MANDY.STEWARD"
        },
        privilege: {
            name: 'Review Product Ideas'
          },
        role: {
          code: 'PER_EMPLOYEE_ABSTRACT'
        },
        last: {
          name: 'Steward'
        },
        first: {
          name: 'Mandy'
        },
        roles: {
          name: 'Employee'
        },
        privileges: {
          code: 'ACN_REVIEW_PRODUCT_IDEAS_PRIV'
        },
        manager: {
          name: 'Thomas Kendall'
        },
        cost: {
            peruser: '150'
          },
        business: {
          unit: 'Accounting UK'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
        },
        user: {
          login: "MANDY.STEWARD"
        },
        privilege: {
            name: 'Review Product Ideas'
          },
        role: {
          code: 'PER_EMPLOYEE_ABSTRACT'
        },
        last: {
          name: 'Steward'
        },
        first: {
          name: 'Mandy'
        },
        roles: {
          name: 'Employee'
        },
        privileges: {
          code: 'ACN_REVIEW_PRODUCT_IDEAS_PRIV'
        },
        manager: {
          name: 'Matthew Schnieder'
        },
        cost: {
            peruser: '150'
          },
        business: {
          unit: 'Accounting UK'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
        },
        user: {
          login: "MANDY.STEWARD"
        },
        privilege: {
            name: 'Review Product Ideas'
          },
        role: {
          code: 'PER_EMPLOYEE_ABSTRACT'
        },
        last: {
          name: 'Steward'
        },
        first: {
          name: 'Mandy'
        },
        roles: {
          name: 'Employee'
        },
        privileges: {
          code: 'ACN_REVIEW_PRODUCT_IDEAS_PRIV'
        },
        manager: {
          name: 'Alan James'
        },
        cost: {
            peruser: '150'
          },
        business: {
          unit: 'Accounting UK'
        },
      },
      {
        service: {
          name: 'Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users'
        },
        user: {
          login: "MANDY.STEWARD"
        },
        privilege: {
            name: 'Review Product Ideas'
          },
        role: {
          code: 'PER_EMPLOYEE_ABSTRACT'
        },
        last: {
          name: 'Steward'
        },
        first: {
          name: 'Mandy'
        },
        roles: {
          name: 'Employee'
        },
        privileges: {
          code: 'ACN_REVIEW_PRODUCT_IDEAS_PRIV'
        },
        manager: {
          name: 'Dustin Gibson'
        },
        cost: {
            peruser: '150'
          },
        business: {
          unit: 'Accounting UK'
        },
      },
  ];

  return (
    <Card>
        <TabContainer
        contentBackgroundDesign="Solid"
        headerBackgroundDesign="Solid"
        onTabSelect={function _a(){}}
        tabLayout="Standard"
        >
        <Tab
          selected
          text="Active User"
         >
      <AnalyticalTable
        columns={columns}
        data={data}
        filterable
        groupBy={[]}
        groupable
        infiniteScroll
       />
       </Tab>
       <Tab
          selected
          text="In-Active User"
         >
      <AnalyticalTable
        columns={columns}
        data={data}
        filterable
        groupBy={[]}
        groupable
        infiniteScroll
       />
       </Tab>
       

      </TabContainer>
    </Card>
  );
};

export default ActiveInactiveReportTable;
