import { Button } from "@ui5/webcomponents-react";
import axios from "axios";

type ApplyFilterButtonProps = {
    value: {
        syncId: number;
        typeOfControlsId: number;
    };
    setFilterData: (data: any) => void;
    resetFilters: () => void;
};

const ApplyFilterButton = ({
    value,
    setFilterData,
    resetFilters,
}: ApplyFilterButtonProps) => {
    const handleFilterButtonClick = async () => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
        try {
            const reqData = {
                typeOfControlsId: value.typeOfControlsId,
                hdrId: value.syncId,
            };
            const response = await axios.post(endPoint, reqData);
            if (response.data.statuscode !== 201) {
                setFilterData(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilterButtonClick = () => {
        resetFilters(); // Reset filters and trigger a fresh data fetch if necessary
    };

    return (
        <div className="grid grid-cols-3 gap-5">
            <Button
                onClick={handleFilterButtonClick}
                className="bg-cyan-700 text-l font-extrabold text-white"
            >
                Apply Filter
            </Button>

            <Button
                onClick={handleResetFilterButtonClick}
                className="bg-cyan-700 text-l font-extrabold text-white"
            >
                Reset Filter
            </Button>
        </div>
    );
};

export default ApplyFilterButton;
