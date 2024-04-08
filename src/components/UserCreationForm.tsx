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
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import toast from "react-hot-toast";
import axios from "axios";

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

const UserCreationForm = () => {
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

    const onSubmit = (data: UserData) => {
        try {
            // const res = axios.post();
            toast.success("User being created");
            console.log(data);
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("[CREATE_USER]", error);
        }
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
                    Submit
                </Button>
            </FormItem>
        </Form>
    );
};

export default UserCreationForm;
