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
    ButtonDomRef,
    TextArea,
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type ReportData = {
    reportName: string;
    reportDestination: string;
    reportPath:string;
};

const schema = z.object({
    reportName: z.string().min(1, { message: "Name is required" }),
    reportDestination: z.string().min(1, { message: "Destination is required" }),
    reportPath: z.string().min(1, { message: "Part is required" }),
});

const ReportCreationForm = ({
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
            reportName: "",
            reportDestination: "",
            reportPath:"",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-master/create-report`;

    const fetchData = async (data: ReportData) => {
        try {
            const reqData = {
                report_name: data.reportName,
                report_destination: data.reportDestination,
                report_path:data.reportPath,
                customer_id: 1,
            };
            const response = await axios.post(endPoint, reqData);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onSubmit = async (data: ReportData) => {
        await toast.promise(fetchData(data), {
            loading: "Creating report...",
            success: "Report created successfully!",
            error: (error) => `Failed to create report: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allReportData"] });
        closeButtonref.current?.click();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
            <FormGroup>
                <FormItem label={<Label required>Name</Label>}>
                    <Input
                        {...register("reportName", { required: true })}
                        valueState={
                            errors.reportName ? ValueState.Error : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.reportName?.message}</span>
                        }
                        type={InputType.Text}
                        className="w-full"
                    />
                </FormItem>
                <FormItem label={<Label required>Destination</Label>}>
                    <TextArea
                        {...register("reportDestination", { required: true })}
                        valueState={
                            errors.reportDestination
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.reportDestination?.message}</span>
                        }
                        className="w-full"
                    />
                </FormItem>
                <FormItem label={<Label required>Path</Label>}>
                    <TextArea
                        {...register("reportPath", { required: true })}
                        valueState={
                            errors.reportPath
                                ? ValueState.Error
                                : ValueState.None
                        }
                        valueStateMessage={
                            <span>{errors.reportPath?.message}</span>
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

export default ReportCreationForm;
