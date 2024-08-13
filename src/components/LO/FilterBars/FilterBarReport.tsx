import { FilterBar, Title, FilterGroupItem, ComboBox, ComboBoxItem, DateRangePicker, Button } from '@ui5/webcomponents-react'


const FilterBarReport = () => {
  return (
    <FilterBar
    filterContainerWidth="13.125rem"
    header={<Title></Title>}
     className="dynamicPage"
  >
    <FilterGroupItem label="Sync">
      <ComboBox 
      placeholder='Select Sync'>
        <ComboBoxItem text="Sync 1" />
        <ComboBoxItem text="Sync 2" />
        <ComboBoxItem text="Sync 3" />
        <ComboBoxItem text="Sync 4" />
      </ComboBox>
    </FilterGroupItem>
    <FilterGroupItem label="Service Name">
      <ComboBox
      placeholder='Select Service'
      >
        <ComboBoxItem text="Oracle Fusion Supply Chain Management Limited Cloud Service - Hosted Named Users" />
        <ComboBoxItem text="Enterprise Resource Planning Cloud Service - Hosted Named Users" />
        <ComboBoxItem text="Oracle Fusion Supply Chain Collaboration Cloud Service - Hosted Named Users" />
        <ComboBoxItem text="Enterprise Resource Planning Cloud for Midsize Cloud Service - Hosted Named Users" />
        <ComboBoxItem text="Innovation Management Cloud Service - Hosted Named Users" />
        <ComboBoxItem text="Goal Management Cloud Service - Hosted Named Users"/>
        <ComboBoxItem text="Oracle Fusion Product Management Cloud Service - Hosted Named Users" />
        <ComboBoxItem text="Oracle Fusion Supply Planning Cloud Service - Hosted Named Users" />
        <ComboBoxItem text="Oracle Fusion Sales and Operations Planning Cloud Service - Hosted Named Users"/>
      </ComboBox>
    </FilterGroupItem>
    <FilterGroupItem label="User">
      <ComboBox
      placeholder='Select User'
      >
        <ComboBoxItem text="BALA.GUPTA" />
        <ComboBoxItem text="CASEY.BROWN" />
        <ComboBoxItem text="MANDY.STEWARD"/>
        <ComboBoxItem text="SCM24.STUDENT"/>
        <ComboBoxItem text="SIMON.WATTS"/>
      </ComboBox>
    </FilterGroupItem>
    <FilterGroupItem label="Rating">
      <ComboBox
      placeholder='Select Rating'
      >
        <ComboBoxItem text="Low"/>
        <ComboBoxItem text="Medium"/>
        <ComboBoxItem text="High"/>
      </ComboBox>
    </FilterGroupItem>
    <FilterGroupItem>
      <Button className="bg-cyan-700 text-l font-extrabold text-white m-6">
        Apply Filter
      </Button>
    </FilterGroupItem>
    
    
  </FilterBar>
  )
}

export default FilterBarReport
