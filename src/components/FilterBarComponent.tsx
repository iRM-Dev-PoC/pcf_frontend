import {
  FilterBar,
  FilterGroupItem,
  MultiComboBox,
  MultiComboBoxItem,
  Title,
} from "@ui5/webcomponents-react";

const FilterBarComponent = () => {
  return (
      <>
          <FilterBar
              filterContainerWidth="13.125rem"
              header={<Title></Title>}>
              <FilterGroupItem label="Type Of Controls">
                  <MultiComboBox
                      valueState="None">
                      <MultiComboBoxItem text="Procure To pay" />
                      <MultiComboBoxItem text="Finance" />
                      <MultiComboBoxItem text="Human Resource management" />
                  </MultiComboBox>
              </FilterGroupItem>

              <FilterGroupItem label="Control Family">
                  <MultiComboBox
                      valueState="None">
                      <MultiComboBoxItem text="Control Family Name" />
                      <MultiComboBoxItem text="Details" />
                      <MultiComboBoxItem text="Created By" />
                      <MultiComboBoxItem text="Created At" />
                      <MultiComboBoxItem text="Edit" />
                  </MultiComboBox>
              </FilterGroupItem>

              <FilterGroupItem label="Reports">
                  <MultiComboBox
                      valueState="None">
                      <MultiComboBoxItem text="Report ID" />
                      <MultiComboBoxItem text="Report Name" />
                      <MultiComboBoxItem text="Customer ID" />
                      <MultiComboBoxItem text="Created By" />
                      <MultiComboBoxItem text="Created At" />
                  </MultiComboBox>
              </FilterGroupItem>

              <FilterGroupItem label="Control Attributes">
                  <MultiComboBox
                      valueState="None">
                      <MultiComboBoxItem text="Control Attribute Name" />
                      <MultiComboBoxItem text="Control Family" />
                      <MultiComboBoxItem text="Assign Logic" />
                  </MultiComboBox>
              </FilterGroupItem>

          </FilterBar>
      </>
  );
};
export default FilterBarComponent;