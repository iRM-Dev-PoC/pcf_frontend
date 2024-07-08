import { getAllControlFamilies } from "@/actions/controlFamiliy";
import { getAllTypeOfControls } from "@/actions/typeOfControl";
import ApplyFilterButton from "@/components/v2/ApplyFilterButton";
import { useHeaderData } from "@/hooks/useHeaderData";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import { getLastWeekDate } from "@/lib/utils";
import type {
    getAllControlFamilyType,
    getAllControlsType,
    getHeaderTypes,
} from "@/types";
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
    type DateRangePickerDomRef,
} from "@ui5/webcomponents-react";
import { ComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/ComboBox.js";
import type { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker";
import { useEffect, useState } from "react";

const FilterBarComponent = () => {
    const [selectedSync, setSelectedSync] = useState("");
    const [selectedControlFamily, setSelectedControlFamily] = useState("");
    const [selectedTypeOfControls, setSelectedTypeOfControls] = useState("");
    const { data, error, isLoading } = useHeaderData();
    const { setSelectedItem } = useSelectedItem();

    const [allFilterValues, setAllFilterValues] = useState({
        syncId: 1,
        controlFamilyId: 1,
        typeOfControlsId: 1,
        dateRange: getLastWeekDate(),
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

    const {
        data: allTypeOfControlsDataRes,
        isFetching: allTypeOfControlsDataResFetching,
        isError: allTypeOfControlsDataResError,
    } = useQuery({
        queryKey: ["allControlsData"],
        queryFn: getAllTypeOfControls,
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
        if (
            allTypeOfControlsDataRes &&
            allTypeOfControlsDataRes.data.length > 0
        ) {
            setSelectedTypeOfControls(
                allTypeOfControlsDataRes.data[0].CONTROL_NAME
            );
        }
    }, [data, allControlFamilyDataRes, allTypeOfControlsDataRes]);

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

    const handleTypeOfControlsComboBoxChange = (
        event: Ui5CustomEvent<
            ComboBoxDomRef,
            ComboBoxSelectionChangeEventDetail
        >
    ) => {
        const selectedItemId = Number(
            event.detail?.item?.getAttribute("data-typeofcontrols-id")
        );
        const selectedTypeOfControl =
            allTypeOfControlsDataRes?.data?.find(
                (item) => item.ID === selectedItemId
            ) || null;
        if (selectedTypeOfControl) {
            setSelectedTypeOfControls(selectedTypeOfControl.CONTROL_NAME);
        }
        setAllFilterValues({
            ...allFilterValues,
            typeOfControlsId: selectedTypeOfControl?.ID || 0,
        });
    };

    const handleDateRangePickerChange = (
        event: Ui5CustomEvent<
            DateRangePickerDomRef,
            DatePickerChangeEventDetail
        >
    ) => {
        const selectedDateRange = event.detail?.value;
        setAllFilterValues({
            ...allFilterValues,
            dateRange: selectedDateRange,
        });
    };

    return (
        <>
            <FilterBar
                filterContainerWidth="13.125rem"
                header={<Title>Filters</Title>}
                filterBarCollapsed
            >
                {/* Type of Controls for filter bar */}
                {!allTypeOfControlsDataResError &&
                    allTypeOfControlsDataRes &&
                    allTypeOfControlsDataRes.data.length > 0 && (
                        <FilterGroupItem label="Type Of Controls">
                            <ComboBox
                                valueState="None"
                                value={selectedTypeOfControls}
                                onSelectionChange={
                                    handleTypeOfControlsComboBoxChange
                                }
                                loading={allTypeOfControlsDataResFetching}
                            >
                                {allTypeOfControlsDataRes.data.map(
                                    (head: getAllControlsType) => (
                                        <ComboBoxItem
                                            key={head.ID}
                                            text={head.CONTROL_NAME}
                                            data-typeofcontrols-id={head.ID}
                                        />
                                    )
                                )}
                            </ComboBox>
                        </FilterGroupItem>
                    )}

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
                <DateRangePicker
                    onChange={handleDateRangePickerChange}
                    maxDate={new Date().toISOString().split("T")[0]}
                    value={getLastWeekDate()}
                />
                {/* Apply Filter Button */}
                <ApplyFilterButton value={allFilterValues} />
            </FilterBar>
        </>
    );
};
export default FilterBarComponent;
