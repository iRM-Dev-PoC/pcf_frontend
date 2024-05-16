import { Button, CheckBox, FlexBox, Label } from "@ui5/webcomponents-react";

type TableHeaderProps = {
    title: string;
    setSod: (value: boolean) => void;
    setSensitive: (value: boolean) => void;
    setAll: (value: boolean) => void;
};

const TableHeader = ({
    title,
    setAll,
    setSensitive,
    setSod,
}: TableHeaderProps) => {
    return (
        <div className="mb-6">
            <h3 className="pl-6 pt-4 text-xl font-bold">{title}</h3>
            <FlexBox
                alignItems="Center"
                justifyContent="Center"
                className="gap-x-4"
                style={{ display: "flex", alignItems: "stretch" }}
            >
                {/* SOD Checkbox */}
                <div style={{ display: "flex", alignItems: "stretch" }}>
                    <CheckBox
                        onChange={(event) => setSod(event.target.checked)}
                    />
                    <Label className="text-xl" style={{ alignItems: "center" }}>
                        Segregation of Duties
                    </Label>
                </div>

                {/* Sensitive Access Checkbox */}
                <div style={{ display: "flex", alignItems: "stretch" }}>
                    <CheckBox
                        onChange={(event) => setSensitive(event.target.checked)}
                    />
                    <Label className="text-xl" style={{ alignItems: "center" }}>
                        Sensitive Access
                    </Label>
                </div>

                {/* All Checkbox */}
                <div style={{ display: "flex", alignItems: "stretch" }}>
                    <CheckBox
                        onChange={(event) => setAll(event.target.checked)}
                    />
                    <Label className="text-xl" style={{ alignItems: "center" }}>
                        All
                    </Label>
                </div>

                {/* Refresh Button */}
                <Button
                    onClick={() => {
                        console.log("Refresh Button Clicked");
                    }}
                    style={{ alignItems: "center" }}
                    icon="refresh"
                ></Button>
            </FlexBox>
        </div>
    );
};

export default TableHeader;
