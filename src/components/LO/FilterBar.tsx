import { Title, FilterBar, FilterGroupItem, ComboBox, ComboBoxItem, DateRangePicker, Button } from '@ui5/webcomponents-react';
import "@/css/dynamicPage.css";
import SetFilterButton from './SetFilterButton';

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
          <ComboBoxItem text="ComboBoxItem 1" />
          <ComboBoxItem text="ComboBoxItem 2" />
          <ComboBoxItem text="ComboBoxItem 3" />
          <ComboBoxItem text="ComboBoxItem 4" />
        </ComboBox>
      </FilterGroupItem>
      <FilterGroupItem label="Sync">
        <ComboBox
        placeholder='Select Sync'
        >
          <ComboBoxItem text="ComboBoxItem 6" />
          <ComboBoxItem text="ComboBoxItem 9" />
          <ComboBoxItem text="ComboBoxItem 8" />
          <ComboBoxItem text="ComboBoxItem 7" />
        </ComboBox>
      </FilterGroupItem>
      <FilterGroupItem label="Business Unit">
        <ComboBox>
          <ComboBoxItem text="ComboBoxItem 6" />
          <ComboBoxItem text="ComboBoxItem 9" />
          <ComboBoxItem text="ComboBoxItem 8" />
          <ComboBoxItem text="ComboBoxItem 7" />
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
      {/* <Button className="bg-cyan-700 text-l font-extrabold text-white">
            Apply Filter
        </Button> */}
        <Button className="bg-cyan-700 text-l font-extrabold text-white m-6">
          Apply Filter
        </Button>
      </FilterGroupItem>
      
      
    </FilterBar>
  );
};

export default CustomFilterBar;
