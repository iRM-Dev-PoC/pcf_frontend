import { useQuery } from "@tanstack/react-query";
import {
    ComboBox,
    FilterBar,
    FilterGroupItem,
    MultiComboBox,
    MultiComboBoxItem,
    Title,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useState } from "react";

const FilterBarComponent = () => {
    const [error, setError] = useState(false);
    const getHeaderData = async () => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/data-sync/get-all-headers`;
        try {
            const res = await axios.get(endPoint);
            if (res.data?.statuscode === 200) {
                setError(false);
            } else {
                setError(true);
            }
            return res.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data } = useQuery({
        queryKey: ["allHeaderData"],
        queryFn: getHeaderData,
        retry: 3,
    });

    const value = data?.data;
    console.log("value", value);

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
                        {value?.map((head) => (
                            <MultiComboBoxItem text={head.SYNC_ID} />
                        ))}
                    </ComboBox>
                </FilterGroupItem>
            </FilterBar>
        </>
    );
};
export default FilterBarComponent;
