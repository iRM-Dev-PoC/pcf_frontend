import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
    Button,
    ButtonDomRef,
    ButtonType,
    ComboBox,
    ComboBoxItem,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type CheckPointData = {
    checkPointName: string;
    checkPointDesc: string;
    controlValue: string;
};

const schema = z.object({
    checkPointName: z.string().min(1, { message: "Name is required" }),
    checkPointDesc: z.string().min(1, { message: "Description is required" }),
    controlValue: z.string(),
});

const CheckPointCreationForm = ({
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
            checkPointName: "",
            checkPointDesc: "",
            controlValue: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/check-point-master/create-check-point`;

    const createCheckPoint = async (data: CheckPointData) => {
        try {
            let control_id_data: number;

            if (data.controlValue === "Order To Cash") {
                control_id_data = 1;
            } else {
                control_id_data = 2;
            }
            const reqData = {
                check_point_name: data.checkPointName,
                check_point_desc: data.checkPointDesc,
                customer_id: 1,
                control_id: control_id_data,
            };
            const response = await axios.post(endPoint, reqData);

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onSubmit = async (data: CheckPointData) => {
        await toast.promise(createCheckPoint(data), {
            loading: "Creating check point...",
            success: "Check point created successfully!",
            error: (error) => `Failed to create Check point: ${error.message}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allCheckPointData"],
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
                        {...register("checkPointName", { required: true })}
                        valueState={
                            errors.checkPointName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.checkPointName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>
                <FormItem label={<Label required>Description</Label>}>
                    <TextArea
                        {...register("checkPointDesc", { required: true })}
                        valueState={
                            errors.checkPointDesc
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.checkPointDesc?.message}</span>
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

export default CheckPointCreationForm;
