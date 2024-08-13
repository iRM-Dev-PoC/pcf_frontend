import { Title, FilterBar, FilterGroupItem, ComboBox, ComboBoxItem, DateRangePicker, Button } from '@ui5/webcomponents-react';
import "@/css/dynamicPage.css";

const CustomFilterBar = () => {
  return (
    <FilterBar
      filterContainerWidth="13.125rem"
      header={<Title></Title>}
       className="dynamicPage"
    >
      <FilterGroupItem label="Client Name">
        <ComboBox 
        placeholder='Select Client'>
          <ComboBoxItem text="Test 1" />
          <ComboBoxItem text="test 2" />
        </ComboBox>
      </FilterGroupItem>
      <FilterGroupItem label="Sync">
        <ComboBox
        placeholder='Select Sync'
        >
          <ComboBoxItem text="Sync 1" />
          <ComboBoxItem text="Sync 2" />
          <ComboBoxItem text="Sync 3" />
          <ComboBoxItem text="Sync 4" />
          <ComboBoxItem text="Sync 5" />
          <ComboBoxItem text="Sync 6" />
          <ComboBoxItem text="Sync 7" />
          <ComboBoxItem text="Sync 8" />
        </ComboBox>
      </FilterGroupItem>
      <FilterGroupItem label="Business Unit">
        <ComboBox>
          <ComboBoxItem text="Accounting UK" />
        </ComboBox>
      </FilterGroupItem>
      <FilterGroupItem label="Sync Duration">
          <DateRangePicker
           onChange={function _a(){}}
           onInput={function _a(){}}
           onValueStateChange={function _a(){}}
           primaryCalendarType="Gregorian"
           valueState="None"
          />
      </FilterGroupItem>
      <FilterGroupItem>
        <Button className="bg-cyan-700 text-l font-extrabold text-white m-6">
          Apply Filter
        </Button>
      </FilterGroupItem>
      
      
    </FilterBar>
  );
};

export default CustomFilterBar;
