import { useState } from "react";
import SendEmailToResetPassword from "../components/SendEmailToResetPassword";
import OtpInput from "../components/OtpInput";

const ForgetPassword = () => {
	const [isMailSent, setIsMailSent] = useState<boolean>(false);
	const [isValidOtp, setIsValidOtp] = useState<boolean>(false);
	return (
		<div>
			{!isMailSent ? (
				<SendEmailToResetPassword setIsMailSent={setIsMailSent} />
			) : (
				<OtpInput
					isChangePassword={false}
					isValidOtp={isValidOtp}
					setIsValidOtp={setIsValidOtp}
				/>
			)}
		</div>
	);
};

export default ForgetPassword;
