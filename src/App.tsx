import { Suspense, useState } from "react";

import { Page } from "@ui5/webcomponents-react";
import { FlexBox } from "@ui5/webcomponents-react";
import companyLogo from "./assets/images/irm.png";
import userImage from "./assets/images/userImages/user1.jpg";
import Navbar from "./components/Navbar";
import SideNavbar from "./components/SideNavbar";
import routes from "./lib/data";
import ControlAttribute from "./pages/controlAttribute";
import ControlFamily from "./pages/controlFamily";
import ControlLogic from "./pages/controlLogic";
import Dashboard from "./pages/dashboard";
import Report from "./pages/report";
import TypeOfControl from "./pages/typeOfControl";
import DataLoad from "./pages/dataLoad";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
	const [theme, setTheme] = useState("sap_horizon");

	let bg: string;

	if (theme === "sap_horizon_hcb" || theme === "sap_horizon_dark") {
		bg = "bg-gray-700";
	} else {
		bg = "bg-gray-300";
	}
	return (
		<div
			className={`overflow-hidden ${bg} relative transition-all p-0 min-h-screen`}>
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

					<Page
						backgroundDesign="Solid"
						style={{ paddingInline: "0", borderRadius: "0.5rem" }}>
						<Suspense fallback={<Loading />}>
							<Routes>
								{/* Dashboard routes */}
								<Route
									path="/dashboard"
									element={<Dashboard />}
								/>

								<Route
									path="/"
									element={<Dashboard />}
								/>

								{/* Master routes */}
								<Route
									path="master/controlAttribute"
									element={<ControlAttribute />}
								/>

								<Route
									path="master/controlFamily"
									element={<ControlFamily />}
								/>

								<Route
									path="master/controlLogic"
									element={<ControlLogic />}
								/>

								<Route
									path="master/report"
									element={<Report />}
								/>
								<Route
									path="master/typeOfControl"
									element={<TypeOfControl />}
								/>

								{/* Dataload routes */}
								<Route
									path="/dataLoad"
									element={<DataLoad />}
								/>
							</Routes>
						</Suspense>
					</Page>
				</FlexBox>
			</Suspense>
		</div>
	);
}

export default App;
