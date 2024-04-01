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
import { EmailInputProps } from "../utils/types";
import { sendOtp } from "../lib/auth";

type SendEmailToResetPasswordPropsType = {
  setIsMailSent: (value: boolean) => void;
};

const SendEmailToResetPassword = ({
  setIsMailSent,
}: SendEmailToResetPasswordPropsType) => {
  const validateEmailSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });
  type ValidationSchemaType = z.infer<typeof validateEmailSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(validateEmailSchema),
  });

  const onSubmit: SubmitHandler<EmailInputProps> = async (data) => {
    const validateEmailValues = {
      email: data.email,
    };

    const sendEmail = await sendOtp(validateEmailValues.email);

    if (!sendEmail) {
      setIsMailSent(false);
      return;
    }

    setIsMailSent(true);
  };

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="rounded-xl p-6">
        <Form
          style={{
            backgroundColor: "var(--sapBackgroundColor)",
          }}
          className="w-[60rem] rounded-xl border border-gray-200 p-6"
          onSubmit={handleSubmit(onSubmit)}
          titleText="Enter Email"
        >
          <FormGroup titleText="Enter your email address that associated with your account">
            <FormItem label="Email">
              <Input
                className="relative mb-6 w-[50%]"
                type="Email"
                inputMode="email"
                required
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </FormItem>
            <FormItem>
              <Button
                // disabled={loading}
                design="Default"
                type="Submit"
                className="rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              >
                Send OTP
              </Button>
            </FormItem>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default SendEmailToResetPassword;
