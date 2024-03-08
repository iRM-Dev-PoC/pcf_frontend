import { Suspense, useEffect, useState } from "react";
import { FlexBox } from "@ui5/webcomponents-react";
import companyLogo from "./assets/images/irm.png";
import userImage from "./assets/images/userImages/user1.jpg";
import Navbar from "./components/Navbar";
import SideNavbar from "./components/SideNavbar";
import routes from "./lib/routedata";
import ControlAttribute from "./pages/controlAttribute";
import ControlFamily from "./pages/controlFamily";
import ControlLogic from "./pages/controlLogic";
import Dashboard from "./pages/dashboard";
import Report from "./pages/report";
import TypeOfControl from "./pages/typeOfControl";
import DataLoad from "./pages/dataLoad";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Role from "./pages/Roles";
import AddUsers from "./pages/users";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
function App() {
	const [, setTheme] = useState("sap_horizon");

	{
		const [isLoggedIn, setIsLoggedIn] = useState(false);

		useEffect(() => {
			const userData = localStorage.getItem("userData");
			if (userData) {
				setIsLoggedIn(true);
			}
		}, [isLoggedIn]);

		return (
			<div
				className={`overflow-hidden`}
				style={{
					backgroundColor: `color-mix(in srgb, black 4%, var(--sapBackgroundColor))`,
					gridTemplateRows: "auto 1fr",
					gridTemplateColumns: "auto 1fr",
				}}>
				{!isLoggedIn ? (
					<SignIn setIsLoggedIn={setIsLoggedIn} />
				) : (
					<Suspense fallback={<Loading />}>
						<Navbar
							companyName="TRP Global"
							productName="Process Control Flow"
							isNotifiction={true}
							notificationCount="10"
							companyLogo={companyLogo}
							userImage={userImage}
							userName="John Doe"
							themeSwitch={setTheme}
						/>

						<FlexBox
							style={{
								height: "92.5vh",
								marginTop: "0.50rem",
								columnGap: "0.50rem",
								marginRight: "0.50rem",
								marginBottom: "0.3rem",
								borderRadius: "0.5rem",
							}}>
							<SideNavbar items={routes} />

							<Suspense fallback={<Loading />}>
								<Routes>
									<Route
<<<<<<< Updated upstream
										path="/dashboard"
										element={<Dashboard />}
									/>
									<Route
										path="/"
										element={<Home />}
									/>
=======
										path="/signin"	element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
											/>
									<Route path="/dashboard"	element={<Dashboard />}/>
									<Route path="/"	element={<Dashboard />}/>
>>>>>>> Stashed changes
									{/* Master routes */}
									<Route path="master/controlAttribute"	element={<ControlAttribute />}/>
									<Route path="master/controlFamily"	element={<ControlFamily />}/>
									<Route path="master/controlLogic"	element={<ControlLogic />}/>
									<Route path="master/report"element={<Report />}/>
									<Route path="master/typeOfControl"	element={<TypeOfControl />}	/>
									{/* Dataload routes */}
									<Route path="/dataLoad"element={<DataLoad />}/>
									{/* Configuration routes */}
									<Route path="/config/roles"element={<Role />}/>
									<Route path="/config/addUsers"element={<AddUsers />}/>
								</Routes>
							</Suspense>
						</FlexBox>
					</Suspense>
				)}
			</div>
		);
	}
}

export default App;
