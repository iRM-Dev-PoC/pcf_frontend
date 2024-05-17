import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type UserData = {
    firstName: string;
    lastName: string;
    email: string;
};

const schema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
});

const UserCreationForm = ({
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
            email: "",
            firstName: "",
            lastName: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/loginuser/create-user`;

    const createUser = async (data: UserData) => {
        try {
            const userName: string = `${data.firstName} ${data.lastName}`;
            const reqData = {
                user_name: userName,
                user_email: data.email,
                password: "test2",
                user_emp_id: "emp_5651",
            };
            const response = await axios.post(endPoint, reqData);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onSubmit = async (data: UserData) => {
        await toast.promise(createUser(data), {
            loading: "Creating user...",
            success: "User created successfully!",
            error: (error) => `Failed to create user: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allUserData"] });
        closeButtonref.current?.click();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>First Name</Label>}>
                    <Input
                        {...register("firstName", { required: true })}
                        valueState={
                            errors.firstName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.firstName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>
                <FormItem label={<Label required>Last Name</Label>}>
                    <Input
                        {...register("lastName", { required: true })}
                        valueState={
                            errors.lastName ? ValueState.Error : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.lastName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
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

export default UserCreationForm;
