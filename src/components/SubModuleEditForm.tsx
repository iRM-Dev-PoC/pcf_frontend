import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type SubModuleData = {
    id: number;
    subModuleName: string;
    subModuleDescription: string;
    displaySubModuleName: string;
};

type SubModuleEditFormProps = {
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
    subModuleName: z.string().min(1, { message: "Name is required" }),
    displaySubModuleName: z
        .string()
        .min(1, { message: "Display name is required" }),
    subModuleDescription: z
        .string()
        .min(1, { message: "Description is required" }),
});

const SubModuleEditForm = ({
    id,
    subModuleName,
    subModuleDescription,
    displaySubModuleName,
    setIsEdit,
    setLayout,
    setIsFullScreen,
}: SubModuleEditFormProps & SubModuleData) => {
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id,
            subModuleName,
            displaySubModuleName,
            subModuleDescription,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/submodule-master/update-submodule`;

    const updateSubModule = async (data: SubModuleData) => {
        try {
            const updateData = {
                id,
                submodule_name: data.subModuleName,
                submodule_desc: data.subModuleDescription,
                display_submodule_name: data.displaySubModuleName,
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

    const onSubmit = async (data: SubModuleData) => {
        await toast.promise(updateSubModule(data), {
            loading: "Updating sub-module...",
            success: "Sub-module updated successfully!",
            error: (error) => `Failed to update sub-module: ${error.message}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allSubModulesData"],
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
                <FormItem label={<Label required>Module Name</Label>}>
                    <Input
                        {...register("subModuleName", { required: true })}
                        valueState={
                            errors.subModuleName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.subModuleName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>

                <FormItem label={<Label required>Module Display Name</Label>}>
                    <Input
                        {...register("displaySubModuleName", {
                            required: true,
                        })}
                        valueState={
                            errors.displaySubModuleName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.displaySubModuleName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>

                <FormItem label={<Label required>Module Description</Label>}>
                    <TextArea
                        {...register("subModuleDescription", {
                            required: true,
                        })}
                        valueState={
                            errors.subModuleDescription
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.subModuleDescription?.message}</span>
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

export default SubModuleEditForm;
