import { FilterBar, Title, FilterGroupItem, ComboBox, ComboBoxItem,Button } from '@ui5/webcomponents-react'


const FilterBarUserReport = () => {
  return (
    <FilterBar
    filterContainerWidth="13.125rem"
    header={<Title></Title>}
     className="dynamicPage"
  >
    <FilterGroupItem label="Sync">
      <ComboBox 
      placeholder='Select Sync'>
        <ComboBoxItem text="Sync 1"/>
        <ComboBoxItem text="Sync 2"/>
        <ComboBoxItem text="Sync 3"/>
        <ComboBoxItem text="Sync 4"/>
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
    <FilterGroupItem>
      <Button className="bg-cyan-700 text-l font-extrabold text-white m-6">
        Apply Filter
      </Button>
    </FilterGroupItem>
    
    
  </FilterBar>
  )
}

export default FilterBarUserReport
