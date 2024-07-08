import type { RoleData, RoleDataResponse } from "@/types";
import axios from "axios";

// Create a new role.
export const createRole = async (data: RoleData) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/create-role`;
    try {
        const reqData = {
            role_name: data.roleName,
            role_desc: data.roleDescription,
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

// Fetches all roles from the backend.
export const getAllRoles = async (): Promise<RoleDataResponse> => {
    const endPointAllRoles = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/get-all-roles`;
    const response = await axios.get(endPointAllRoles);
    if (response.status !== 200) {
        throw new Error("Failed to fetch roles");
    }
    return response.data;
};

//Update a role.
export const updateRole = async (data: RoleData, id: number) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/update-role`;
    try {
        const updateData = {
            id,
            role_name: data.roleName,
            role_desc: data.roleDescription,
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

// Delete a perticular role.
export const deleteRole = async (id: number) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/delete-role`;
    const data = {
        id,
        customer_id: 1,
    };
    const response = await axios.patch(endPoint, data);
    if (response.data?.statuscode !== 200) {
        throw new Error(response.data?.message || "Failed to delete role");
    }
    return response.data;
};
