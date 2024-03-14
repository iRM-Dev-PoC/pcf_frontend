import { useState } from "react";
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
import OtpInput from "../components/OtpInput";

type ResetPasswordProps = {
	changePassword: boolean;
};

const ResetPassword = ({ changePassword }: ResetPasswordProps) => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
	const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
	const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(
		null
	);

	const [isValidOtp, setIsValidOtp] = useState<boolean>(false);

	const ResetPasswordSchema = z.object({
		password: z.string().min(1, { message: "Password too short" }),
		oldPassword: z.string().min(1, { message: "Password too short" }),
		repeatPassword: z.string().min(1, { message: "Password too short" }),
	});

	type ValidationSchemaType = z.infer<typeof ResetPasswordSchema>;

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleRepeatPasswordVisibility = () => {
		setShowRepeatPassword(!showRepeatPassword);
	};
	const handleOldPasswordVisibility = () => {
		setShowOldPassword(!showOldPassword);
	};

	const validateRepeatPassword = (value: string) => {
		const password = watch("password");
		if (value !== password) {
			setRepeatPasswordError("Passwords do not match");
		} else {
			setRepeatPasswordError(null);
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
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
		<>
			{!isValidOtp ? (
				<OtpInput
					isChangePassword={changePassword}
					setIsValidOtp={setIsValidOtp}
					isValidOtp={isValidOtp}
				/>
			) : (
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
							titleText={changePassword ? "Change Password" : "Reset Password"}>
							<FormGroup titleText="Type your new password">
								{changePassword && (
									<FormItem label="Enter your old password">
										<Input
											className="mb-6 w-[50%] relative"
											type={showPassword ? "Text" : "Password"}
											required
											{...register("oldPassword")}
										/>
										<button
											type="button"
											onClick={handleOldPasswordVisibility}
											className="absolute z-50 left-[37.70rem] text-center top-[10.20rem]">
											{showOldPassword ? (
												<Eye className="h-6 w-6 text-black/70 text-center" />
											) : (
												<EyeOff className="h-6 w-6 text-black/70 text-center" />
											)}
										</button>
										{errors.oldPassword && (
											<span className="text-red-500">
												{errors.oldPassword?.message}
											</span>
										)}
									</FormItem>
								)}

								<FormItem label="Password">
									<Input
										className="mb-6 w-[50%] relative"
										type={showPassword ? "Text" : "Password"}
										required
										{...register("password")}
										onChange={() => {
											validateRepeatPassword(watch("repeatPassword"));
										}}
									/>
									<button
										type="button"
										onClick={handlePasswordVisibility}
										className="absolute z-50 left-[37.70rem] text-center top-[10.20rem]">
										{showPassword ? (
											<Eye className="h-6 w-6 text-black/70 text-center" />
										) : (
											<EyeOff className="h-6 w-6 text-black/70 text-center" />
										)}
									</button>
									{errors.password && (
										<span className="text-red-500">
											{errors.password?.message}
										</span>
									)}
								</FormItem>

								<FormItem label="Repeat Password">
									<Input
										className="mb-6 w-[50%] relative"
										type={showRepeatPassword ? "Text" : "Password"}
										required
										{...register("repeatPassword")}
										onInput={(e) => {
											validateRepeatPassword(e.target.value);
										}}
									/>
									<button
										type="button"
										onClick={handleRepeatPasswordVisibility}
										className="absolute z-50 left-[37.70rem] text-center top-[14.20rem]">
										{showRepeatPassword ? (
											<Eye className="h-6 w-6 text-black/70 text-center" />
										) : (
											<EyeOff className="h-6 w-6 text-black/70 text-center" />
										)}
									</button>
									{errors.repeatPassword && (
										<span className="text-red-500">
											{errors.repeatPassword.message}
										</span>
									)}
									{repeatPasswordError && (
										<span className="text-red-500">{repeatPasswordError}</span>
									)}
								</FormItem>
								<FormItem>
									<Button
										disabled={loading}
										design="Default"
										type="Submit"
										className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
										Change Password
									</Button>
								</FormItem>
							</FormGroup>
						</Form>
					</div>
				</div>
			)}
		</>
	);
};

export default ResetPassword;
