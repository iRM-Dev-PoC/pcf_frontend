import type { ControlsData } from "@/components/ControlCreationForm";
import type { ControlsData as editControl } from "@/components/ControlEditForm";
import type { TypeOfControlResponse } from "@/types";
import axios from "axios";

// Create a new type of control.
export const createTypeOfControl = async (data: ControlsData) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/create-control`;
    try {
        let control_id_data: number;

        if (data.controlValue === "Order To Cash") {
            control_id_data = 1;
        } else {
            control_id_data = 2;
        }
        const reqData = {
            control_name: data.controlName,
            control_desc: data.controlDescription,
            control_family_id: control_id_data,
            customer_id: 1,
        };
        const response = await axios.post(endPoint, reqData);
        if (response.data.statuscode !== 201) {
            throw new Error(
                response.data?.message || "Failed to create Type of Control"
            );
        }

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetches all type of controls from the backend.
export const getAllTypeOfControls =
    async (): Promise<TypeOfControlResponse> => {
        const endPointAllControls = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/get-all-controls`;
        const response = await axios.get(endPointAllControls);
        if (response.data.statuscode !== 200) {
            throw new Error("Failed to fetch controlFamilies");
        }
        return response.data;
    };

// Update a type of control.
export const updateTypeOfControl = async (data: editControl, id: number) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/update-control`;
    try {
        const updateData = {
            id,
            control_name: data.controlName,
            control_desc: data.controlDescription,
            customer_id: 1,
        };
        const response = await axios.patch(endPoint, updateData);

        if (response.data?.statuscode !== 200) {
            throw new Error(
                response.data?.message || "Failed to update Type of Control"
            );
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete a perticular type of control.
export const deleteTypeOfControl = async (id: number) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/delete-control`;
    try {
        const data = {
            id,
            customer_id: 1,
        };
        const response = await axios.patch(endPoint, data);
        if (response.data?.statuscode !== 200) {
            throw new Error(
                response.data?.message || "Failed to delete Type of Control"
            );
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
