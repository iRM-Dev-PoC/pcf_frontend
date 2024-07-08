import { createRole } from "@/actions/roles";
import type { RoleData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
    Button,
    ButtonDomRef,
    ButtonType,
    Form,
    FormGroup,
    FormItem,
    Input,
    InputType,
    Label,
    TextArea,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
    roleName: z.string().min(1, { message: "Name is required" }),
    roleDescription: z.string().min(1, { message: "Description is required" }),
});

const RoleCreationForm = ({
    closeButtonref,
}: {
    closeButtonref: React.RefObject<ButtonDomRef>;
}) => {
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            roleName: "",
            roleDescription: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const createRoleMutation = useMutation({
        mutationFn: createRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allRoleData"] });
            closeButtonref.current?.click();
        },
    });

    const onSubmit = async (data: RoleData) => {
        toast.promise(createRoleMutation.mutateAsync(data), {
            loading: "Creating role...",
            success: "Role created successfully!",
            error: (error) => `Failed to create role: ${error.message}`,
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>Name</Label>}>
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
                <FormItem label={<Label required>Description</Label>}>
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
                <Button
                    design="Transparent"
                    type={ButtonType.Submit}
                    className="mx-auto"
                >
                    Submit
                </Button>
            </FormItem>
        </Form>
    );
};

export default RoleCreationForm;
