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

type ControlsData = {
    controlFamilyName: string;
    controlFamilyDescription: string;
};

const schema = z.object({
    controlFamilyName: z.string().min(1, { message: "Name is required" }),
    controlFamilyDescription: z
        .string()
        .min(1, { message: "Description is required" }),
});

const ControlFamilyCreationForm = ({
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
            controlFamilyName: "",
            controlFamilyDescription: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-family-master/create-control-family`;

    const fetchData = async (data: ControlsData) => {
        try {
            const reqData = {
                control_family_name: data.controlFamilyName,
                control_family_desc: data.controlFamilyDescription,
                customer_id: 1,
            };
            const response = await axios.post(endPoint, reqData);
            if (response.data.statuscode === 500) {
                throw new Error(response.data?.message);
            }

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onSubmit = async (data: ControlsData) => {
        await toast.promise(fetchData(data), {
            loading: "Creating control family...",
            success: "Control-Family created successfully!",
            error: (error) => `Failed to create control-family: ${error}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allControlFamilyData"],
        });
        closeButtonref.current?.click();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>Name</Label>}>
                    <Input
                        {...register("controlFamilyName", { required: true })}
                        valueState={
                            errors.controlFamilyName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.controlFamilyName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>
                <FormItem label={<Label required>Description</Label>}>
                    <TextArea
                        {...register("controlFamilyDescription", {
                            required: true,
                        })}
                        valueState={
                            errors.controlFamilyDescription
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>
                                {errors.controlFamilyDescription?.message}
                            </span>
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

export default ControlFamilyCreationForm;
