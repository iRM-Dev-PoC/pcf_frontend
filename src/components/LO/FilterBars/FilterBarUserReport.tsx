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
        <ComboBoxItem text="ComboBoxItem 1" />
        <ComboBoxItem text="ComboBoxItem 2" />
        <ComboBoxItem text="ComboBoxItem 3" />
        <ComboBoxItem text="ComboBoxItem 4" />
      </ComboBox>
    </FilterGroupItem>
    <FilterGroupItem label="User">
      <ComboBox
      placeholder='Select User'
      >
        <ComboBoxItem text="ComboBoxItem 6" />
        <ComboBoxItem text="ComboBoxItem 9" />
        <ComboBoxItem text="ComboBoxItem 8" />
        <ComboBoxItem text="ComboBoxItem 7" />
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
