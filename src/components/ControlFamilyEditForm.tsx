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
    TextArea,
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import toast from "react-hot-toast";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

type ControlFamilyData = {
    id: number;
    controlName: string;
    controlDescription: string;
};

type ControlFamilyEditFormProps = {
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

const ControlFamilyEditForm = ({
    id,
    controlName,
    controlDescription,
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
            controlName,
            controlDescription,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/update-control`;

    const updateControlFamily = async (data: ControlFamilyData) => {
        try {
            const updateData = {
                id,
                control_name: data.controlName,
                control_desc: data.controlDescription,
                customer_id: 1,
            };
            const response = await axios.patch(endPoint, updateData);

            if (response.data?.statuscode === 400) {
                throw response.data?.message;
            }
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsEdit(false);
        }
    };

    const onSubmit = async (data: ControlFamilyData) => {
        await toast.promise(updateControlFamily(data), {
            loading: "Updating control...",
            success: "Control updated successfully!",
            error: (error) => `Failed to update control: ${error.message}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allControlFamilyData"],
        });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
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

export default ControlFamilyEditForm;
