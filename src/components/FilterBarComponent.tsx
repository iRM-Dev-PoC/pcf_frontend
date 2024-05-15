import {
    ComboBox,
    ComboBoxDomRef,
    ComboBoxItem,
    FilterBar,
    FilterGroupItem,
    MultiComboBox,
    MultiComboBoxItem,
    Title,
    Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { ComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/ComboBox.js";
import { useHeaderData } from "../hooks/useHeaderData";
import { useSelectedItem } from "../hooks/useSelectedItem";
import { getHeaderTypes } from "../utils/types";
import ErrorComponent from "./ErrorComponent";
import Loading from "./Loading";

const FilterBarComponent = () => {
    const { data, error, isLoading } = useHeaderData();
    const { selectedItem, setSelectedItem } = useSelectedItem();

    console.log("selected", selectedItem);

    const handleSyncComboBoxChange = (
        event: Ui5CustomEvent<
            ComboBoxDomRef,
            ComboBoxSelectionChangeEventDetail
        >
    ) => {
        const selectedItemId = Number(
            event.detail?.item?.getAttribute("data-key")
        );
        const selectedItem =
            data?.find((item) => item.ID === selectedItemId) || null;
        setSelectedItem(selectedItem);
    };

    if (isLoading && !error) return <Loading />;
    if (error) return <ErrorComponent />;

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
                    <ComboBox
                        // value={data && data.length > 0 ? data[0].SYNC_ID : ""}
                        valueState="None"
                        onSelectionChange={handleSyncComboBoxChange}
                    >
                        {data?.map((head: getHeaderTypes) => (
                            <ComboBoxItem
                                key={head.SYNC_ID}
                                text={head.SYNC_ID}
                                data-key={head.ID}
                            />
                        ))}
                    </ComboBox>
                </FilterGroupItem>
            </FilterBar>
        </>
    );
};
export default FilterBarComponent;
