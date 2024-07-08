import { Button, ButtonDesign } from "@ui5/webcomponents-react";

const ApplyFilterButton = () => {
    const handleFilterButtonClick = () => {
        console.log("Filter Button Clicked");
    };
    return (
        <Button
            onClick={handleFilterButtonClick}
            className="ml-2 p-2"
            tooltip="Apply Filters"
            design={ButtonDesign.Emphasized}
        >
            Apply Filter
        </Button>
    );
};

export default ApplyFilterButton;
