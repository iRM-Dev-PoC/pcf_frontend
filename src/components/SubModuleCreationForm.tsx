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

type SubModuleData = {
    subModuleName: string;
    subModuleDescription: string;
    displaySubModuleName: string;
};

const schema = z.object({
    subModuleName: z.string().min(1, { message: "Name is required" }),
    subModuleDescription: z
        .string()
        .min(1, { message: "Description is required" }),
    displaySubModuleName: z
        .string()
        .min(1, { message: "Display name is required" }),
});

const SubModuleCreationForm = ({
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
            subModuleName: "",
            subModuleDescription: "",
            displaySubModuleName: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/submodule-master/create-submodule`;

    const fetchData = async (data: SubModuleData) => {
        try {
            const reqData = {
                submodule_name: data.subModuleName,
                submodule_desc: data.subModuleDescription,
                display_submodule_name: data.displaySubModuleName,
                parent_module_id: 1,
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

    const onSubmit = async (data: SubModuleData) => {
        await toast.promise(fetchData(data), {
            loading: "Creating sub-module...",
            success: "Sub-Module created successfully!",
            error: (error) => `Failed to create sub-module: ${error}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allSubModulesData"],
        });
        closeButtonref.current?.click();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>Name</Label>}>
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
                <FormItem label={<Label required>Display Name</Label>}>
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
                <FormItem label={<Label required>Description</Label>}>
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

export default SubModuleCreationForm;
