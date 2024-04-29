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

type ModuleData = {
    id: number;
    moduleName: string;
    moduleDescription: string;
    displayModuleName: string;
};

type ModuleEditFormProps = {
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
    moduleName: z.string().min(1, { message: "Name is required" }),
    displayModuleName: z
        .string()
        .min(1, { message: "Display name is required" }),
    moduleDescription: z
        .string()
        .min(1, { message: "Description is required" }),
});

const ModuleEditForm = ({
    id,
    moduleName,
    moduleDescription,
    displayModuleName,
    setIsEdit,
    setLayout,
    setIsFullScreen,
}: ModuleEditFormProps & ModuleData) => {
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id,
            moduleName,
            displayModuleName,
            moduleDescription,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/module-master/update-module`;

    const updateModule = async (data: ModuleData) => {
        try {
            const updateData = {
                id,
                module_name: data.moduleName,
                module_desc: data.moduleDescription,
                display_module_name: data.displayModuleName,
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

    const onSubmit = async (data: ModuleData) => {
        await toast.promise(updateModule(data), {
            loading: "Updating module...",
            success: "module updated successfully!",
            error: (error) => `Failed to update module: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allModulesData"] });
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
                        {...register("moduleName", { required: true })}
                        valueState={
                            errors.moduleName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.moduleName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>

                <FormItem label={<Label required>Module Display Name</Label>}>
                    <Input
                        {...register("displayModuleName", { required: true })}
                        valueState={
                            errors.displayModuleName
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.displayModuleName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>

                <FormItem label={<Label required>Module Description</Label>}>
                    <TextArea
                        {...register("moduleDescription", { required: true })}
                        valueState={
                            errors.moduleDescription
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.moduleDescription?.message}</span>
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

export default ModuleEditForm;
