import { DatePicker, FlexBox } from "@ui5/webcomponents-react";

const DashboardDatePicker = () => {
	return (
		<FlexBox
			alignItems="End"
			justifyContent="End"
			className="gap-x-2  mr-2 mb-2 mt-2">
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
