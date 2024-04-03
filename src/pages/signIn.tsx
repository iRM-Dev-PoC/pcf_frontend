import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import {
    Button,
    CheckBox,
    Form,
    FormGroup,
    FormItem,
    Input,
    Loader,
} from "@ui5/webcomponents-react";
import { SignInFormData, SignInProps } from "../utils/types";
import { logIn } from "../lib/auth";
import { useSwitchProduct } from "../hooks/useSwitchProduct";

const SignIn = ({ setIsLoggedIn, setIsForgotPassword }: SignInProps) => {
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setIsSwitchProduct } = useSwitchProduct();

    const signInSchema = z.object({
        username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters long" }),
        password: z.string().min(1, { message: "Please enter your Password" }),
        rememberMe: z.boolean().optional(),
    });

    type ValidationSchemaType = z.infer<typeof signInSchema>;

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchemaType>({
        resolver: zodResolver(signInSchema),
    });

    const handleForgetPassword = () => {
        setIsForgotPassword(true);
    };

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        const loginValues = {
            username: data.username,
            password: data.password,
        };

        const logInData = await logIn({ loginValues, setError, setLoading });
        if (!logInData) return;

        const userData = {
            fName: logInData.fName,
            lName: logInData.lName,
            email: logInData.email,
            role: logInData.role,
            otp: logInData.otp,
            permissions: logInData.permissions,
        };

        setLoading(false);
        setIsLoggedIn(true);
        setIsSwitchProduct(true);
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    return (
        <>
            <div className="flex h-svh w-full items-center justify-center">
                <div className="rounded-xl p-6">
                    <div>
                        {error && (
                            <div className="text-center text-red-500">
                                {error}
                            </div>
                        )}
                        {loading && <Loader progress={60} />}
                    </div>
                    <Form
                        style={{
                            backgroundColor: "var(--sapBackgroundColor)",
                        }}
                        className="w-[60rem] rounded-xl border border-gray-200 p-6"
                        onSubmit={handleSubmit(onSubmit)}
                        titleText="Sign In Form"
                    >
                        <FormGroup titleText="Login Details">
                            <FormItem label="Username">
                                <Input
                                    type="Email"
                                    className="mb-6 w-[50%]"
                                    {...register("username")}
                                />

                                {errors.username && (
                                    <span className="text-red-500">
                                        {errors.username.message}
                                    </span>
                                )}
                            </FormItem>

                            <FormItem label="Password">
                                <Input
                                    className="relative mb-6 w-[50%]"
                                    type={showPassword ? "Text" : "Password"}
                                    {...register("password")}
                                />
                                <button
                                    tabIndex={-1}
                                    type="button"
                                    onClick={handlePasswordVisibility}
                                    className="absolute left-[37.70rem] top-[14.20rem] z-50 text-center"
                                >
                                    {showPassword ? (
                                        <Eye className="h-6 w-6 text-center text-black/70" />
                                    ) : (
                                        <EyeOff className="h-6 w-6 text-center text-black/70" />
                                    )}
                                </button>
                                {errors.password && (
                                    <span className="text-red-500">
                                        {errors.password.message}
                                    </span>
                                )}
                            </FormItem>

                            <FormItem label="Remember me">
                                <CheckBox
                                    checked={rememberMe}
                                    onChange={(event) =>
                                        setRememberMe(event.target.checked)
                                    }
                                />
                            </FormItem>
                            <FormItem>
                                <Button onClick={handleForgetPassword}>
                                    Forget Password?
                                </Button>
                            </FormItem>
                            <Button
                                disabled={loading}
                                design="Default"
                                type="Submit"
                                className="rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                            >
                                Sign In
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
