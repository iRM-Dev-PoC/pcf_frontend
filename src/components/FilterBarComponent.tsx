// import { getAllTypeOfControls } from "@/actions/typeOfControl";
// import ApplyFilterButton from "@/components/v2/ApplyFilterButton";
// import { useHeaderData } from "@/hooks/useHeaderData";
// import { useSelectedItem } from "@/hooks/useSelectedItem";
// import { getLastWeekDate } from "@/lib/utils";
// import type { getAllControlsType, getHeaderTypes } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import {
//     ComboBox,
//     ComboBoxDomRef,
//     ComboBoxItem,
//     DateRangePicker,
//     FilterBar,
//     FilterGroupItem,
//     Ui5CustomEvent,
//     type DateRangePickerDomRef,
// } from "@ui5/webcomponents-react";
// import { ComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/ComboBox.js";
// import type { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker";
// import { useEffect, useState } from "react";

// const formatDate = (date: Date) => {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     return `${year}/${month}/${day}`;
// };

// const FilterBarComponent = () => {
//     const [selectedSync, setSelectedSync] = useState("");
//     const [selectedTypeOfControls, setSelectedTypeOfControls] = useState("");
//     const { data, error, isLoading } = useHeaderData();
//     const { setSelectedItem } = useSelectedItem();

//     const today = new Date();
//     const startDate = new Date(today);
//     startDate.setDate(today.getDate() - 7);

//     const [allFilterValues, setAllFilterValues] = useState({
//         syncId: 1,
//         typeOfControlsId: 1,
//         startDate: startDate.toISOString().split("T")[0],
//         endDate: today.toISOString().split("T")[0],
//     });

//     const {
//         data: allTypeOfControlsDataRes,
//         isFetching: allTypeOfControlsDataResFetching,
//         isError: allTypeOfControlsDataResError,
//     } = useQuery({
//         queryKey: ["allControlsData"],
//         queryFn: getAllTypeOfControls,
//         retry: 3,
//     });

//     useEffect(() => {
//         if (data && data.length > 0) {
//             setSelectedSync(data[0].SYNC_ID);
//             setSelectedItem(data[0]);
//         }

//         if (
//             allTypeOfControlsDataRes &&
//             allTypeOfControlsDataRes.data.length > 0
//         ) {
//             setSelectedTypeOfControls(
//                 allTypeOfControlsDataRes.data[0].CONTROL_NAME
//             );
//         }
//     }, [data, allTypeOfControlsDataRes]);

//     const handleSyncComboBoxChange = (
//         event: Ui5CustomEvent<
//             ComboBoxDomRef,
//             ComboBoxSelectionChangeEventDetail
//         >
//     ) => {
//         const selectedItemId = Number(
//             event.detail?.item?.getAttribute("data-sync-id")
//         );
//         const selectedItem =
//             data?.find((item) => item.ID === selectedItemId) || null;
//         setSelectedItem(selectedItem);
//         const selectedSync = selectedItem?.SYNC_ID || "";
//         setSelectedSync(selectedSync);
//         setAllFilterValues({
//             ...allFilterValues,
//             syncId: selectedItemId || 0,
//         });
//     };

//     const handleTypeOfControlsComboBoxChange = (
//         event: Ui5CustomEvent<
//             ComboBoxDomRef,
//             ComboBoxSelectionChangeEventDetail
//         >
//     ) => {
//         const selectedItemId = Number(
//             event.detail?.item?.getAttribute("data-typeofcontrols-id")
//         );
//         const selectedTypeOfControl =
//             allTypeOfControlsDataRes?.data?.find(
//                 (item) => item.ID === selectedItemId
//             ) || null;
//         if (selectedTypeOfControl) {
//             setSelectedTypeOfControls(selectedTypeOfControl.CONTROL_NAME);
//         }
//         setAllFilterValues({
//             ...allFilterValues,
//             typeOfControlsId: selectedTypeOfControl?.ID || 0,
//         });
//     };

//     const handleDateRangePickerChange = (
//         event: Ui5CustomEvent<
//             DateRangePickerDomRef,
//             DatePickerChangeEventDetail
//         >
//     ) => {
//         const selectedDateRange = event.detail?.value;
//         console.log(selectedDateRange);
//         const [startDateStr, endDateStr] = selectedDateRange
//             .split(" - ")
//             .map((dateStr) => dateStr.trim());
//         const startDate = new Date(startDateStr);
//         const endDate = new Date(endDateStr);
//         setAllFilterValues({
//             ...allFilterValues,
//             startDate: formatDate(startDate),
//             endDate: formatDate(endDate),
//         });
//     };

//     return (
//         <>
//             <FilterBar
//                 filterContainerWidth="15rem"
//                 // header={<Title>Filters</Title>}
//                 filterBarCollapsed
//             >
//                 {/* Type of Controls for filter bar */}
//                 {!allTypeOfControlsDataResError &&
//                     allTypeOfControlsDataRes &&
//                     allTypeOfControlsDataRes.data.length > 0 && (
//                         <FilterGroupItem label="Type Of Controls">
//                             <ComboBox
//                                 valueState="None"
//                                 value={selectedTypeOfControls}
//                                 onSelectionChange={
//                                     handleTypeOfControlsComboBoxChange
//                                 }
//                                 loading={allTypeOfControlsDataResFetching}
//                             >
//                                 {allTypeOfControlsDataRes.data.map(
//                                     (head: getAllControlsType) => (
//                                         <ComboBoxItem
//                                             key={head.ID}
//                                             text={head.CONTROL_NAME}
//                                             data-typeofcontrols-id={head.ID}
//                                         />
//                                     )
//                                 )}
//                             </ComboBox>
//                         </FilterGroupItem>
//                     )}
//                 {/* Date Range Picker
//                 <DateRangePicker
//                     onChange={handleDateRangePickerChange}
//                     maxDate={new Date().toISOString().split("T")[0]}
//                     value={getLastWeekDate()}
//                     formatPattern="yyyy/MM/dd"
//                 /> */}

//                 {/* Sync ID for filter bar */}
//                 {!error && data && data.length > 0 && (
//                     <FilterGroupItem label="SYNC">
//                         <ComboBox
//                             value={selectedSync}
//                             valueState="None"
//                             onSelectionChange={handleSyncComboBoxChange}
//                             loading={isLoading}
//                         >
//                             {data?.map((head: getHeaderTypes) => (
//                                 <ComboBoxItem
//                                     key={head.SYNC_ID}
//                                     text={head.SYNC_ID}
//                                     data-sync-id={head.ID}
//                                 />
//                             ))}
//                         </ComboBox>
//                     </FilterGroupItem>
//                 )}
//                 {/* Apply Filter Button */}
//                 <ApplyFilterButton value={allFilterValues} />
//             </FilterBar>
//         </>
//     );
// };
// export default FilterBarComponent;
// commented by prity for future changes

import { getAllTypeOfControls } from "@/actions/typeOfControl";
import ApplyFilterButton from "@/components/v2/ApplyFilterButton";
import { useHeaderData } from "@/hooks/useHeaderData";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import { getLastWeekDate } from "@/lib/utils";
import type { getAllControlsType, getHeaderTypes } from "@/types";
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

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
};

const FilterBarComponent = ({ setFilterData }: any) => {
    const [selectedSync, setSelectedSync] = useState("");
    const [selectedTypeOfControls, setSelectedTypeOfControls] = useState("");
    const { data, error, isLoading } = useHeaderData();
    const { setSelectedItem } = useSelectedItem();

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);

    const [allFilterValues, setAllFilterValues] = useState({
        syncId: 1,
        typeOfControlsId: 1,
        startDate: startDate.toISOString().split("T")[0],
        endDate: today.toISOString().split("T")[0],
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
            allTypeOfControlsDataRes &&
            allTypeOfControlsDataRes.data.length > 0
        ) {
            setSelectedTypeOfControls(
                allTypeOfControlsDataRes.data[0].CONTROL_NAME
            );
        }
    }, [data, allTypeOfControlsDataRes]);

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
        console.log(selectedDateRange);
        const [startDateStr, endDateStr] = selectedDateRange
            .split(" - ")
            .map((dateStr) => dateStr.trim());
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        setAllFilterValues({
            ...allFilterValues,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
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
                {/* Date Range Picker
                <DateRangePicker
                    onChange={handleDateRangePickerChange}
                    maxDate={new Date().toISOString().split("T")[0]}
                    value={getLastWeekDate()}
                    formatPattern="yyyy/MM/dd"
                /> */}
                {/* Apply Filter Button */}
                <ApplyFilterButton
                    value={allFilterValues}
                    setFilterData={setFilterData}
                />
            </FilterBar>
        </>
    );
};
export default FilterBarComponent;
 