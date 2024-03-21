import {
    DynamicPage,
    DynamicPageHeader,
    DynamicPageTitle,
    DatePicker,
} from "@ui5/webcomponents-react";
import RiskCard from "../components/RiskCard";
import cardData from "../lib/cardData";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import FilterBarComponent from "../components/FilterBarComponent";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate("/dashboard");
    };

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
            {cardData.map((card, index) => (
                <RiskCard
                    key={index}
                    header={card.header}
                    icon={card.icon}
                    risk={card.risk}
                    description={card.description}
                    onClick={handleCardClick}
                />
            ))}
        </DynamicPage>
    );
};
export default Home;




