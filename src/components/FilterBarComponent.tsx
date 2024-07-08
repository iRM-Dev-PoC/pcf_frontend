import { getAllControlFamilies } from "@/actions/controlFamiliy";
import ApplyFilterButton from "@/components/v2/ApplyFilterButton";
import { useHeaderData } from "@/hooks/useHeaderData";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import { getCurrentDatetime } from "@/lib/utils";
import type { getAllControlFamilyType, getHeaderTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
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
    const [selectedSync, setSelectedSync] = useState("");
    const [selectedControlFamily, setSelectedControlFamily] = useState("");
    const [selectedTypeOfControls, setSelectedTypeOfControls] = useState("");
    const [selectedDateRange, setSelectedDateRange] = useState("");
    const { data, error, isLoading } = useHeaderData();
    const { setSelectedItem } = useSelectedItem();

    const [allFilterValues, setAllFilterValues] = useState({
        syncId: 1,
        controlFamilyId: 1,
        typeOfControlsId: 1,
        dateRange: getCurrentDatetime(),
    });

    const {
        data: allControlFamilyDataRes,
        isFetching: allControlFamilyDataResFetching,
        error: allControlFamilyDataResError,
    } = useQuery({
        queryKey: ["allControlFamilyData"],
        queryFn: getAllControlFamilies,
        retry: 3,
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedSync(data[0].SYNC_ID);
            setSelectedItem(data[0]);
        }
        if (
            allControlFamilyDataRes &&
            allControlFamilyDataRes.data.length > 0
        ) {
            setSelectedControlFamily(
                allControlFamilyDataRes.data[0].CONTROL_FAMILY_NAME
            );
        }
    }, [data, allControlFamilyDataRes]);

    const handleSyncComboBoxChange = (
        event: Ui5CustomEvent<
            ComboBoxDomRef,
            ComboBoxSelectionChangeEventDetail
        >
    ) => {
        const selectedItemId = Number(
            event.detail?.item?.getAttribute("data-sync-id")
        );
        const selectedItem =
            data?.find((item) => item.ID === selectedItemId) || null;
        setSelectedItem(selectedItem);
        const selectedSync = selectedItem?.SYNC_ID || "";
        setSelectedSync(selectedSync);
        setAllFilterValues({
            ...allFilterValues,
            syncId: selectedItemId || 0,
        });
    };

    const handleControlFamilyComboBoxChange = (
        event: Ui5CustomEvent<
            ComboBoxDomRef,
            ComboBoxSelectionChangeEventDetail
        >
    ) => {
        const selectedItemId = Number(
            event.detail?.item?.getAttribute("data-controlfamily-id")
        );
        const selectedControlFamily =
            allControlFamilyDataRes?.data?.find(
                (item) => item.ID === selectedItemId
            ) || null;
        if (selectedControlFamily) {
            setSelectedControlFamily(selectedControlFamily.CONTROL_FAMILY_NAME);
        }
        setAllFilterValues({
            ...allFilterValues,
            controlFamilyId: selectedControlFamily?.ID || 0,
        });
    };

    console.log(allFilterValues, "allFilterValues");

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

                {/* Control Family for filter bar */}
                {!allControlFamilyDataResError &&
                    allControlFamilyDataRes &&
                    allControlFamilyDataRes.data.length > 0 && (
                        <FilterGroupItem label="Control Family">
                            <ComboBox
                                valueState="None"
                                value={selectedControlFamily}
                                onSelectionChange={
                                    handleControlFamilyComboBoxChange
                                }
                                loading={allControlFamilyDataResFetching}
                            >
                                {allControlFamilyDataRes.data.map(
                                    (head: getAllControlFamilyType) => (
                                        <ComboBoxItem
                                            key={head.ID}
                                            text={head.CONTROL_FAMILY_NAME}
                                            data-controlfamily-id={head.ID}
                                        />
                                    )
                                )}
                            </ComboBox>
                        </FilterGroupItem>
                    )}

                {/* Sync ID for filter bar */}
                {!error && data && data.length > 0 && (
                    <FilterGroupItem label="SYNC">
                        <ComboBox
                            value={selectedSync}
                            valueState="None"
                            onSelectionChange={handleSyncComboBoxChange}
                            loading={isLoading}
                        >
                            {data?.map((head: getHeaderTypes) => (
                                <ComboBoxItem
                                    key={head.SYNC_ID}
                                    text={head.SYNC_ID}
                                    data-sync-id={head.ID}
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
