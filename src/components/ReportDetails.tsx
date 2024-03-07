import { AnalyticalTable, Button, FlexBox, TextAlign, } from '@ui5/webcomponents-react';
// import { Option } from '@ui5/webcomponents-react';
import { reportData } from "../lib/reportData";
const ReportDetails = () => {
  return (
    <div> 
     <AnalyticalTable
        columns={[
          {
            Header: 'Report_ID',
            accessor: 'report_ID',
            hAlign: 'center'  as TextAlign,
          },
          {
            Header: 'Report Name',
            accessor: 'report_name',
            headerTooltip: 'Full Name',
            hAlign: 'center'  as TextAlign,
          },
          {
            Header: 'Customer ID',
            accessor: 'customer_ID',
            headerTooltip: 'Full Name',
            hAlign: 'center'  as TextAlign,
            // width:150,
          },
          {
            Header: 'Created By',
            accessor: 'created_By',
            hAlign: 'center'  as TextAlign,
            // width:150,
          },
          {
            Cell: (instance: { cell: any; row: any; webComponentsReactProperties: any; }) => {
              const { webComponentsReactProperties } = instance;
              // disable buttons if overlay is active to prevent focus
              const isOverlay = webComponentsReactProperties.showOverlay;
              // console.log('This is your row data', row.original);
              return (
                <FlexBox>
                  <Button icon="create-entry-time" disabled={isOverlay} />
                </FlexBox>
              );
            },
            Header: 'Created At',
            accessor: '.',
            disableFilters: true,
            disableGroupBy: true,
            disableResizing: true,
            disableSortBy: true,
            id: 'created_at',
            width: 100,
            
          },
          // {
          //   accessor: 'Created At',
          //   // hAlign: 'center',
          //   Header: () => <span>Created At</span>,
          //   filter: (rows, accessor, filterValue) => {
          //     if (filterValue === 'all') {
          //       return rows;
          //     }
          //     if (filterValue === 'true') {
          //       return rows.filter((row) => row.values[accessor[0]] >= 21);
          //     }
          //     return rows.filter((row) => row.values[accessor[0]] < 21);
          //   },
          //   Filter: ({ column, popoverRef }: { column: any; popoverRef: any; }) => {
          //     const handleChange = (event: { detail: { selectedOption: { getAttribute: (arg0: string) => any; }; }; }) => {
          //       // set filter
          //       column.setFilter(event.detail.selectedOption.getAttribute('value'));
          //       // close popover
          //       popoverRef.current.close();
          //     };
          //     return (
          //       <Select
          //         onChange={handleChange}
          //         style={{ width: '100%' }}
          //         value={column.filterValue ? column.filterValue : 'all'}
          //       >
          //         <Option value="all">Report Created By</Option>
          //         <Option value="true">Report Created At</Option>
          //         <Option value="false">Report Updated At</Option>
          //       </Select>
          //     );
          //   }
          // },
          {
            Cell: (instance: { cell: any; row: any; webComponentsReactProperties: any; }) => {
              const { webComponentsReactProperties } = instance;
              // disable buttons if overlay is active to prevent focus
              const isOverlay = webComponentsReactProperties.showOverlay;
              // console.log('This is your row data', row.original);
              return (
                <FlexBox>
                  <Button icon="add-document" disabled={isOverlay} />
                  <Button icon="edit" disabled={isOverlay} />
                  <Button icon="delete" disabled={isOverlay} />
                </FlexBox>
              );
            },
            Header: 'Actions',
            accessor: '.',
            disableFilters: true,
            disableGroupBy: true,
            disableResizing: true,
            disableSortBy: true,
            id: 'actions',
            width: 150,
            hAlign: 'center'  as TextAlign,
          }
        ]}
          data={reportData.map(item => ({
            
            report_ID: item.report_ID,
            report_name: item.report_name,
            customer_ID: item.customer_ID,
            created_By: item.created_By,
          }))}
        
        filterable
        groupBy={[]}
        groupable
        infiniteScroll
        onColumnsReorder={() => { } }
        onGroup={() => { } }
        onLoadMore={() => { } }
        onRowClick={() => { } }
        onRowExpandChange={() => { } }
        onRowSelect={() => { } }
        onSort={() => { } }
        onTableScroll={() => { } }
        rowHeight={44}
        selectedRowIds={{
          3: true
        }}
        
        selectionMode="SingleSelect"
        withRowHighlight
         />
  
  </div>
  )
}

export default ReportDetails;