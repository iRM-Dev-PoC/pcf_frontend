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
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import toast from "react-hot-toast";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

type UserData = {
    id: number;
    username: string;
    email: string;
};

type UserEditFormProps = {
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
});

const UserEditForm = ({
    id,
    email,
    username,
    setIsEdit,
    setLayout,
    setIsFullScreen,
}: UserEditFormProps & UserData) => {
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: id,
            email: email,
            username: username,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/loginuser/update-user`;

    const updateUser = async (data: UserData) => {
        try {
            const updateData = {
                id: id,
                user_name: data.username,
                user_email: data.email,
                password: "test2",
                user_emp_id: "emp_5651",
            };
            const response = await axios.patch(endPoint, updateData);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsEdit(false);
        }
    };

    const onSubmit = async (data: UserData) => {
        await toast.promise(updateUser(data), {
            loading: "Updating user...",
            success: "User updated successfully!",
            error: (error) => `Failed to update user: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allUserData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>First Name</Label>}>
                    <Input
                        {...register("username", { required: true })}
                        valueState={
                            errors.username ? ValueState.Error : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.username?.message}</span>
                        }
                        type={InputType.Text}
                    />
                </FormItem>
                <FormItem label={<Label required>Email address</Label>}>
                    <Input
                        {...register("email", { required: true })}
                        valueState={
                            errors.email ? ValueState.Error : ValueState.None
                        }
                        valueStateMessage={<span>{errors.email?.message}</span>}
                        type={InputType.Email}
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

export default UserEditForm;
