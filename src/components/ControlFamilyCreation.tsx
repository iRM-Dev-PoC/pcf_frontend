import { createControlFamiliy } from "@/actions/controlFamiliy";
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

export type ControlsData = {
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

    const createControlFamiliyMutation = useMutation({
        mutationFn: createControlFamiliy,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allControlFamilyData"],
            });
            closeButtonref.current?.click();
        },
    });

    const onSubmit = async (data: ControlsData) => {
        toast.promise(createControlFamiliyMutation.mutateAsync(data), {
            loading: "Creating control family...",
            success: "Control-Family created successfully!",
            error: (error) =>
                `Failed to create control-family: ${error.message}`,
        });
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
