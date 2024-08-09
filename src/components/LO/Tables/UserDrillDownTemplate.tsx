import {
    Avatar,
    AvatarSize,
    Button,
    ButtonDesign,
    FCLLayout,
    FlexBox,
    FlexBoxDirection,
    FlexibleColumnLayout,
    Label,
    List,
    StandardListItem,
    Title,
    Toolbar,
    ToolbarDesign,
    ToolbarSpacer,
    Text,
    Bar,
    Modals,
    Card
  } from '@ui5/webcomponents-react';
  import { useState, useRef, useEffect } from 'react';
  
  const UserDrillDownTemplate = () => {
    const userLoginData = [
      {
        user: 'Bala.Gupta',
        role1: 'EGP_PRODUCT_MANAGER_JOB',
        role2: 'ASM_APPLICATION_CONSULTANT_JOB'
      },
      {
        user: 'Casey.Brown',
        role1: 'PER_EMPLOYEE_ABSTRACT',
        role2: 'ORA_FND_INTEGRATION_SPECIALIST_JOB'
      },
      {
        user: 'Mandy.Steward',
        role1: 'PER_EMPLOYEE_ABSTRACT',
        role2: 'ORA_FND_INTEGRATION_SPECIALIST_JOB'
      },
      {
        user: 'SCM24.Student',
        role1: 'OU_SCM_ROLE',
      },
      {
        user: 'Simmon.Watts',
        role1: 'ORA_MSC_SALES_AND_OPERATIONS_PLANNER_JOB',
      },
    ];
  
    const rolePrivileges = {
      'EGP_PRODUCT_MANAGER_JOB': ['ACE_REVIEW_PRODUCT_PROPOSAL_PRIV', 'VCS_MANAGE_AGGREGATION_SCHEDULES_PRIV'],
      'ASM_APPLICATION_CONSULTANT_JOB': ['Privilege C', 'Privilege D'],
      'PER_EMPLOYEE_ABSTRACT': ['ACN_REVIEW_PRODUCT_IDEAS_PRIV', 'PJB_MANAGE_PROJECT_BILLING_EVENT_PRIV'],
      'ORA_FND_INTEGRATION_SPECIALIST_JOB': ['MSC_MONITOR_SALES_AND_OPERATIONS_PLANNING_WORK_AREA_PRIV'],
      'OU_SCM_ROLE': ['HRG_MANAGE_PERFORMANCE_GOAL_BY_WORKER_PRIV', 'PJB_MANAGE_PROJECT_BILLING_EVENT_PRIV'],
      'ORA_MSC_SALES_AND_OPERATIONS_PLANNER_JOB': ['MSC_MONITOR_SALES_AND_OPERATIONS_PLANNING_WORK_AREA_PRIV', 'Privilege L']
    };
  
    const privilegeServices = {
      'ACE_REVIEW_PRODUCT_PROPOSAL_PRIV': ['Innovation Management Cloud Service - Hosted Named Users', 'Oracle Fusion Supply Chain Collaboration Cloud Service - Hosted Named Users'],
      'VCS_MANAGE_AGGREGATION_SCHEDULES_PRIV': ['Enterprise Resource Planning Cloud Service - Hosted Named Users'],
      'CE_MANAGE_BANK_STATEMENT_AND_RECONCILIATION_ACTIVITIES_PRIV': ['Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users', 'Goal Management Cloud Service - Hosted Named Users'],
      'Privilege D': ['Service 6'],
      'ORA_FND_INTEGRATION_SPECIALIST_JOB': ['Oracle Fusion Sales and Operations Planning Cloud Service - Hosted Named Users'],
      'PJB_MANAGE_PROJECT_BILLING_EVENT_PRIV': ['Service 8', 'Service 9'],
      'HRG_MANAGE_PERFORMANCE_GOAL_BY_WORKER_PRIV': ['Enterprise Resource Planning Cloud Service - Hosted Named Users'],
      'CE_MANAGE_BANK_STATEMENT_AND_RECONCILIATION_ACTIVITIES_PRIVV': ['Service 11'],
      'MSC_MONITOR_SALES_AND_OPERATIONS_PLANNING_WORK_AREA_PRIV': ['Oracle Fusion Sales and Operations Planning Cloud Service - Hosted Named Users'],
      'Privilege J': ['Service 13', 'Service 14'],
      'Privilege K': ['Service 15'],
      'Privilege L': ['Service 16']
    };
  
    const [layout, setLayout] = useState(FCLLayout.OneColumn);
    const [selectedUser, setSelectedUser] = useState(userLoginData[0]);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [selectedPrivilege, setSelectedPrivilege] = useState<string | null>(null);
    
    const closeRef = useRef<() => void>();
  
    const showDialog = Modals.useShowDialog();
  
    const onStartColumnClick = (e) => {
      const user = userLoginData.find((item) => item.user === e.detail.item.dataset.user);
      if (user) {
        setSelectedUser(user);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
      }
    };
  
    const onMiddleColumnClick = (e) => {
      const role = e.detail.item.dataset.role;
      if (role) {
        setSelectedRole(role);
        setLayout(FCLLayout.ThreeColumnsEndExpanded);
      }
    };
  
    const onEndColumnClick = (e) => {
      const privilege = e.detail.item.dataset.privilege;
      if (privilege) {
        setSelectedPrivilege(privilege);
        const { close } = showDialog({
          headerText: 'Service Name',
          children: (
            <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '1rem' }}>
              <List headerText="Service Name">
                {privilegeServices[privilege].map((service) => (
                  <StandardListItem key={service}>{service}</StandardListItem>
                ))}
              </List>
            </FlexBox>
          ),
          footer: (
            <Button onClick={() => close()} design="Negative">Close</Button>
          )
        });
        closeRef.current = close;
      }
    };
  
    useEffect(() => {
      return () => {
        if (closeRef.current) {
          closeRef.current();
        }
      };
    }, []);
  
    const userRoles = selectedUser ? [selectedUser.role1, selectedUser.role2].filter(Boolean) : [];
    const privileges = selectedRole ? rolePrivileges[selectedRole] || [] : [];
  
    return (
    <Card>
      <FlexibleColumnLayout
        hideArrows
        style={{
          height: '100%',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          transition: 'all 0.3s ease-in-out'
        }}
        layout={layout}
        startColumn={
          <List headerText="User" onItemClick={onStartColumnClick}>
            {userLoginData.map((item) => (
              <StandardListItem description={item.role1} data-user={item.user} key={item.user}>
                {item.user}
              </StandardListItem>
            ))}
          </List>
        }
        midColumn={
          <>
            <Toolbar design={ToolbarDesign.Solid}>
              <Title>{selectedUser.user}</Title>
              <ToolbarSpacer />
              <Button
                icon="decline"
                design={ButtonDesign.Transparent}
                onClick={() => {
                  setLayout(FCLLayout.OneColumn);
                }}
              />
            </Toolbar>
            <Toolbar
              style={{
                height: '300px'
              }}
            >
              <Avatar
                icon="person-placeholder"
                size={AvatarSize.XL}
                style={{
                  marginLeft: '12px'
                }}
              />
              <FlexBox
                direction={FlexBoxDirection.Column}
                style={{
                  marginLeft: '6px'
                }}
              >
                <FlexBox>
                  <Label>User:</Label>
                  <Text
                    style={{
                      marginLeft: '2px'
                    }}
                  >
                    {selectedUser.user}
                  </Text>
                </FlexBox>
                <FlexBox>
                  <Label>Role 1:</Label>
                  <Text
                    style={{
                      marginLeft: '2px'
                    }}
                  >
                    {selectedUser.role1}
                  </Text>
                </FlexBox>
                <FlexBox>
                  <Label>Role 2:</Label>
                  <Text
                    style={{
                      marginLeft: '2px'
                    }}
                  >
                    {selectedUser.role2}
                  </Text>
                </FlexBox>
              </FlexBox>
            </Toolbar>
            <List headerText="User Roles" onItemClick={onMiddleColumnClick}>
              {userRoles.map((role) => (
                <StandardListItem data-role={role} key={role}>
                  {role}
                </StandardListItem>
              ))}
            </List>
          </>
        }
        endColumn={
          <>
          <Card>
            <Toolbar design={ToolbarDesign.Solid}>
              <Title>{selectedRole}</Title>
              <ToolbarSpacer />
              <Button
                icon="decline"
                design={ButtonDesign.Transparent}
                onClick={() => {
                  setLayout(FCLLayout.TwoColumnsMidExpanded);
                  setSelectedRole(null);
                }}
              />
            </Toolbar>
            <Toolbar
              style={{
                height: '200px'
              }}
            >
              <FlexBox
                direction={FlexBoxDirection.Column}
                style={{
                  marginLeft: '6px'
                }}
              >
                <List headerText="Privileges" onItemClick={onEndColumnClick}>
                  {privileges.map((privilege) => (
                    <StandardListItem data-privilege={privilege} key={privilege}>
                      {privilege}
                    </StandardListItem>
                  ))}
                </List>
              </FlexBox>
            </Toolbar>
            </Card>
          </>
        }
      />
      </Card>
    );
  };
  
  export default UserDrillDownTemplate;
  