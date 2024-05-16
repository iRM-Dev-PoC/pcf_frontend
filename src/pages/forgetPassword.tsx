import OtpInput from "@/components/OtpInput";
import SendEmailToResetPassword from "@/components/SendEmailToResetPassword";
import { useState } from "react";

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
