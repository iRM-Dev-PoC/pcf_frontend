import { updateTypeOfControl } from "@/actions/typeOfControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
    Button,
    ButtonType,
    FCLLayout,
    Form,
    FormGroup,
    FormItem,
    Input,
    InputType,
    Label,
    TextArea,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export type ControlsData = {
    id: number;
    controlName: string;
    controlDescription: string;
};

type ControlEditFormProps = {
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
    controlName: z.string().min(1, { message: "Name is required" }),
    controlDescription: z
        .string()
        .min(1, { message: "Description is required" }),
});

const ControlEditForm = ({
    id,
    controlName,
    controlDescription,
    setIsEdit,
    setLayout,
    setIsFullScreen,
}: ControlEditFormProps & ControlsData) => {
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id,
            controlName,
            controlDescription,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const updateControlFamilyMutation = useMutation({
        mutationFn: ({ data, id }: { data: ControlsData; id: number }) =>
            updateTypeOfControl(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allControlsData"] });
            setIsEdit(false);
            setIsFullScreen(false);
            setLayout(FCLLayout.OneColumn);
        },
    });

    const onSubmit = async (data: ControlsData, id: number) => {
        toast.promise(updateControlFamilyMutation.mutateAsync({ data, id }), {
            loading: "Updating type of control...",
            success: "Type of control updated successfully!",
            error: (error) =>
                `Failed to update type of control: ${error.message}`,
        });
    };

    return (
        <Form
            onSubmit={handleSubmit((data) => onSubmit(data, id))}
            labelSpanM={4}
            className="flex items-center justify-center"
        >
            <FormGroup>
                <FormItem label={<Label required>Control Name</Label>}>
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
                <FormItem label={<Label required>Control Description</Label>}>
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
                <Button design="Positive" type={ButtonType.Submit}>
                    Update
                </Button>
            </FormItem>
        </Form>
    );
};

export default ControlEditForm;
