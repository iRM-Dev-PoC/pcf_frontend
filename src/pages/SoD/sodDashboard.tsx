import { DynamicPage } from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";

import CanDoSummary from "@/components/SoD/CanDoSummary";
import CanDovsDidDoAnalysis from "@/components/SoD/CanDovsDidDoAnalysis";
import ExecutiveSummary from "@/components/SoD/ExecutiveSummary";
import FilterbarComponent from "@/components/SoD/FilterbarComponent";
import SimulationComparisonDate from "@/components/SoD/SimulationComparisonDate";
import SimulationMode from "@/components/SoD/SimulationMode";

const SoDDashboard = () => {
    return (
        <DynamicPage
            headerContent={
                <>
                    <SimulationComparisonDate />
                    <FilterbarComponent />
                </>
            }
            style={{
                maxHeight: "91svh",
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <SimulationMode />

            <ExecutiveSummary />

            <CanDoSummary />

            <CanDovsDidDoAnalysis />
        </DynamicPage>
    );
};

export default SoDDashboard;
