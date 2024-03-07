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

export default logIn;
