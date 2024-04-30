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
    ComboBox,
    ComboBoxItem,
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type ControlsData = {
    controlValue: string;
    controlName: string;
    controlDescription: string;
};

const schema = z.object({
    controlName: z.string().min(1, { message: "Name is required" }),
    controlDescription: z
        .string()
        .min(1, { message: "Description is required" }),
    controlValue: z.string(),
});

const ControlCreationForm = ({
    closeButtonref,
}: {
    closeButtonref: React.RefObject<ButtonDomRef>;
}) => {
    const [selectedValue, setSelectedValue] = useState("");
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            controlName: "",
            controlDescription: "",
            controlValue: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/create-control`;

    const fetchData = async (data: ControlsData) => {
        try {
            let control_id_data: number;

            if (data.controlValue === "Order To Cash") {
                control_id_data = 1;
            } else {
                control_id_data = 2;
            }
            const reqData = {
                control_name: data.controlName,
                control_desc: data.controlDescription,
                control_family_id: control_id_data,
                customer_id: 1,
            };
            const response = await axios.post(endPoint, reqData);
            if (response.data.statuscode === 500) {
                throw response.data?.message;
            }

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onSubmit = async (data: ControlsData) => {
        await toast.promise(fetchData(data), {
            loading: "Creating control...",
            success: "Control created successfully!",
            error: (error) => `Failed to create control: ${error}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allControlsData"],
        });
        closeButtonref.current?.click();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>Control family</Label>}>
                    <ComboBox
                        value={selectedValue}
                        className="w-full"
                        onSelectionChange={(e) => {
                            setSelectedValue(e.detail.item.text);
                        }}
                        valueState={
                            errors.controlValue
                                ? ValueState.Error
                                : ValueState.None
                        }
                        {...register("controlValue", { required: true })}
                    >
                        <ComboBoxItem text="Order To Cash" data-value={1} />
                        <ComboBoxItem text="Procure To Pay" data-value={2} />
                    </ComboBox>
                </FormItem>
                <FormItem label={<Label required>Name</Label>}>
                    <Input
                        {...register("controlName", { required: true })}
                        valueState={
                            errors.controlName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.controlName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>
                <FormItem label={<Label required>Description</Label>}>
                    <TextArea
                        {...register("controlDescription", {
                            required: true,
                        })}
                        valueState={
                            errors.controlDescription
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.controlDescription?.message}</span>
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

export default ControlCreationForm;
