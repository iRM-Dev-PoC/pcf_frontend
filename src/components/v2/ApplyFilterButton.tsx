// import { Button } from "@ui5/webcomponents-react";

// type ApplyFilterButtonProps = {
//     value: {
//         syncId: number;
//         typeOfControlsId: number;
//         startDate: string;
//         endDate: string;
//     };
// };

// const ApplyFilterButton = ({ value }: ApplyFilterButtonProps) => {
//     const handleFilterButtonClick = () => {
//         console.log("Filter Values", value);
//     };
//     return (
//         <Button
//             onClick={handleFilterButtonClick}
//             className="ml-2 p-2"
//             tooltip="Apply Filters"
//             design="Emphasized"
//         >
//             Apply Filter
//         </Button>
//     );
// };

// export default ApplyFilterButton;
// commented by prity for future changes

import { Button } from "@ui5/webcomponents-react";
import axios from "axios";

type ApplyFilterButtonProps = {
    value: {
        syncId: number;
        typeOfControlsId: number;
        startDate: string;
        endDate: string;
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
        <Button
            onClick={handleFilterButtonClick}
            className="ml-2 p-2"
            tooltip="Apply Filters"
            design="Emphasized"
        >
            Apply Filter
        </Button>
    );
};

export default ApplyFilterButton;
