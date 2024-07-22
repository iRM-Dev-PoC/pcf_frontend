import { Button } from "@ui5/webcomponents-react";
import axios from "axios";

type ApplyFilterButtonProps = {
    value: {
        syncId: number;
        typeOfControlsId: number;
    };
    setFilterData: any;
};

const ApplyFilterButton = ({
    value,
    setFilterData,
}: ApplyFilterButtonProps) => {
    const handleFilterButtonClick = async () => {
        console.log("Filter Values", value);
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
        try {
            const reqData = {
                typeOfControlsId: value.typeOfControlsId,
                hdrId: value.syncId
            };
            const response = await axios.post(endPoint, reqData);
            console.log("response", response);
            if (response.data.statuscode !== 201) {
                // throw new Error(response.data?.message);
                setFilterData(response);
            }

            // return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    return (
        <>
        {/* <Button
            onClick={handleFilterButtonClick}
            className="ml-2 p-2"
            tooltip="Apply Filters"
            design="Emphasized"
        >
            Apply Filter
        </Button> */}

        <Button 
        onClick={handleFilterButtonClick}
        className="bg-cyan-700 text-l font-extrabold text-white"
        >
            Apply Filter
        </Button>

        </>

    );
};

export default ApplyFilterButton;
