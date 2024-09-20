import { AnalyticalTable, Button, Card, Bar, ExpandableText } from '@ui5/webcomponents-react';
import { Modals } from '@ui5/webcomponents-react';
import SapServiceEditForm from '../Forms/SapServiceEditForm';

const SapServiceTable = () => {
  const showDialog = Modals.useShowDialog();

  const handleButtonClick = () => {
    const { close } = showDialog({
      headerText: 'Edit Fusion Service',
      children: <SapServiceEditForm/>,
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
        Header: 'Part Number',
        accessor: 'part.number',
        autoResizable: true,
      },
     
      {
        Header: 'Service Name',
        accessor: 'service.name',
        autoResizable: true
      },
      {
        Header: 'Process',
        accessor: 'process.name',
        autoResizable: true,
      },
  ];

  const data = [
    {
      part: {
        number: 'B75365'
      },
      service: {
        name: "Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users"
      },
      process: {
        name: "The count of active users with at least one of the following privileges. If a user is assigned more than one of the following privileges, that user is counted only once toward the service. HWM\_MANAGE\_TIME\_WORK\_AREA\_PRIV HWM\_TIME\_MANAGEMENT\_WORK\_AREA\_PRIV"
      },
    },
    {
      part: {
        number: 'B77315'
      },
      service: {
        name: "EEnterprise Resource Planning Cloud Service - Hosted Named UsersUR"
      },
      process: {
        name: "Hosted Employee counts every Person, regardless of Person Type, with at least one active work assignment tracked in your Fusion cloud service during the month reported. This includes Employees, Agents, Contractors, and Consultants. Each person is counted just once. Workers with a single Non Worker person type of Retiree or Not Managed by HR are not counted. The measurement of Hosted Employee based Oracle Cloud Services requires the presence of at least one Hosted Employee based service from Oracle Cloud Human Capital Management (HCM)."
      },
    },
    {
      part: {
        number: '	B78969'
      },
      service: {
        name: "Oracle Fusion Supply Chain Collaboration Cloud Service - Hosted Named Users"
      },
      process: {
        name: "The number of active users with at least one of the following privileges. If a user is assigned more than one of the privileges, that user is counted only once toward the service. ACD_MANAGE_PRODUCT_CONCEPT_PRIV ACD_MANAGE_PRODUCT_PROPOSAL_PRIV ACD_REVIEW_PRODUCT_CONCEPT_PRIV ACE_MANAGE_PRODUCT_PORTFOLIO_PRIV ACE_REVIEW_PRODUCT_PORTFOLIO_PRIV ACE_REVIEW_PRODUCT_PROPOSAL_PRIV ACN_MANAGE_PRODUCT_REQUIREMENT_PRIV ACN_REVIEW_PRODUCT_REQUIREMENT_PRIV"
      },
    },
    {
      part: {
        number: 'B78901'
      },
      service: {
        name: "Enterprise Resource Planning Cloud for Midsize Cloud Service - Hosted Named Users"
      },
      process: {
        name: "The count of active users with at least one of the following privileges. If a user is assigned more than one of the following privileges, that user is counted only once toward the service. HWM_MANAGE_TIME_WORK_AREA_PRIV HWM_TIME_MANAGEMENT_WORK_AREA_PRIV"
      },
    },
    {
      part: {
        number: 'B78965'
      },
      service: {
        name: "Innovation Management Cloud Service - Hosted Named Users"
      },
      process: {
        name: "The count of active users assigned the ACA_MONITOR_PRODUCT_DEVELOPMENT_PRIV privilege."
      },
    },
    {
      part: {
        number: 'B67281'
      },
      service: {
        name: "Goal Management Cloud Service - Hosted Named Users"
      },
      process: {
        name: "The number of active users with at least one of the following privileges. If a user is assigned more than one of the privileges, that user is counted only once toward the service. ACD_MANAGE_PRODUCT_CONCEPT_PRIV ACD_MANAGE_PRODUCT_PROPOSAL_PRIV ACD_REVIEW_PRODUCT_CONCEPT_PRIV ACE_MANAGE_PRODUCT_PORTFOLIO_PRIV ACE_REVIEW_PRODUCT_PORTFOLIO_PRIV ACE_REVIEW_PRODUCT_PROPOSAL_PRIV ACN_MANAGE_PRODUCT_REQUIREMENT_PRIV ACN_REVIEW_PRODUCT_REQUIREMENT_PRIV"
      },
    },
    {
      part: {
        number: 'B67293'
      },
      service: {
        name: "Oracle Fusion Product Management Cloud Service - Hosted Named Users"
      },
      process: {
        name: "The number of active users with at least one of the following privileges. If a user is assigned more than one of the privileges, that user is counted only once toward the service. HRA_APPROVE_WORKER_PERFORMANCE_DOCUMENT_PRIV HRA_CANCEL_WORKER_PERFORMANCE_DOCUMENT_PRIV HRA_CHANGE_PERFORMANCE_DOCUMENT_DUE_DATES_PRIV HRA_CREATE_PERFORMANCE_DOCUMENT_BY_MANAGER_PRIV HRA_CREATE_PERFORMANCE_DOCUMENT_BY_WORKER_PRIV HRA_CREATE_PERFORMANCE_DOCUMENT_PRIV HRA_CREATE_WORKER_PERFORMANCE_DOCUMENT_MASS_PROCESS_P RIV HRA_DELETE_PARTICIPANT_FEEDBACK_PRIV HRA_MANAGE_ELIGIBILITY_BATCH_PROCESS_PRIV HRA_MANAGE_MATRIX_LAYOUT_PRIV HRA_MANAGE_PERFORMANCE_DOCUMENT_TYPE_PRIV HRA_MANAGE_PERFORMANCE_EVALUATION_RATING_TARGET_DISTRIB UTION_PRIV HRA_MANAGE_PERFORMANCE_PROCESS_FLOW_DEFINITION_PRIV HRA_MANAGE_PERFORMANCE_ROLES_PRIV HRA_MANAGE_PERFORMANCE_TEMPLATE_PRIV HRA_MANAGE_PERFORMANCE_TEMPLATE_SECTIONS_PRIV HRA_MANAGE_WORKER_ELIGIBILITY_PRIV HRA_MASS_PROCESS_PERFORMANCE_DOCUMENTS_PRIV HRA_PROVIDE_PERFORMANCE_EVALUATION_FEEDBACK_PRIV HRA_REOPEN_PERFORMANCE_DOCUMENT_PRIV HRA_REQUEST_FEEDBACK_PRIV HRA_RESET_WORKER_PERFORMANCE_EVALUATION_STATUS_PRIV HRA_SEARCH_FOR_MY_ORGANIZATION_PERFORMANCE_DOCUMENTS_P RIV HRA_TRANSFER_PERFORMANCE_DOCUMENT_PRIV HRA_VIEW_PERFORMANCE_MANAGER_DASHBOARD_PRIV HRA_VIEW_PERFORMANCE_WORKER_DASHBOARD_PRIV HRA_VIEW_WORKER_PERFORMANCE_MANAGEMENT_DOCUMENT_PRIV HRT_VIEW_PERFORMANCE_OVERVIEW_BY_MANAGER_PRIV ORA_HRA_MANAGE_CHECK_IN_DOCUMENT_PRIV"
      },
    },
    {
      part: {
        number: 'B86838'
      },
      service: {
        name: "Oracle Fusion Supply Planning Cloud Service - Hosted Named Users"
      },
      process: {
        name: "Hosted Employee counts every Person, regardless of Person Type, with at least one active work assignment tracked in your Fusion cloud service during the month reported. This includes Employees, Agents, Contractors, and Consultants. Each person is counted just once. Workers with a single Non Worker person type of Retiree or Not Managed by HR are not counted. The measurement of Hosted Employee based Oracle Cloud Services requires the presence of at least one Hosted Employee based service from Oracle Cloud Human Capital Management (HCM)."
      },
    },
    {
      part: {
        number: 'B69711'
      },
      service: {
        name: "Oracle Fusion Sales and Operations Planning Cloud Service - Hosted Named Users"
      },
      process: {
        name: "The number of active users with at least one of the following privileges. If a user is assigned more than one of the privileges, that user is counted only once toward the service. HRA_APPROVE_WORKER_PERFORMANCE_DOCUMENT_PRIV HRA_CANCEL_WORKER_PERFORMANCE_DOCUMENT_PRIV HRA_CHANGE_PERFORMANCE_DOCUMENT_DUE_DATES_PRIV HRA_CREATE_PERFORMANCE_DOCUMENT_BY_MANAGER_PRIV HRA_CREATE_PERFORMANCE_DOCUMENT_BY_WORKER_PRIV HRA_CREATE_PERFORMANCE_DOCUMENT_PRIV HRA_CREATE_WORKER_PERFORMANCE_DOCUMENT_MASS_PROCESS_P RIV HRA_DELETE_PARTICIPANT_FEEDBACK_PRIV HRA_MANAGE_ELIGIBILITY_BATCH_PROCESS_PRIV HRA_MANAGE_MATRIX_LAYOUT_PRIV HRA_MANAGE_PERFORMANCE_DOCUMENT_TYPE_PRIV HRA_MANAGE_PERFORMANCE_EVALUATION_RATING_TARGET_DISTRIB UTION_PRIV HRA_MANAGE_PERFORMANCE_PROCESS_FLOW_DEFINITION_PRIV HRA_MANAGE_PERFORMANCE_ROLES_PRIV HRA_MANAGE_PERFORMANCE_TEMPLATE_PRIV HRA_MANAGE_PERFORMANCE_TEMPLATE_SECTIONS_PRIV HRA_MANAGE_WORKER_ELIGIBILITY_PRIV HRA_MASS_PROCESS_PERFORMANCE_DOCUMENTS_PRIV HRA_PROVIDE_PERFORMANCE_EVALUATION_FEEDBACK_PRIV HRA_REOPEN_PERFORMANCE_DOCUMENT_PRIV HRA_REQUEST_FEEDBACK_PRIV HRA_RESET_WORKER_PERFORMANCE_EVALUATION_STATUS_PRIV HRA_SEARCH_FOR_MY_ORGANIZATION_PERFORMANCE_DOCUMENTS_P RIV HRA_TRANSFER_PERFORMANCE_DOCUMENT_PRIV HRA_VIEW_PERFORMANCE_MANAGER_DASHBOARD_PRIV HRA_VIEW_PERFORMANCE_WORKER_DASHBOARD_PRIV HRA_VIEW_WORKER_PERFORMANCE_MANAGEMENT_DOCUMENT_PRIV HRT_VIEW_PERFORMANCE_OVERVIEW_BY_MANAGER_PRIV ORA_HRA_MANAGE_CHECK_IN_DOCUMENT_PRIV"
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
      />
    </Card>
  );
};

export default SapServiceTable;


