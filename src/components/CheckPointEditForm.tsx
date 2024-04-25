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

type CheckPointData = {
	id: number;
	checkPointName: string;
	checkPointDescription: string;
};

type CheckPointEditFormProps = {
	setIsEdit: Dispatch<SetStateAction<boolean>>;
	setIsFullScreen: Dispatch<SetStateAction<boolean>>;
	setLayout: Dispatch<SetStateAction<FCLLayout>>;
};

const schema = z.object({
	checkPointName: z.string().min(1, { message: "Name is required" }),
	checkPointDescription: z
		.string()
		.min(1, { message: "Description is required" }),
});

const CheckPointEditForm = ({
	id,
	checkPointDescription,
	checkPointName,
	setIsEdit,
	setLayout,
	setIsFullScreen,
}: CheckPointEditFormProps & CheckPointData) => {
	const queryClient = useQueryClient();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id,
			checkPointName,
			checkPointDescription,
		},
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/check-point-master/update-check-point`;

	const updateCheckPoint = async (data: CheckPointData) => {
		console.log(data);

		try {
			const updateData = {
				id,
				check_point_name: data.checkPointName,
				check_point_desc: data.checkPointDescription,
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

	const onSubmit = async (data: CheckPointData) => {
		console.log(data);
		await toast.promise(updateCheckPoint(data), {
			loading: "Updating checkPoint...",
			success: "CheckPoint updated successfully!",
			error: (error) => `Failed to update checkPoint: ${error.message}`,
		});
		await queryClient.invalidateQueries({ queryKey: ["allCheckPointData"] });
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
				<FormItem label={<Label required>CheckPoint Name</Label>}>
					<Input
						{...register("checkPointName", { required: true })}
						valueState={
							errors.checkPointName ? ValueState.Error : ValueState.None
						}
						valueStateMessage={<span>{errors.checkPointName?.message}</span>}
						type={InputType.Text}
						className="w-full"
					/>
				</FormItem>
				<FormItem label={<Label required>CheckPoint Description</Label>}>
					<TextArea
						{...register("checkPointDescription", { required: true })}
						valueState={
							errors.checkPointDescription ? ValueState.Error : ValueState.None
						}
						valueStateMessage={
							<span>{errors.checkPointDescription?.message}</span>
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

export default CheckPointEditForm;
