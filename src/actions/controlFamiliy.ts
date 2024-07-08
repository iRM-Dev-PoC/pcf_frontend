import type { ControlsData } from "@/components/ControlFamilyCreation";
import type {
    ControlFamilyData,
    ControlFamilyResponse,
    getAllControlFamilyType,
} from "@/types";
import axios from "axios";

// Create a new control family.
export const createControlFamiliy = async (data: ControlsData) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-family-master/create-control-family`;
    try {
        const reqData = {
            control_family_name: data.controlFamilyName,
            control_family_desc: data.controlFamilyDescription,
            customer_id: 1,
        };
        const response = await axios.post(endPoint, reqData);
        if (response.data.statuscode !== 201) {
            throw new Error(response.data?.message);
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetches all controlFamilies from the backend.
export const getAllControlFamilies =
    async (): Promise<ControlFamilyResponse> => {
        const endPointAllControlFamily = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-family-master/get-all-control-family`;
        const response = await axios.get(endPointAllControlFamily);
        if (response.data.statuscode !== 200) {
            throw new Error("Failed to fetch controlFamilies");
        }
        return response.data;
    };

// Update a control family.
export const updateControlFamily = async (
    data: ControlFamilyData,
    id: number
) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-family-master/update-control-family`;
    try {
        const updateData = {
            id,
            control_family_name: data.controlFamilyName,
            control_family_desc: data.controlFamilyDescription,
            customer_id: 1,
        };
        const response = await axios.patch(endPoint, updateData);

        if (response.data?.statuscode !== 200) {
            throw new Error(response.data?.message);
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete a perticular control family.
export const deleteControlFamily = async (
    id: number
): Promise<getAllControlFamilyType> => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-family-master/delete-control-family`;
    const data = {
        id,
        customer_id: 1,
    };
    const response = await axios.patch(endPoint, data);
    if (response.data?.statuscode !== 200) {
        throw new Error(
            response.data?.message || "Failed to delete Control Family"
        );
    }

    return response.data;
};
