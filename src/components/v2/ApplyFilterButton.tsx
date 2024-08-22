import { Button } from "@ui5/webcomponents-react";
import axios from "axios";

interface ApplyFilterButtonProps {
    allFilterValues: {
        syncId: number;
        typeOfControlsId: number;
    };
    setFilterData: (data: any) => void;
    resetFilters: () => void; // Add this prop
}

const ApplyFilterButton: React.FC<ApplyFilterButtonProps> = ({
    allFilterValues,
    setFilterData,
    resetFilters, // Destructure resetFilters
}) => {
    const handleApplyFilterClick = async () => {
        try {
            const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
            const response = await axios.post(endPoint, {
                ...allFilterValues,
            });

            if (response.data.statuscode !== 201) {
                setFilterData(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilterClick = () => {
        resetFilters(); // Invoke resetFilters on button click
    };

    return (
        <div className="grid grid-cols-2 gap-5">
            <Button 
                onClick={handleApplyFilterClick}
                className="bg-cyan-700 text-l font-extrabold text-white"
            >
                Apply Filter
            </Button>

            <Button 
                onClick={handleResetFilterClick} 
                className="bg-cyan-700 text-l font-extrabold text-white"
            >
                Reset Filter
            </Button>
        </div>
    );
};

export default ApplyFilterButton;
