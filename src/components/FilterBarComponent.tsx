import {
    ComboBox,
    FilterBar,
    FilterGroupItem,
    MultiComboBox,
    MultiComboBoxItem,
    Title,
} from "@ui5/webcomponents-react";
import { useHeaderData } from "../hooks/useHeaderData";
import { getHeaderTypes } from "../utils/types";

const FilterBarComponent = () => {
    const { data, error, isLoading } = useHeaderData();
    console.log("data", data);
    console.log("error", error);
    console.log("isLoading", isLoading);

    return (
        <>
            <FilterBar
                filterContainerWidth="13.125rem"
                header={<Title></Title>}
                filterBarCollapsed
            >
                <FilterGroupItem label="Type Of Controls">
                    <MultiComboBox valueState="None">
                        <MultiComboBoxItem text="Procure To pay" />
                        <MultiComboBoxItem text="Finance" />
                        <MultiComboBoxItem text="Human Resource management" />
                    </MultiComboBox>
                </FilterGroupItem>

                <FilterGroupItem label="Control Family">
                    <MultiComboBox valueState="None">
                        <MultiComboBoxItem text="Control Family Name" />
                        <MultiComboBoxItem text="Details" />
                        <MultiComboBoxItem text="Created By" />
                        <MultiComboBoxItem text="Created At" />
                        <MultiComboBoxItem text="Edit" />
                    </MultiComboBox>
                </FilterGroupItem>

                <FilterGroupItem label="Reports">
                    <MultiComboBox valueState="None">
                        <MultiComboBoxItem text="Report ID" />
                        <MultiComboBoxItem text="Report Name" />
                        <MultiComboBoxItem text="Customer ID" />
                        <MultiComboBoxItem text="Created By" />
                        <MultiComboBoxItem text="Created At" />
                    </MultiComboBox>
                </FilterGroupItem>

                <FilterGroupItem label="Control Attributes">
                    <MultiComboBox valueState="None">
                        <MultiComboBoxItem text="Control Attribute Name" />
                        <MultiComboBoxItem text="Control Family" />
                        <MultiComboBoxItem text="Assign Logic" />
                    </MultiComboBox>
                </FilterGroupItem>
                <FilterGroupItem label="SYNC">
                    <ComboBox valueState="None">
                        {data?.map((head: getHeaderTypes) => (
                            <MultiComboBoxItem
                                key={head.SYNC_ID}
                                text={head.SYNC_ID}
                            />
                        ))}
                    </ComboBox>
                </FilterGroupItem>
            </FilterBar>
        </>
    );
};
export default FilterBarComponent;
