import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Button,
	Form,
	FormGroup,
	FormItem,
	Input,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { OtpInputProps } from "../utils/types";
import { validateOtp } from "../lib/auth";
import { useState } from "react";
import SendEmailToResetPassword from "./SendEmailToResetPassword";
import ResetPassword from "../pages/resetPassword";

type OtpInputPropsType = {
	setIsValidOtp: (value: boolean) => void;
	isValidOtp: boolean;
	isChangePassword: boolean;
};

const OtpInput = ({ setIsValidOtp, isValidOtp }: OtpInputPropsType) => {
	const [isMailSent, setIsMailSent] = useState<boolean>(false);
	const [validOTP, setValidOTP] = useState(false);
	const validateOTPSchema = z.object({
		otp: z.string().min(1, { message: "OTP is required" }),
	});
	type ValidationSchemaType = z.infer<typeof validateOTPSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchemaType>({
		resolver: zodResolver(validateOTPSchema),
	});

	const onSubmit: SubmitHandler<OtpInputProps> = async (data) => {
		const validateOtpValues = {
			otp: data.otp,
		};

		const validateOtpData = await validateOtp(validateOtpValues.otp);

		console.log(validateOtpData);
		

		if (!validateOtpData) {
			setIsValidOtp(false);
			setValidOTP(false);
			console.log(validOTP);
			
			return;
		}
		setIsValidOtp(true);
		setValidOTP(true);
		console.log(validOTP);
		
	};

	return (
		<>
			{isMailSent ? (
				<SendEmailToResetPassword setIsMailSent={setIsMailSent} />
			) : validOTP ? (
				<ResetPassword changePassword={false} />
			) : (
				<div className="h-svh w-full flex justify-center items-center">
					<div className="rounded-xl p-6">
						<Form
							style={{
								backgroundColor: "var(--sapBackgroundColor)",
							}}
							className="w-[60rem] border border-gray-200 rounded-xl p-6"
							onSubmit={handleSubmit(onSubmit)}
							titleText="Enter OTP">
							<FormGroup titleText="Enter the OTP that was sent to your email address :">
								<FormItem label="OTP">
									<Input
										className="mb-6 w-[50%] relative"
										type="Number"
										inputMode="numeric"
										maxlength={6}
										required
										valueState={isValidOtp ? "None" : "Error"}
										aria-invalid={!isValidOtp}
										valueStateMessage={<span>Invalid OTP</span>}
										{...register("otp")}
									/>
									{errors.otp && (
										<span className="text-red-500">{errors.otp.message}</span>
									)}
								</FormItem>
								<FormItem>
									<Button
										design="Default"
										type="Submit"
										className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
										Submit
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

export default OtpInput;
