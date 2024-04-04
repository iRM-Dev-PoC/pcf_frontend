import {
    DynamicPage,
    DynamicPageHeader,
    DynamicPageTitle,
    DatePicker,
} from "@ui5/webcomponents-react";
import cardData from "../lib/cardData";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import FilterBarComponent from "../components/FilterBarComponent";
import FlexibleColumnTemplete from "../components/FlexibleColumnTemplete";

const Home = () => {
    return (
        <DynamicPage
            headerContent={
                <DynamicPageHeader>
                    <FilterBarComponent />
                </DynamicPageHeader>
            }
            headerTitle={
                <DynamicPageTitle
                    actions={
                        <>
                            <DatePicker
                                onChange={function _a() {}}
                                onInput={function _a() {}}
                                onValueStateChange={function _a() {}}
                                primaryCalendarType="Gregorian"
                                valueState="None"
                                placeholder="Start Date"
                            />
                            <DatePicker
                                onChange={function _a() {}}
                                onInput={function _a() {}}
                                onValueStateChange={function _a() {}}
                                primaryCalendarType="Gregorian"
                                valueState="None"
                                placeholder="End Date"
                            />
                        </>
                    }
                ></DynamicPageTitle>
            }
            style={{
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <FlexibleColumnTemplete dataCard={cardData} />
        </DynamicPage>
    );
};
export default Home;
