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

type CheckPointData = {
	checkPointName: string;
	checkPointDesc: string;
};

const schema = z.object({
	checkPointName: z.string().min(1, { message: "Name is required" }),
	checkPointDesc: z.string().min(1, { message: "Description is required" }),
});

const CheckPointCreationForm = ({
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
			checkPointName: "",
			checkPointDesc: "",
		},
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/check-point-master/create-check-point`;

	const fetchData = async (data: CheckPointData) => {
		try {
			const reqData = {
				check_point_name: data.checkPointName,
				check_point_desc: data.checkPointDesc,
				customer_id: 1,
				control_id: 1,
			};
			const response = await axios.post(endPoint, reqData);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const onSubmit = async (data: CheckPointData) => {
		await toast.promise(fetchData(data), {
			loading: "Creating check point...",
			success: "Check point created successfully!",
			error: (error) => `Failed to create Check point: ${error.message}`,
		});
		await queryClient.invalidateQueries({ queryKey: ["allCheckPointData"] });
		closeButtonref.current?.click();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} labelSpanM={4}>
			<FormGroup>
				<FormItem label={<Label required>Name</Label>}>
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
				<FormItem label={<Label required>Description</Label>}>
					<TextArea
						{...register("checkPointDesc", { required: true })}
						valueState={
							errors.checkPointDesc ? ValueState.Error : ValueState.None
						}
						valueStateMessage={<span>{errors.checkPointDesc?.message}</span>}
						className="w-full"
					/>
				</FormItem>
			</FormGroup>
			<FormItem>
				<Button
					design="Transparent"
					type={ButtonType.Submit}
					className="mx-auto">
					Submit
				</Button>
			</FormItem>
		</Form>
	);
};

export default CheckPointCreationForm;
