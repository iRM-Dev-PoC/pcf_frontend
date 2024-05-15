import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
    Button,
    ButtonType,
    FCLLayout,
    Form,
    FormGroup,
    FormItem,
    Input,
    InputType,
    Label,
    TextArea,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type RoleData = {
    id: number;
    roleName: string;
    roleDescription: string;
};

type RoleEditFormProps = {
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
    roleName: z.string().min(1, { message: "Name is required" }),
    roleDescription: z.string().min(1, { message: "Description is required" }),
});

const RoleEditForm = ({
    id,
    roleDescription,
    roleName,
    setIsEdit,
    setLayout,
    setIsFullScreen,
}: RoleEditFormProps & RoleData) => {
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id,
            roleDescription,
            roleName,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/update-role`;

    const updateRole = async (data: RoleData) => {
        try {
            const updateData = {
                id,
                role_name: data.roleName,
                role_desc: data.roleDescription,
                customer_id: 1,
            };
            const response = await axios.patch(endPoint, updateData);

            if (response.data?.statuscode !== 200) {
                throw response.data?.message;
            }

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsEdit(false);
        }
    };

    const onSubmit = async (data: RoleData) => {
        await toast.promise(updateRole(data), {
            loading: "Updating role...",
            success: "Role updated successfully!",
            error: (error) => `Failed to update role: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allRoleData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            labelSpanM={4}
            className="flex items-center justify-center"
        >
            <FormGroup>
                <FormItem label={<Label required>Role Name</Label>}>
                    <Input
                        {...register("roleName", { required: true })}
                        valueState={
                            errors.roleName ? ValueState.Error : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.roleName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>
                <FormItem label={<Label required>Role Description</Label>}>
                    <TextArea
                        {...register("roleDescription", { required: true })}
                        valueState={
                            errors.roleDescription
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.roleDescription?.message}</span>
                        }
                        className="w-full"
                    />
                </FormItem>
            </FormGroup>
            <FormItem>
                <Button design="Positive" type={ButtonType.Submit}>
                    Update
                </Button>
            </FormItem>
        </Form>
    );
};

export default RoleEditForm;
