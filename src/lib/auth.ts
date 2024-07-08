import { userData } from "@/lib/userList";
import type { logInFuncProps } from "@/types";

const logIn = async ({ loginValues, setError, setLoading }: logInFuncProps) => {
    try {
        const userEmail = loginValues.username;
        const userPassword = loginValues.password;

        const user = userData.find(
            (user) => user.email === userEmail && user.password === userPassword
        );

        if (!user || user === undefined) {
            setError("Invalid username or password");
            return false;
        }

        return user;
    } catch (error) {
        setError("An error occurred during login");
        return false;
    } finally {
        setLoading(false);
    }
};

const logOut = async () => {
    try {
        const userData = localStorage.getItem("userData");
        if (userData) {
            localStorage.removeItem("userData");
            window.location.reload();
        }
    } catch (error) {
        console.error("An error occurred during logout");
    }
};

const validateOtp = async (otp: string) => {
    try {
        const userData = localStorage.getItem("userData");

        if (userData) {
            const user = JSON.parse(userData);
            const userOtp = Number(user.otp);
            const typedOtp = Number(otp);
            if (userOtp === typedOtp) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("An error occurred during OTP validation");
        return false;
    }
};

const sendOtp = async (email: string) => {
    try {
        const userEmail = email;
        const storedEmail = userData.find((user) => user.email === userEmail);

        if (userEmail) {
            if (storedEmail?.email === userEmail) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("An error occurred during OTP validation");
        return false;
    }
};

const resetPassword = async () => {
    try {
        const userData = localStorage.getItem("userData");
        if (userData) {
            localStorage.removeItem("userData");
            window.location.reload();
        }
        return true;
    } catch (error) {
        console.error("An error occurred during logout");
        return false;
    }
};

export { logIn, logOut, resetPassword, sendOtp, validateOtp };
