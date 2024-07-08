import { updateRole } from "@/actions/roles";
// import type { RoleData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

    const updateRoleMutation = useMutation({
        mutationFn: ({ data, id }: { data: RoleData; id: number }) =>
            updateRole(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allRoleData"] });
            setIsEdit(false);
            setIsFullScreen(false);
            setLayout(FCLLayout.OneColumn);
        },
    });

    const onSubmit = async (data: RoleData, id: number) => {
        toast.promise(updateRoleMutation.mutateAsync({ data, id }), {
            loading: "Updating role...",
            success: "Role updated successfully!",
            error: (error) => `Failed to update role: ${error.message}`,
        });
    };

    return (
        <Form
            onSubmit={handleSubmit((data) => onSubmit(data, id))}
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
