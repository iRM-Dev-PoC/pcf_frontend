import ApplyFilterButton from "@/components/v2/ApplyFilterButton";
import { useHeaderData } from "@/hooks/useHeaderData";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import type { getHeaderTypes } from "@/types";
import {
    ComboBox,
    ComboBoxDomRef,
    ComboBoxItem,
    DateRangePicker,
    FilterBar,
    FilterGroupItem,
    Title,
    Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { ComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/ComboBox.js";
import { useEffect, useState } from "react";

const FilterBarComponent = () => {
    const [selectedText, setSelectedText] = useState("");
    const { data, error, isLoading } = useHeaderData();
    const { setSelectedItem } = useSelectedItem();

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedText(data[0].SYNC_ID);
            setSelectedItem(data[0]);
        }
    }, [data]);

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
        const selectedText = selectedItem?.SYNC_ID || "";
        setSelectedText(selectedText);
    };

    return (
        <>
            <FilterBar
                filterContainerWidth="13.125rem"
                header={<Title>Filters</Title>}
                filterBarCollapsed
            >
                {/* Type of Controls */}
                <FilterGroupItem label="Type Of Controls">
                    <ComboBox valueState="None">
                        <ComboBoxItem text="Procure To pay" />
                        <ComboBoxItem text="Finance" />
                        <ComboBoxItem text="Human Resource management" />
                    </ComboBox>
                </FilterGroupItem>

                {/* Control Family */}
                <FilterGroupItem label="Control Family">
                    <ComboBox valueState="None">
                        <ComboBoxItem text="Control Family Name" />
                    </ComboBox>
                </FilterGroupItem>

                {/* Sync ID for filter bar */}
                {!error && data && data.length > 0 && (
                    <FilterGroupItem label="SYNC">
                        <ComboBox
                            value={selectedText}
                            valueState="None"
                            onSelectionChange={handleSyncComboBoxChange}
                            loading={isLoading}
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
                )}

                {/* Date Range Picker */}
                <DateRangePicker />

                {/* Apply Filter Button */}
                <ApplyFilterButton />
            </FilterBar>
        </>
    );
};
export default FilterBarComponent;
