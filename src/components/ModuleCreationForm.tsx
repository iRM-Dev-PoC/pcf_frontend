import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type ModuleData = {
    moduleName: string;
    moduleDescription: string;
    displayModuleName: string;
};

const schema = z.object({
    moduleName: z.string().min(1, { message: "Name is required" }),
    moduleDescription: z
        .string()
        .min(1, { message: "Description is required" }),
    displayModuleName: z
        .string()
        .min(1, { message: "Display name is required" }),
});

const ModuleCreationForm = ({
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
            moduleName: "",
            moduleDescription: "",
            displayModuleName: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/module-master/create-module`;

    const fetchData = async (data: ModuleData) => {
        try {
            const reqData = {
                module_name: data.moduleName,
                module_desc: data.moduleDescription,
                parent_module_id: 0,
                display_module_name: data.displayModuleName,
                customer_id: 1,
            };
            const response = await axios.post(endPoint, reqData);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onSubmit = async (data: ModuleData) => {
        await toast.promise(fetchData(data), {
            loading: "Creating module...",
            success: "Module created successfully!",
            error: (error) => `Failed to create module: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allModulesData"] });
        closeButtonref.current?.click();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>Name</Label>}>
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
                <FormItem label={<Label required>Display Name</Label>}>
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
                <FormItem label={<Label required>Description</Label>}>
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

export default ModuleCreationForm;
