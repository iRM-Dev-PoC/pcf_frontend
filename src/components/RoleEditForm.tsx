import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import {
    Form,
    FormGroup,
    FormItem,
    Label,
    Input,
    Button,
    InputType,
    ButtonType,
    FCLLayout,
    TextArea,
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import toast from "react-hot-toast";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

type RoleData = {
    id: string;
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
                user_name: data.roleName,
                user_roleDescription: data.roleDescription,
            };
            const response = await axios.patch(endPoint, updateData);

            return response.data;
        } catch (error) {
            console.error(error);
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
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
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
