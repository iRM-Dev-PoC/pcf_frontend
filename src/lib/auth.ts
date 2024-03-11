import { logInFuncProps } from "../utils/types";
import { userData } from "./userList";

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

export { logIn, logOut };
