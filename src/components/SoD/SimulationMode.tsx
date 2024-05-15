import { getCurrentDatetime } from "@/lib/utils";
import { Button, FlexBox, Text } from "@ui5/webcomponents-react";

const SimulationMode = () => {
    const date = getCurrentDatetime();
    return (
        <FlexBox direction="Column" className="mb-4 gap-2">
            <Text style={{ fontSize: "1.12rem", fontWeight: "bold" }}>
                Simulation Date : {date}
            </Text>
            <FlexBox direction="Row" className="ml-3 gap-x-3">
                <Button design="Emphasized">Executive Summary</Button>
                <Button design="Default">SoD Analysis</Button>
                <Button design="Default">Sensitive Access Analysis</Button>
                <Button design="Default">Ruleset</Button>
            </FlexBox>
        </FlexBox>
    );
};

export default SimulationMode;
