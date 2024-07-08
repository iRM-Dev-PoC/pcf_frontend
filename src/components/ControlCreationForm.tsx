import { createTypeOfControl } from "@/actions/typeOfControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export type ControlsData = {
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

    const createTypeOfControlMutation = useMutation({
        mutationFn: createTypeOfControl,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allControlsData"],
            });
            closeButtonref.current?.click();
        },
    });

    const onSubmit = async (data: ControlsData) => {
        toast.promise(createTypeOfControlMutation.mutateAsync(data), {
            loading: "Creating type of control...",
            success: "Type of control created successfully!",
            error: (error) =>
                `Failed to create type of control: ${error.message}`,
        });
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
