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

type ReportData = {
	id: number;
	reportName: string;
	reportDestination: string;
  reportPath:string;
};

type ReportEditFormProps = {
	setIsEdit: Dispatch<SetStateAction<boolean>>;
	setIsFullScreen: Dispatch<SetStateAction<boolean>>;
	setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
	reportName: z.string().min(1, { message: "Name is required" }),
	reportDestination: z.string().min(1, { message: "Destination is required" }),
  reporPath: z.string().min(1, { message: "Path is required" }),
});

const ReportEditForm = ({
	id,
	reportName,
	reportDestination,
  reportPath,
	setIsEdit,
	setLayout,
	setIsFullScreen,
}: ReportEditFormProps & ReportData) => {
	const queryClient = useQueryClient();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id,
			reportName,
       reportDestination,
      reportPath,
		},
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-master/update-report`;

	const updateReport = async (data: ReportData) => {
		try {
			const updateData = {
				id,
				report_name: data.reportName,
				report_destination: data.reportDestination,
        report_path:data.reportPath,
				customer_id: 1,
			};
			const response = await axios.patch(endPoint, updateData);

			if (response.data?.statuscode !== 200) {
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

	const onSubmit = async (data: ReportData) => {
		await toast.promise(updateReport(data), {
			loading: "Updating report...",
			success: "Role updated successfully!",
			error: (error) => `Failed to update role: ${error.message}`,
		});
		await queryClient.invalidateQueries({ queryKey: ["allReportData"] });
		setIsEdit(false);
		setIsFullScreen(false);
		setLayout(FCLLayout.OneColumn);
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			labelSpanM={4}
			className="flex items-center justify-center">
			<FormGroup>
				<FormItem label={<Label required>Report Name</Label>}>
					<Input
						{...register("reportName", { required: true })}
						valueState={errors.reportName ? ValueState.Error : ValueState.None}
						valueStateMessage={<span>{errors.reportName?.message}</span>}
						type={InputType.Text}
						className="w-full"
					/>
				</FormItem>
				<FormItem label={<Label required>Report Destination</Label>}>
					<TextArea
						{...register("reportDestination", { required: true })}
						valueState={
							errors.reportDestination ? ValueState.Error : ValueState.None
						}
						valueStateMessage={<span>{errors.reportDestination?.message}</span>}
						className="w-full"
					/>
				</FormItem>
        <FormItem label={<Label required>Report Path</Label>}>
					<Input
						{...register("reportPath", { required: true })}
						valueState={errors.reportPath ? ValueState.Error : ValueState.None}
						valueStateMessage={<span>{errors.reportPath?.message}</span>}
						type={InputType.Text}
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

export default ReportEditForm;


