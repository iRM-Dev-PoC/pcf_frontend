import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import {
	Button,
	Form,
	FormGroup,
	FormItem,
	Input,
	Loader,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { ResetPasswordFormData } from "../utils/types";
import { resetPassword } from "../lib/auth";

const ResetPassword = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	// const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const ResetPasswordSchema = z.object({
		password: z
			.string()
			.min(1, { message: "Password must be at least 3 characters long" }),
		repeatPassword: z.string().min(1, { message: "Password Does not match" }),
	});

	type ValidationSchemaType = z.infer<typeof ResetPasswordSchema>;

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchemaType>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
		const resetPasswordValues = {
			password: data.password,
			repeatPassword: data.repeatPassword,
		};

		const resetPasswordData = await resetPassword({
			resetPasswordValues,
			setError,
			setLoading,
		});

		if (!resetPasswordData) return;
	};

	return (
		<div className="h-svh w-full flex justify-center items-center">
			<div className="rounded-xl p-6">
				<div>
					{error && <div className="text-red-500 text-center">{error}</div>}
					{loading && <Loader progress={60} />}
				</div>
				<Form
					style={{
						backgroundColor: "var(--sapBackgroundColor)",
					}}
					className="w-[60rem] border border-gray-200 rounded-xl p-6"
					onSubmit={handleSubmit(onSubmit)}
					titleText="Reset Password">
					<FormGroup titleText="Type your new password">
						<FormItem label="Password">
							<Input
								className="mb-6 w-[50%] relative"
								type={showPassword ? "Text" : "Password"}
								{...register("password")}
							/>
							<button
								type="button"
								aria-name="show-password"
								onClick={handlePasswordVisibility}
								className="absolute z-50 left-[37.70rem] text-center top-[14.20rem]">
								{showPassword ? (
									<EyeOff className="h-6 w-6 text-black/70 text-center" />
								) : (
									<Eye className="h-6 w-6 text-black/70 text-center" />
								)}
							</button>
							{errors.repeatPassword && (
								<span className="text-red-500">
									{errors.repeatPassword.message}
								</span>
							)}
						</FormItem>

						<FormItem label="Repeat Password">
							<Input
								className="mb-6 w-[50%] relative"
								type={showPassword ? "Text" : "Password"}
								{...register("repeatPassword")}
							/>
							<button
								type="button"
								aria-name="show-password"
								onClick={handlePasswordVisibility}
								className="absolute z-50 left-[37.70rem] text-center top-[14.20rem]">
								{showPassword ? (
									<EyeOff className="h-6 w-6 text-black/70 text-center" />
								) : (
									<Eye className="h-6 w-6 text-black/70 text-center" />
								)}
							</button>
							{errors.repeatPassword && (
								<span className="text-red-500">
									{errors.repeatPassword.message}
								</span>
							)}
						</FormItem>
						<Button
							disabled={loading}
							design="Default"
							type="Submit"
							className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
							Sign In
						</Button>
					</FormGroup>
				</Form>
			</div>
		</div>
	);
};

export default ResetPassword;
