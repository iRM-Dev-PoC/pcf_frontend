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
    ButtonDomRef,
    TextArea,
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type RoleData = {
    roleName: string;
    roleDescription: string;
};

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

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/create-role`;

    const fetchData = async (data: RoleData) => {
        try {
            const reqData = {
                role_name: data.roleName,
                role_desc: data.roleDescription,
                customer_id: 1,
            };
            const response = await axios.post(endPoint, reqData);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onSubmit = async (data: RoleData) => {
        await toast.promise(fetchData(data), {
            loading: "Creating role...",
            success: "Role created successfully!",
            error: (error) => `Failed to create role: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allRoleData"] });
        closeButtonref.current?.click();
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
