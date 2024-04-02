import { DatePicker, FlexBox } from "@ui5/webcomponents-react";

const DashboardDatePicker = () => {
    return (
        <FlexBox
            alignItems="End"
            justifyContent="End"
            className="mb-2  mr-2 mt-2 gap-x-2"
        >
            <DatePicker
                onChange={function _a() {}}
                onInput={function _a() {}}
                onValueStateChange={function _a() {}}
                primaryCalendarType="Gregorian"
                valueState="None"
                placeholder="From Date"
            />
            <DatePicker
                onChange={function _a() {}}
                onInput={function _a() {}}
                onValueStateChange={function _a() {}}
                primaryCalendarType="Gregorian"
                valueState="None"
                placeholder="To Date"
            />
        </FlexBox>
    );
};

export default DashboardDatePicker;
