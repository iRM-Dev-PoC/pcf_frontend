import { updateControlFamily } from "@/actions/controlFamiliy";
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

export type ControlFamilyData = {
    id: number;
    controlFamilyName: string;
    controlFamilyDescription: string;
};

type ControlFamilyEditFormProps = {
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
    controlFamilyName: z.string().min(1, { message: "Name is required" }),
    controlFamilyDescription: z
        .string()
        .min(1, { message: "Description is required" }),
});

const ControlFamilyEditForm = ({
    id,
    controlFamilyName,
    controlFamilyDescription,
    setIsEdit,
    setLayout,
    setIsFullScreen,
}: ControlFamilyEditFormProps & ControlFamilyData) => {
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id,
            controlFamilyName,
            controlFamilyDescription,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const updateControlFamilyMutation = useMutation({
        mutationFn: ({ data, id }: { data: ControlFamilyData; id: number }) =>
            updateControlFamily(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allRoleData"] });
            setIsEdit(false);
            setIsFullScreen(false);
            setLayout(FCLLayout.OneColumn);
        },
    });

    const onSubmit = async (data: ControlFamilyData, id: number) => {
        toast.promise(updateControlFamilyMutation.mutateAsync({ data, id }), {
            loading: "Updating control-family...",
            success: "Control-Family updated successfully!",
            error: (error) =>
                `Failed to update control-family: ${error.message}`,
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
                <FormItem label={<Label required>Control Description</Label>}>
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
                <Button design="Positive" type={ButtonType.Submit}>
                    Update
                </Button>
            </FormItem>
        </Form>
    );
};

export default ControlFamilyEditForm;
