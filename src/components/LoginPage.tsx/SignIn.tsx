
// // const SignIn = () => {
// //   return (
// //     <>
// //     <form action="">
// //       <div>
// //         <label htmlFor="email">Email</label>
// //         <input type="text" name="email" id="email"/>
// //       </div>
// //       <div>
// //         <label htmlFor="password">Password</label>
// //         <input type="text" name="password" id="password"/>
// //       </div>
// //     </form>

// //     </>
// //   )
// // }

// // export default SignIn

// // To enable form support of ui5-webcomponents, you have to import this feature
// import { Form, useForm } from 'react-hook-form';
// import { Input, Button, ButtonType,Label } from '@ui5/webcomponents-react';
// import { object, string, ZodError } from 'zod';

// interface FormData {
//   email: string;
//   password: string;
// }

// const schema = object({
//   email: string().email(),
//   password: string().min(6),
// });

// const SignInForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: async (data) => {
//       try {
//         await schema.parse(data);
//         return { values: data, errors: {} } as const;
//       } catch (error) {
//         if (error instanceof ZodError) {
//           const fieldErrors: Record<string, string> = {};
//           error.errors.forEach((err) => {
//             if (err.path) {
//               fieldErrors[err.path[0]] = err.message;
//             }
//           });
//           return { values: {}, errors: fieldErrors } as const;
//         } else {
//           return { values: {}, errors: { message: 'An error occurred.' } } as const;
//         }
//       }
//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     console.log(data); // You can handle sign-in logic here
//   };

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//         <Label for="email">Email</Label>
//       <Input
//         name="email"
//         // label="Email"
//         placeholder="Enter your email"
//         ref={register}
//         required
//         error={errors.email?.message}
//       />
//       <Label for="password">Password</Label>
//       <Input
//         name="password"
//         // label="Password"
//         placeholder="Enter your password"
//         type="Password"
//         ref={register}
//         required
//         error={errors.password?.message}
//       />
//      <Button type={ButtonType.Submit}>Sign In</Button>

//     </Form>
//   );
// };

// export default SignInForm;




import { SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Button,
    CheckBox,
    Form,
    FormGroup,
    FormItem,
    Input,
    Loader,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
 
type SignInProps = {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};
 
const SignIn = ({ setIsLoggedIn }: SignInProps) => {
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
 
    const signInSchema = z.object({
        Email: z
            .string()
            .min(3, { message: "Email must be at least 3 characters" }),
        Password: z.string().min(1, { message: "Please enter your Password" }),
        rememberMe: z.boolean().optional(),
    });

    type SignInFormData = {
      Email: string;
      Password:string;
    }
 
    type ValidationSchemaType = z.infer<typeof signInSchema>;
 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchemaType>({
        resolver: zodResolver(signInSchema),
    });
 
    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        const UserID = Number(import.meta.env.VITE_CUSTID);
 
        const loginValues = {
            CustId: UserID,
            Email: data.Email,
            Password: data.Password,
        };
 
  const logIn = async (loginValues: { CustId?: number; Email: any; Password: any; }, setError: { (value: SetStateAction<string | null>): void; (arg0: string): void; }, setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {  
    setLoading(true);
    try {
      const users = [
        { email: "user@abc.com", password: "12345678" },
        ];
       const user = users.find(user => user.email === loginValues.Email && user.password === loginValues.Password);
           if (user) {
          await new Promise(resolve => setTimeout(resolve, 1000));
              return true; 
           } else {
             setError("Invalid email or password");
            return false; 
           }

         } catch (error) {
         setError("An error occurred during login");
         return false; 

        } finally {
       setLoading(false); 
      }
   };

        const logInData = await logIn(loginValues, setError, setLoading);
        if (!logInData) return;

        setLoading(false);
        setIsLoggedIn(true);
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
                    titleText="Sign In Form">
                    <FormGroup titleText="Login Details">
                        <FormItem label="Email">
                            <Input
                                type="Email"
                                className="mb-6 w-[50%]"
                                {...register("Email")}
                            />
                        </FormItem>
                        <FormItem label="Password">
                            <Input
                                className="mb-6 w-[50%]"
                                type="Password"
                                {...register("Password")}
                            />
     
                        </FormItem>
                        <FormItem label="Remember me">
                            <CheckBox
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                            />
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
 
export default SignIn;
